

from fileinput import filename
from multiprocessing.dummy import Process
from flask import Flask, request, redirect,send_file,jsonify,send_from_directory,render_template
from werkzeug.utils import secure_filename
import json
import os
import firebase_admin
import pyrebase
from firebase_admin import credentials
from firebase_admin import firestore
from flask_mail import Mail
from flask_mail import Message
import random
import string
import base64
from model import *

app=Flask(__name__)
# print(process.env.PORT)
# app.set(process.env.PORT or 5000)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = "befinalproject420@gmail.com"
app.config['MAIL_PASSWORD'] = "Saas#1234"
mail=Mail(app)
print(mail)

cred = credentials.Certificate('./private_key.json')
firebase_admin.initialize_app(cred)
db=firestore.client()


# doc1={
#     u"Name":u"Tatya Vinchu",
#     u"Contact":27983454,
#     u"Email":u"Tatya@123.com",
#     u"Password":u"Tatya123",
#     u"Doctor_id":1
# }

# db.collection(u'Doctors').document(u'd1').set(doc1)

# db.collection(u'Counter').document(u'count').set({u"doctorCounter":1})

# patient1={
#     u"Name":u"Raju",
#     u"Email":u"raju@gmail.com",
#     u"Password":u"raju1234",
#     u"Contact_Number":123456789,
#     u"Doctor_id":1,
#     u"Patient_id":1
# }

# patient2={
#     u"Name":u"Mama",
#     u"Email":u"mama@gmail.com",
#     u"Password":u"mama1234",
#     u"Contact_Number":123423435,
#      u"Doctor_id":1,
#      u"Patient_id":2
# } 

# patient3={
#      u"Name":u"Lala",
#     u"Email":u"lala@gmail.com",
#     u"Password":u"lala1234",
#     u"Contact_Number":8965896789,
#      u"Doctor_id":1,
#      u"Patient_id":3
# }

# db.collection(u'Patients').document(u'p1').set(patient1)
# db.collection(u'Patients').document(u'p2').set(patient2)
# db.collection(u'Patients').document(u'p3').set(patient3)


@app.route("/Docpost", methods=["POST", "GET"])
def getDocInfo():
    try:
        print('Request data',request.data)
        request_data=json.loads(request.data)
        print(request_data)
        Email=request_data["Email"]
        Password=request_data["Password"]
        print(Email,Password)

        doc_ref=db.collection(u'Doctors').where(u'Email',u'==',Email)
        print("Doc_ref",doc_ref)
        
        if doc_ref.get()==[]:
            return{
                    'msg':"Doctor Not Found"
            }

        doctor=doc_ref.get()[0]
        print("doctor",doctor)
        
        if doctor.exists:
            doc_id=doctor.to_dict()["Doctor_id"]
            if doctor.to_dict()["Email"]==Email and doctor.to_dict()["Password"]==Password:
                print(doctor.to_dict()["Email"])
                return {
                'msg':'Doctor Authenticated',
                'id':doc_id
                }

            else:

                if doctor.to_dict()["Password"]!=Password:
                        return{
                        'msg':"Invalid Password"
                    }

    except Exception as e:
        print(e)
        return {
            "message":str(e)
            }

