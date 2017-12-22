 # 1234 to [1, 2, 3, 4]
 [int(x) for x in str(1234)]
 map(int, str(1234))



# image to string
import base64
 
with open("t.png", "rb") as imageFile:
    str = base64.b64encode(imageFile.read())
    print str

# string to image
fh = open("t.png", "wb")
fh.write(string.decode("base64"))
fh.close()

# add border to image
import Image, ImageOps
img = Image.open('original-image.png')
img_with_border = ImageOps.expand(img,border=300,fill='black')
img_with_border.save('imaged-with-border.png')