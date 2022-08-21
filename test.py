import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("adminkey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
for _ in range(500):
    db.collection(u'contact').add({
        u'name': u'John Doe',
        u'phone': u'1234567890',
        u'email': u'example@example.com',
        u'message': u'Hello World!'
    })