@app.route("/forgotPassword", methods=["POST", "GET"])
def forgotPassword():
    try:
        request_data=json.loads(request.data)
        print(request_data)
        email=request_data[0]["Email"]
        id=request_data[1]["id"]
        print(email, id)
        if id=="d":
            doc_ref=db.collection(u'Doctors').where(u'Email',u'==',email)
            print("doc_ref", doc_ref)
            doctor=None
            if doc_ref.get()==[]:
                return{
                    "msg":"Account Not Found"
                }

            if doc_ref.get()!=[]:
                doctor=doc_ref.get()[0]
                print("doctor", doctor)

                if doctor.exists:
                    doc_email=doctor.to_dict()["Email"]
                    doc_id=doctor.to_dict()["Doctor_id"]
                    doc_id="d"+str(doc_id)
                    
                    if doc_email==email:
                       
                        print("All good")
                        new_otp=''.join(random.choices(string.digits, k=6))

                        msg = Message("Opt for password change request",
                        sender="befinalproject420@gmail.com",
                        recipients=["shaden.shaden2704@gmail.com", "aditya02.apte@gmail.com"]
                        )

                        msg.body="Your new otp for "+doc_email+" is "+new_otp

                        mail.send(msg)
                        print("Otp mail for Doctor sent successfully")

                        db.collection(u'Doctors').document(doc_id).update({"Doctor_otp":new_otp})
                        print("Otp updated successfully ")

                        return{
                            "msg":"Otp sent Successfully"
                        }

        if id=="a":
            admin_ref=db.collection(u'Admin').where(u'Admin_Email',u'==',email)
            print("admin_ref", admin_ref)
            if admin_ref.get()==[]:
                return{
                    "msg":"Account Not Found"
                }

            admin=admin_ref.get()[0]
            if admin.exists:
                admin_email=admin.to_dict()["Admin_Email"]
                admin_id=admin.to_dict()["Admin_Id"]
                admin_id="a"+str(admin_id)

                if admin_email==email:
                    print("All good")
                    new_otp=''.join(random.choices(string.digits, k=6))

                    msg = Message("Opt for password change request",
                    sender="befinalproject420@gmail.com",
                    recipients=["shaden.shaden2704@gmail.com", "aditya02.apte@gmail.com"]
                    )

                    msg.body="Your new otp for "+admin_email+" is "+new_otp

                    mail.send(msg)
                    print("Otp mail for Admin sent successfully")

                    db.collection(u'Admin').document(admin_id).update({"Admin_otp":new_otp})
                    print("Otp updated successfully ")

                    return{
                        "msg":"Otp sent Successfully"
                    }
           


    except Exception as e:
        print(e)

@app.route("/getOtp", methods=["GET", "POST"])
def getOtp():
    try:
        request_data=json.loads(request.data)
        print(request_data)
        otp=request_data[0]["user_otp"]
        identifier=request_data[1]["id"]
        print(otp, identifier)
        if identifier=="d":
            doc_ref=db.collection(u'Doctors').where(u'Doctor_otp',u'==',otp)
            print("doc_ref", doc_ref)
            

            if doc_ref.get()==[]:
                return{
                    "msg":"Invalid Otp"
                }

            doctor=doc_ref.get()[0]
            

            if doctor.exists:
                doc_id="d"+str(doctor.to_dict()["Doctor_id"])
                new_pass=''.join(random.choices(string.ascii_lowercase+string.ascii_uppercase+string.digits, k=10))
                msg = Message("Password Reset",
                        sender="befinalproject420@gmail.com",
                        recipients=["shaden.shaden2704@gmail.com", "aditya02.apte@gmail.com"]
                        )

                msg.body="Your new password is "+new_pass

                mail.send(msg)
                print("Password mail for Doctor sent successfully")

                db.collection(u'Doctors').document(doc_id).update({"Admin_Password":new_pass})
                print("Password updated successfully ")

                return{
                    "msg":"Password Updated Successfully"
                }

        if identifier=="a":
            admin_ref=db.collection(u'Admin').where(u'Admin_otp',u'==',otp)
            print("admin_ref", admin_ref)
            if admin_ref.get()==[]:
                return{
                    "msg":"Invalid Otp"
                }

            admin=admin_ref.get()[0]

            if admin.exists:
                admin_id="a"+str(admin.to_dict()["Admin_Id"])
                new_pass=''.join(random.choices(string.ascii_lowercase+string.ascii_uppercase+string.digits, k=10))
                msg = Message("Password Reset",
                        sender="befinalproject420@gmail.com",
                        recipients=["shaden.shaden2704@gmail.com", "aditya02.apte@gmail.com"]
                        )

                msg.body="Your new password is "+new_pass

                mail.send(msg)
                print("Password mail for Admin sent successfully")

                db.collection(u'Admin').document(admin_id).update({"Password":new_pass})
                print("Password updated successfully ")

                return{
                    "msg":"Password Updated Successfully"
                }

            # else:
            #     return{
            #         "msg":"Invvalid Otp"
            #     }

    except Exception as e:
        print(e)
        return{
            "msg":str(e)
        }

