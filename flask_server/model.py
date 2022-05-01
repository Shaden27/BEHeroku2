import os
import shutil
import tempfile
import time
import numpy as np
from PIL import Image
import torch
from array2gif import write_gif
from moviepy.editor import ImageSequenceClip
import matplotlib.pyplot as plt
from matplotlib import animation
from moviepy.editor import ImageSequenceClip
from monai.config import print_config
from monai.data import DataLoader, decollate_batch
from monai.handlers.utils import from_engine
from monai.losses import DiceLoss
from monai.inferers import sliding_window_inference
from monai.metrics import DiceMetric
from monai.networks.nets import SegResNet
import nibabel as nib
from monai.data import NibabelReader
from monai.transforms import (
    Compose,
    LoadImage,
    Orientation,
    Spacing,
    NormalizeIntensity,
    EnsureType,
    Activations,
    AsDiscrete
)


def load_model(PATH="best_metric_model.pth"):
    model = SegResNet(
        blocks_down=[1, 2, 2, 4],
        blocks_up=[1, 1, 1],
        init_filters=16,
        in_channels=4,
        out_channels=3,
        dropout_prob=0.2,
    )

    model.load_state_dict(
        torch.load(PATH, map_location=torch.device('cpu'))
    )

    return model

def inference(input, model):

    def _compute(input):
        return sliding_window_inference(
            inputs=input,
            roi_size=(240, 240, 160),
            sw_batch_size=1,
            predictor=model,
            overlap=0.5,
        )

    return _compute(input)

def run_inference(IMAGE_PATH,  model):
    def _get_transforms():
        reader = NibabelReader()
        test_transform = Compose(
            [
                LoadImage(image_only=True, ensure_channel_first=True),
                Orientation(axcodes="RAS"),
                Spacing(
                    pixdim=(1.0, 1.0, 1.0),
                    mode="bilinear",
                    image_only=True
                ),
                NormalizeIntensity(nonzero=True, channel_wise=True),
                EnsureType()
            ]
        )

        display_transform=Compose([
            LoadImage(image_only=True, ensure_channel_first=True),
            Orientation(axcodes='RAS'),
            
            EnsureType()
        ])
        post_trans = Compose(
            [EnsureType(), Activations(sigmoid=True), AsDiscrete(threshold=0.5)]
        )

        return test_transform, post_trans,display_transform
    
    test_transform, post_trans, display_transform = _get_transforms()

    model.eval()
    with torch.no_grad():
        display_input = display_transform(IMAGE_PATH)[0].unsqueeze(0)
        val_input = test_transform(IMAGE_PATH)[0].unsqueeze(0)
        # print("Val input shape: ", val_input.shape) 
        roi_size = (128, 128, 64)
        sw_batch_size = 4
        val_output = inference(val_input, model)
        val_output = post_trans(val_output[0])

        # for i in range(3):
        #     print("val input unique", np.unique(val_input[:,i,:,:,70]))
        # print("val_input shape",val_input.shape)

        # print("val_output",val_output)
        # print("val_output shape",val_output.shape)
        
        return val_output, val_input, display_input



def save_image(IMAGE_PATH,img_arr, slice):
    # for i in range(slice):
    #     plt.subplot(1, slice, i + 1)
    #     plt.title(f"image channel {i}")
    #     #plt.imsave(IMAGE_PATH, img_arr[i, :, :, 70], cmap='gray')
    #     print("img_arr slice",np.unique(img_arr[i,:,:,70]))
        
    #     plt.imshow(img_arr[i,:,:,70], cmap='jet')
    # plt.savefig(IMAGE_PATH)
    img_arr_reshaped = np.transpose(img_arr, (0,3,1,2))
    #print("Image array reshaped shape:", img_arr_reshaped.shape)
    gif_arr = img_arr_reshaped[0,:,:,:]
    imgs_arr = [img for img in gif_arr]
    for img in imgs_arr:
        print(np.unique(img))
    #imgs = [Image.fromarray(img) for img in gif_arr]
    #print(imgs)
    #imgs[0].save(IMAGE_PATH, format='GIF', save_all=True, append_images=imgs[70:80], duration=200, loop=0)
    
