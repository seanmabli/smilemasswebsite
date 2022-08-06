from PIL import Image
import os
from os import listdir
from os.path import isfile, join
from svglib.svglib import svg2rlg
from reportlab.graphics import renderPM
import matplotlib.pyplot as plt
from mpl_toolkits.axes_grid1 import ImageGrid
import numpy as np

plt.show()
original = [f for f in listdir("originalimages") if isfile(join("originalimages", f))]

newName = "seven"
'''
os.mkdir(newName)

for file in original:
  if file[file.find(".") : ] != ".svg":
    im = Image.open("originalimages/" + file)
    im.save(newName + "/" + file[: file.find(".")] + ".png")
  else:
    renderPM.drawToFile(svg2rlg('originalimages/' + file), newName + "/" + file[: file.find(".")] + ".png", fmt='PNG')
'''
new = [f for f in listdir(newName) if isfile(join(newName, f))]

rows=2
cols = 2
img_count = 0

fig, axes = plt.subplots(nrows=rows, ncols=cols, figsize=(15,15))

for i in range(rows):
    for j in range(cols):        
        if img_count < len(new):
            axes[i, j].imshow(new[img_count])
            img_count+=1

def make_array():
    from PIL import Image
    array = []
    for file in new:
      im = Image.open(newName + "/" + file)
      array.append(im)
    return np.array(array)

array = make_array()
result = gallery(array)
plt.imshow(result)
plt.show()

print(len(original), len(new))