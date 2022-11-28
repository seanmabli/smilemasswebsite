import firebase_admin
from firebase_admin import credentials, storage
import numpy as np

cred = credentials.Certificate("adminkey.json")
app = firebase_admin.initialize_app(cred, { 'storageBucket' : 'smilemass-6902d.appspot.com' })

bucket = storage.bucket()
blob = bucket.get_blob("gjkjhklgjlkh.PNG") #blob
blob.download_to_filename('image.png')