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

for title in new:
  img = Image.open(newName + "/" + title)
  img = img.resize((200, int(img.size[1] / (img.size[0] / 200))))
  img.save("upload/" + title)