var music = document.getElementById('music')
var furn = document.getElementById('furnace')
var can = document.getElementById('can')
var emp = document.getElementById('emp')
var chefS = document.getElementById('chefSound')

furn.volume = 0.3
furn.pause()
furn.loop = false

can.pause()
can.loop = false

emp.pause()
emp.loop = false

chefS.pause()
chefS.loop = false
chefS.volume = 1.5


music.volume = 0.4


function four(){
  furn.play()
}

function canSound(){
  can.play()
}

function empSound(){
  emp.play()
}

function chefSound(){
  chefS.play()
}