@app.route('/resetPassword', methods=["POST", "GET"])
def resetPassword():
    try:
        request_data=json.loads(request.data)
        print(request_data)
        oldPassword=request_data[0]["oldPassword"]
        newPassword=request_data[0]["newPassword"]
        verifyPassword=request_data[0]["verifyPassword"]
        id=request_data[1]["id"]

        letter=id[:1]
        doc_num=id[1:]
        doc_num=int(doc_num)

        print(oldPassword, newPassword, verifyPassword,id )

        if letter=="d":

            doc_ref=db.collection(u'Doctors').where(u'Doctor_id',u'==',doc_num)
            if doc_ref.get()==[]:
                return {
                    "msg":"Account Not Found"
                }

            doctor=doc_ref.get()[0]

            if doctor.exists:
                if doctor.to_dict()["Password"]==oldPassword:
                    db.collection(u'Doctors').document(id).update({"Password":newPassword})
                    return{
                        "msg":"Password updated successfully"
                    }

                else:
                    return{
                        "msg":"Some error occured please try again"
                    }

        if letter=="a":
            admin_ref=db.collection(u'Admin').where(u'Admin_Id',u'==',1)
            if admin_ref.get()==[]:
                return {
                    'msg':'Account Not Found'
                }

            admin=admin_ref.get()[0]
            if admin.exists:
                if admin.to_dict()["Admin_Password"]==oldPassword:
                    db.collection(u'Admin').document(u"a1").update({"Admin_Password":newPassword})
                    return{
                        "msg":"Password updated successfully"
                    }

                else:
                    return{
                        "msg":"Some error occured please try again"
                    }

        
       
    except Exception as e:
        print(e)
   

@app.route("/Adminpost", methods=["POST", "GET"])
def getAdminInfo():
    try:
        request_data=json.loads(request.data)
        print(request_data)
    
        Email=request_data["Email"]
        Password=request_data["Password"]
        print(Email,Password)

        admin_id='a1'
        admin_ref=db.collection(u'Admin').document(admin_id)
        admin=admin_ref.get()
        if admin.exists:
            if admin.to_dict()["Admin_Email"]==Email and admin.to_dict()["Admin_Password"]==Password:
                return {
                    'msg':'Admin Authenticated',
                    'id':admin.to_dict()["Admin_Id"]
                    }

            else:
                    if admin.to_dict()["Admin_Email"]!=Email: 
                        return{
                            'msg':"Invalid Email"
                        }

                    elif admin.to_dict()["Admin_Password"]!=Password:
                         return{
                            'msg':"Invalid Password"
                        }

        else:
                return {
                    'msg':"Admin not Found"
                }




    except Exception as e:
        print(e)
        return{
            "msg":str(e)
        }

@app.route("/getPatients", methods=["GET","POST"])
def getPatients():
    try:
        print("Getting the patients")
        id=request.form['id']
        print("id", id)
        letter=id[:1]
        doc_num=id[1:]

        doc_num=int(doc_num)
        print(letter,doc_num)
        if letter == 'd':
            patient_ref=db.collection(u'Patients').where(u'Doctor_id',u'==',doc_num)
            print("patient_ref",patient_ref)
            print(patient_ref.get())
            if patient_ref.get()==[]:
                return{
                    "patients":"Not Found"
                }

            print("Helloooo")
            print("Viewing patients",patient_ref.get())
            patients=[]

            for i in range(len(patient_ref.get())):
                name=patient_ref.get()[i].to_dict()["Name"]
                email=patient_ref.get()[i].to_dict()["Email"]
                obj={
                    "name":name,
                    "email":email
                }
                patients.append(obj)

            print("Patients",patients)
            return json.dumps(patients)

        elif letter == "a":
            admin_ref=db.collection(u'Patients')
            print(admin_ref)

            if admin_ref.get()==[]:
                return{
                    "patients":"Not Found"
                }

            patients=[]
            for i in range(len(admin_ref.get())):
                name=admin_ref.get()[i].to_dict()["Name"]

                email=admin_ref.get()[i].to_dict()["Email"]
                obj={
                    "name":name,
                    "email":email
                }
                patients.append(obj)

            print("Patients",patients)
            return json.dumps(patients)


    except Exception as e:
        print(str(e))

UPLOAD_FOLDER = "./"
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

