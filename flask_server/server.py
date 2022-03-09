from flask import Flask, request, redirect,send_file
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

app=Flask(__name__)
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
                    if doctor.to_dict()["Email"]!=Email: 
                        return{
                            'msg':"Invalid Email"
                        }

                    elif doctor.to_dict()["Email"]!=Password:
                         return{
                            'msg':"Invalid Password"
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

@app.route("/forgotPassword", methods=["POST", "GET"])
def forgotPassword():
    try:
        request_data=json.loads(request.data)
        doc_id=request_data[1]["id"]
        email=request_data[0]["Email"]
        print(email, doc_id)

        doc_ref=db.collection(u'Doctors').document(doc_id)
        doctor=doc_ref.get()

        if doctor.exists:
            doc_email=doctor.to_dict()["Email"]
            print(doc_email)
            if doc_email==email:
                print("All good")
                new_pass=''.join(random.choices(string.ascii_uppercase+string.ascii_lowercase+string.digits+str(["#","@","$","*","&","%"]), k=10))

                msg = Message("Password Reset",
                  sender="befinalproject420@gmail.com",
                  recipients=["shreepad.divekar@gmail.com", "aditya02.apte@gmail.com"]
                  )

                msg.body="Your new password is "+new_pass

                mail.send(msg)
                print("mail sent successfully")

                db.collection(u'Doctors').document(doc_id).update({"Password":new_pass})
                print("Password updated successfully ")

                return{
                    "201":"Good"
                }

           


    except Exception as e:
        print(e)

    


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