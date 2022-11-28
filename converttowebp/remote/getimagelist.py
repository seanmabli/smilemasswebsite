import pyrebase
import json

config = {
  "apiKey": "AIzaSyCvlwNhLDUO_IuFFbl0wa4QTJCKWsszWcU",
  "authDomain": "smilemass-6902d.firebaseapp.com",
  "projectId": "smilemass-6902d",
  "storageBucket": "smilemass-6902d.appspot.com",
  "databaseURL": "https://smilemass-6902d.firebaseio.com",
  "serviceAccount": "adminkey.json"
  }

firebase_storage = pyrebase.initialize_app(config)
storage = firebase_storage.storage()

all_files = storage.list_files()
all_fileinfo = []

for file in all_files:
  # fileinfo = dict(file.metadata)
  # fileinfo["name"] = file.name
  # fileinfo["public_url"] = file.public_url
  # fileinfo["path"] = file.path
  # all_fileinfo.append(fileinfo)
  file.download_to_filename("converttowebp\\copy2\\" + file.name + "." + file.content_type.replace("image/", ""))

# json.dump(all_fileinfo, open("converttowebp\\copy\\all_fileinfo.json", "w"), indent=2)