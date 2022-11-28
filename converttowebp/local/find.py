from os import listdir
from os.path import isfile, join

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
mypath = "C:\\Users\\smdro\\smilemasswebsite\\converttowebp\\copy"
loop(mypath)
print(allfiles)