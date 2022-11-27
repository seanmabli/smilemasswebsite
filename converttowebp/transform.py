from os import listdir, remove
from os.path import isfile, join
from PIL import Image

def loop(path):
  both = [f for f in listdir(path)]
  files = [f for f in listdir(path) if isfile(join(path, f))]
  directories = list(set(both) - set(files))

  for i in range(len(files)):
    files[i] = path + "\\" + files[i]

  allfiles.extend(files)
  for directory in directories:
    loop(path + "\\" + directory)

allfiles = []
mypath = "C:\\Users\\smdro\\smilemasswebsite\\images"
loop(mypath)
print(allfiles)

for i in allfiles:
  if i.endswith(".jpg") or i.endswith(".png") or i.endswith(".jpeg"):
    img = Image.open(i)
    img.save(i.replace(".jpg", ".webp").replace(".png", ".webp").replace(".jpeg", ".webp"))
    remove(i)