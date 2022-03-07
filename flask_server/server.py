from flask import Flask, request, redirect,send_file
import json
import os
import firebase_admin
import pyrebase
from firebase_admin import credentials
from firebase_admin import firestore

app=Flask(__name__)

cred = credentials.Certificate('./private_key.json')
firebase_admin.initialize_app(cred)
db=firestore.client()

doc1={
    u"Name":u"Tatya Vinchu",
    u"Contact":27983454,
    u"Email":u"Tatya@123.com",
    u"Password":u"Tatya123",
    u"Doctor_id":1
}

db.collection(u'Doctors').document(u'd1').set(doc1)

db.collection(u'Counter').document(u'count').set({u"doctorCounter":1})


@app.route("/Docpost", methods=["POST", "GET"])
def getDocInfo():
    try:
        print('Request data',request.data)
        request_data=json.loads(request.data)
        print(request_data)
        Username=request_data["Username"]
        Email=request_data["Email"]
        Password=request_data["Password"]
        print(Username, Password, Email)

        count_ref=db.collection(u'Counter').document(u'count')
        countDict=count_ref.get()
        count=countDict.to_dict()["doctorCounter"]
        print("Count",count)
        
        for i in range(count):
            doc_id="d"+str(i+1)
            print("Doc_id",doc_id)
            doc_ref=db.collection(u'Doctors').document(doc_id)
            doctor=doc_ref.get()
            print("Doctor obj",doctor)

            if doctor.exists:
                print(doctor.to_dict()["Email"])
                print(Email)
                if doctor.to_dict()["Email"]==Email and doctor.to_dict()["Password"]==Password:
                    print(doctor.to_dict()["Email"])
                    return {
                    'msg':'Doctor Authenticated',
                    'id':doctor.to_dict()["Doctor_id"]
                    }

                else:
                    return{
                        'msg':"Invalid Email or Password"
                    }

            else:
                return {
                    'msg':"Doctor not Found"
                }


    except Exception as e:
        print(e)
        return {
            "message":str(e)
            }


@app.route("/Adminpost", methods=["POST", "GET"])
def getAdminInfo():
    pass

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