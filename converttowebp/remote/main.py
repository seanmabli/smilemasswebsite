import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("adminkey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
for doc in db.collection(u'sponsors').get():
    print(doc.to_dict())