def combine_outputs(output_arr, input_arr, IMAGE_PATH):
    img_arr_reshaped = np.transpose(output_arr, (0,3,1,2))
    temp = np.zeros((155,240,240))

    print("OUTPUT ARRAY", img_arr_reshaped.shape)
    print("TEMP ARRAY", temp.shape)
    print(temp.shape == img_arr_reshaped[0,:,:,:].shape)
    temp[img_arr_reshaped[0,:,:,:] == 1] = 1
    temp[img_arr_reshaped[1,:,:,:] == 1] = 2
    temp[img_arr_reshaped[2,:,:,:] == 1] = 3
    generate_output_gif(input_arr, temp,IMAGE_PATH)

def generate_output_gif(input, temp, IMAGE_PATH):
    img_arr = np.transpose(input[0], (0,3,1,2))
    numpy_3d_array = img_arr[0,:,:,:]

    numpy_3d_array[temp[:,:,:] == 1] = 1
    numpy_3d_array[temp[:,:,:] == 2] = 2
    numpy_3d_array[temp[:,:,:] == 3] = 3

    fig = plt.figure()
    im = plt.imshow(numpy_3d_array[0, :, :],    # display first slice
                    animated=True,
                    cmap='seismic',               # color mapping
                    vmin=0, # lowest value in numpy_3d_array
                    vmax=3) # highest value in numpy_3d_array
    #plt.colorbar(label='turbo', shrink=0.75)
    plt.tight_layout()

    def init():
        im.set_data(numpy_3d_array[0, :, :])
        return im,

    def animate(i):
        im.set_array(numpy_3d_array[i, :, :])
        return im,

    # calling animation function of matplotlib
    anim = animation.FuncAnimation(fig,
                                   animate,
                                   init_func=init,
                                   frames=np.shape(numpy_3d_array)[0],  # amount of frames being animated
                                   interval=10,                       # update every second
                                   blit=True)
    anim.save(IMAGE_PATH)


def generate_input_gif(img_arr, IMAGE_PATH,transpose=False):
    print("IN GENERATE")
    if transpose==True:
        img_arr = np.transpose(img_arr, (0,3,1,2))
        numpy_3d_array = img_arr[0,:,:,:]
    
    else:
        img_arr = np.transpose(img_arr[0], (0,3,1,2))
        numpy_3d_array = img_arr[0,:,:,:]
        numpy_3d_array = numpy_3d_array.numpy()
        print(np.amax(numpy_3d_array))
        print("AFTER MIN MAx")

    fig = plt.figure()
    im = plt.imshow(numpy_3d_array[0, :, :],    # display first slice
                    animated=True,
                    cmap='gray',               # color mapping
                    vmin=0, # lowest value in numpy_3d_array
                    vmax=4251) # highest value in numpy_3d_array
    #plt.colorbar(label='turbo', shrink=0.75)
    plt.tight_layout()

    def init():
        im.set_data(numpy_3d_array[0, :, :])
        return im,

    def animate(i):
        im.set_array(numpy_3d_array[i, :, :])
        return im,

    # calling animation function of matplotlib
    anim = animation.FuncAnimation(fig,
                                   animate,
                                   init_func=init,
                                   frames=np.shape(numpy_3d_array)[0],  # amount of frames being animated
                                   interval=10,                       # update every second
                                   blit=True)
    anim.save(IMAGE_PATH)   # save as gif
    #plt.show()
        

# model = load_model()
# output, input = run_inference('test_docs/BRATS_485.nii.gz', model)
# save_image('test_docs/output.png',output, 3)
# save_image('test_docs/input.png',input.squeeze(), 4)
