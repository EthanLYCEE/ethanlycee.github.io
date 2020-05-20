from tkinter import *
import time



incr = 2
size = incr * 10
posX = 1
posY = 1
map = [[]] * 100

for value in range(0, 100):
    map[value] = [0] * 100



def checkered(canvas, line_distance):
   # vertical lines at an interval of "line_distance" pixel
   for x in range(line_distance,canvas_width,line_distance):
      canvas.create_line(x * (incr), 0, x * (incr), canvas_height, fill="#476042")
   # horizontal lines at an interval of "line_distance" pixel
   for y in range(line_distance,canvas_height,line_distance):
      canvas.create_line(0, y * (incr), canvas_width, y * (incr), fill="#476042")

def right():
    global posX
    global posY
    if (map[posY][posX + 1] == 1):
        return False
    setACaseXY(posX, posY, 'grey')
    map[posY][posX] = -1
    posX += 1
    setACaseXY(posX, posY, 'yellow')
    if (map[posY][posX] == 2):
        exit(0)
        return 3
    return True

def left():
    global posX
    global posY
    if (map[posY][posX - 1] == 1):
        return False
    setACaseXY(posX, posY, 'grey')
    map[posY][posX] = -1
    posX -= 1
    setACaseXY(posX, posY, 'yellow')
    if (map[posY][posX] == 2):
        exit(0)
        return 3
    return True

def up():
    global posY
    global posX
    if (map[posY - 1][posX] == 1):
        return False
    setACaseXY(posX, posY, 'grey')
    map[posY][posX] = -1
    posY -= 1

    setACaseXY(posX, posY, 'yellow')
    if (map[posY][posX] == 2):
        exit(0)
        return 3
    return True

def down():
    global posY
    global posX
    if (map[posY + 1][posX] == 1):
        return False
    setACaseXY(posX, posY, 'grey')
    map[posY][posX] = -1
    posY += 1
    setACaseXY(posX, posY, 'yellow')
    if (map[posY][posX] == 2):
        exit(0)
        return 3
    return True



dir = []

#L'alogorythme s'appuie sur la technique bien connue qui est de suivre le mur à sa gauche
#( ça marche aussi à droite )

#Index = 1 car "left()" est à cette position dans le labyrinthe
index = 0

def algo(value):
    #LISTE DES FONCTIONS QUE L'ON TESTERA AVEC LE eval()
    functionToTest = ["up()" ,"left()", "down()", "right()"]

    #Globalisation de la variable index qui sera l'index de la fonction à tester dans
    #la liste functionToTest
    global index


    #Si de le mouvement de la fonction d'index "index" dans la liste "functionToTest"
    #est possible, cela veut dire que le mur n'est plus à droite
    if eval(functionToTest[index]):
        index += 1

        #Si l'index = 4, pour eviter de se retrouver en dehors de la liste, on la reprend
        #du début.
        if index == 4:
            index = 0
    else:
        index -= 1

        #Comme functionToTest comporte 4 élements, alors functionToTest[-5] = functionToTest[-1]
        if index == -5:
            index = -1



def setACaseXY(X, Y, color):
    points = [X * size, Y * size, size * (X + 1), Y * size, size * (X + 1), size * (Y + 1), X * size, size * (Y + 1)]
    w.create_polygon(points, outline="#476042", fill=color, width=4)



master = Tk()
canvas_width = 1400
canvas_height = 1000
w = Canvas(master,
           width=1400,
           height=1000)











path = 'map.txt'
with open(path) as fp:
   line = fp.readline()
   cnt = 0
   while line:
       x = line.find('x')
       while x != -1:
           setACaseXY(x, cnt, 'red')
           map[cnt][x] = 1
           x = line.find('x', x + 1)
       line = fp.readline()
       cnt += 1

w.pack()

setACaseXY(47, 21, 'green')
map[21][47] = 2

lastMoov = ""

for value in range(0, 2000):
    master.after(value * 100, algo, value)


checkered(w,10)

mainloop()