@app.route("/addPatient", methods=["GET", "POST"])
def addPatient():
    try:
        target=os.path.join(UPLOAD_FOLDER,'test_docs')
        if not os.path.isdir(target):
            os.mkdir(target)
        
        Photo=request.files['Photo']
        Name=request.form["Name"]
        Email=request.form["Email"]
        Doctor_Email=request.form["Doctor_Email"]
        Contact=request.form["Contact"]
        

        # image=Photo.files['file']

        print(Name, Email, Doctor_Email, Contact)
        print("Photo type", type(Photo))
        print("Photo", Photo)
        filename = secure_filename(Photo.filename)
        destination="/".join([target, filename])
        Photo.save(destination)

        doc_ref=db.collection(u'Doctors').where(u'Email',u'==',Doctor_Email)
        if doc_ref.get()==[]:
            return{
                'msg':'Doctor Not Found'
            }


        doctor=doc_ref.get()[0]
        if doctor.exists:
            doc_id=doctor.to_dict()["Doctor_id"]

            with open(destination, 'rb') as img_file:
                patient_photo=base64.b64encode(img_file.read())

            # print(my_string)

            patient={
                u'Name':Name,
                u'Email':Email,
                u'Doctor_Email':Doctor_Email,
                u'Contact':Contact,
                u'Doctor_id':doc_id,
                u'Photo':patient_photo
            }
        
            db.collection(u'Patients').document(Email).set(patient)

            # image=base64.b64decode(patient_photo)
            # print(image)
            # newfile='new_mani.jpeg'
            # destination="/".join([target,newfile])
            # with open(destination, 'wb') as new_image:
            #     new_image.write(image)
          

            return{
                "msg":"Good"
            }
       

    except Exception as e:
        print(str(e))


@app.route("/getPatientInfo", methods=["POST","GET"])
def getPatientInfo():
    try:
        request_data=json.loads(request.data)
        print(request_data)
        email=request_data["id"]
        whatType=request_data["forwhat"]
        print("email",email)

        patient_ref=db.collection(u'Patients').where(u'Email',u'==',email)
        if patient_ref.get()==[]:
            return {
                'msg':'No Patient Found'
            }

        patient=patient_ref.get()[0]
        print("patient",patient)
        if patient.exists:
            if whatType=="otherInfo":
                Contact=patient.to_dict()['Contact']
                Name=patient.to_dict()['Name']
                Email=patient.to_dict()['Email']
                Doctor_Email=patient.to_dict()['Doctor_Email']
                 
                patient_obj={
                    'contact':Contact,
                    'name':Name,
                    'email':Email,
                    'doctor_email':Doctor_Email
                
                }

                return jsonify(patient_obj)

            if whatType=="photo":
                print("Trying to send photo ")
                photo_url=patient.to_dict()["Photo"]

                image=base64.b64decode(photo_url)
                newfile="new_image.jpeg"
                target=os.path.join(UPLOAD_FOLDER,'test_docs')
                destination="/".join([target,newfile])
                with open(destination, 'wb') as new_image:
                    new_image.write(image)
                
                print("destination", destination)
                return send_file(destination, as_attachment=True)


    except Exception as e:
        print(str(e))


@app.route("/uploadScan", methods=["POST","GET"])
def uploadScan():
    try:
        print("Test123")
        target=os.path.join(UPLOAD_FOLDER,'test_docs')
        if not os.path.isdir(target):
            os.mkdir(target)

        Scan=request.files['scan']
        print("file",Scan)

        filename = secure_filename(Scan.filename)
        destination="/".join([target, filename])
        Scan.save(destination)

        

        model=load_model()
        output,input,display_input=run_inference(destination,model)
        generate_input_gif(display_input, 'test_docs/input.gif')

        combine_outputs(output, input, 'test_docs/bamboo.gif')
        #save_image('test_docs/bamboozle.gif',output.numpy(), 3)
        #generate_gif(output.numpy(),'test_docs/bamboozle.gif')
        #save_image('test_docs/input.png',input.squeeze(), 4)

        return {
            "msg":"Success"
        }

    except Exception as e:
        print(str(e))
        return {
            "msg":"Something went wrong"
        }

@app.route("/sendScan", methods=["POST","GET"])
def sendScan1():
    print("Hello in sendscan")
    try:
        print("In sendscan")
        target=os.path.join(UPLOAD_FOLDER,'test_docs')
        destination="/".join([target,'bamboo.gif'])
        print("destination",destination)
        return send_file(destination, as_attachment=True)
      


    except Exception as e:
        print(str(e))

# firebaseConfig = {
#     "apiKey": "AIzaSyBJ_zlvPhIGuV9eh_0Pf5a1JOsmxhoU08w",
#     "authDomain": "be-final-project.firebaseapp.com",
#     "projectId": "be-final-project",
#     "storageBucket": "be-final-project.appspot.com",
#     "messagingSenderId": "660015724248",
#     "appId": "1:660015724248:web:bc1df306ba3f8c9c9d89ad",
#     "measurementId": "G-FY86Z0JJ5F"
#   }


if __name__=="__main__":
    app.run(debug=True)


    