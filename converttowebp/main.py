# convert any image type to webp

from PIL import Image

img = Image.open("logo.jpg")
img.save("logo.webp")
