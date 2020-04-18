let canvas = document.querySelector('#canvas');

canvas.width = 500;
canvas.height = 500;

var nbSoin = 0
var nbMort = 0
var nbInfecte = 1

var e = document.createElement("H3")
var texte = "IL Y A " + String(nbInfecte) + " INFECTÉ(S). IL Y A " + String(nbSoin) + " SOIGNÉ(S) ET " + String(nbMort) + " MORT(S)."
e.appendChild(document.createTextNode(texte));
e.id = "resultat"
document.getElementById('anim').appendChild(e)

let c = canvas.getContext('2d');

let pause = false;

$("#pause").on("click", function(){
  pause = true;
});
$("#lancer").on("click", function(){
  pause = false;
  requestAnimationFrame(bouge);
});
$("#refresh").on("click", function(){
  window.location.reload()
});


let rayon = 5;

function posOuNeg() {
  const r = Math.random();
  if (r > 0.5) {
    return 1;
  }
  else {
    return -1;
  }
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function centre(i) {
  if (i == nbCercles - 1){
    return {
      x: rand(rayon, canvas.width - rayon),
      y: rand(rayon, canvas.height - rayon),
      dx: rand(3,15) * posOuNeg(),
      dy: rand(3,15) * posOuNeg(),
      color: "red",
      time: new Date().getTime()
    };
  } else{
    return {
      x: rand(rayon, canvas.width - rayon),
      y: rand(rayon, canvas.height - rayon),
      dx: rand(3,5) * posOuNeg(),
      dy: rand(3,5) * posOuNeg(),
      color: "blue",
      time: 0
    };
  }
}

function dessine(o) {
  c.beginPath();
  c.arc(o.x, o.y, rayon, 0, Math.PI*2, false);
  c.strokeStyle = o.color;
  c.stroke();
}

function maj(o) {
  if (o.x + rayon >= canvas.width) {
    o.dx = -o.dx;
    o.x = canvas.width - rayon
  }
  if (o.x - rayon < 0) {
    o.dx = -o.dx;
    o.x = rayon
  }
  if (o.y + rayon >= canvas.height) {
    o.dy = -o.dy;
    o.y = canvas.height - rayon
  }
  if (o.y - rayon < 0) {
    o.dy = -o.dy;
    o.y = rayon
  }
  for (var v of cercles) {
    if (cercles.indexOf(o) != cercles.indexOf(v)){
      if (Math.sqrt((v.x - o.x)**2 + (v.y - o.y)**2) <= rayon*2.1){
        if (o.color == "red" && v.color == "blue"){
          if (Math.floor(rand(1,6)) == 1){
            choc(o,v)
          }
          else {
            v.color = "red"
            v.time = new Date().getTime()
            choc(o,v)
          }
        }
        else if (v.color == "red" && o.color == "blue"){
          if (Math.floor(rand(1,3)) == 1){
            o.color == "red"
            o.time = new Date().getTime()
            choc(o,v)
          }
          else {
            choc(o,v)
          }
        }
        else {
          choc(o,v)
        }
      }
    }
  }
  o.x += o.dx;
  o.y += o.dy;
  dessine(o);
}

function choc(o, v){
  var distX = v.x - o.x
  var distY = v.y - o.y
  var dist = Math.sqrt(distX**2 + distY**2)
  var nx = distX/dist
  var ny = distY/dist
  var tx = -ny
  var ty = nx
  var vn1 = (o.dx*nx + o.dy*ny)
  var vt1 = (o.dx*tx + o.dy*ty)
  var vn2 = (v.dx*nx + v.dy*ny)
  var vt2 = (v.dx*tx + v.dy*ty)
  var vnP1 = vn2
  var vnP2 = vn1
  var vtP1 = vt1
  var vtP2 = vt2
  o.dx = vnP1*nx + vt1*tx
  o.dy = vnP1*ny + vt1*ty
  v.dx = vnP2*nx + vt2*tx
  v.dy = vnP2*ny + vt2*ty
}

let cercles = [];
var now = new Date().getTime();
var isAnInfected = false

function bouge(){
  isAnInfected = false
  requestAnimationFrame(bouge);
  texte = "IL Y A " + String(nbInfecte) + " INFECTÉ(S). IL Y A " + String(nbSoin) + " SOIGNÉ(S) ET " + String(nbMort) + " MORT(S)."
  document.getElementById('resultat').innerHTML = texte
  nbInfecte = 0
  if (pause) {return};
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (let o of cercles) {
    if (o.color == "red"){
      nbInfecte += 1
      isAnInfected = true
      now = new Date().getTime();
      if (Math.floor(((o.time - now)% (1000*60)) / 1000 ) == -8){
        var r = Math.floor(rand(1, 101))
        if (r <= 25){
          nbMort += 1
          cercles.splice(cercles.indexOf(o), 1)
        }
        else{
          nbSoin += 1
          o.color = "purple"
        }
      }
    }
    maj(o);
  }
  if (isAnInfected==false){
    pause = true;
  }
}


bouge();

let nbCercles = 20;

for (let i = 0; i < nbCercles; i++) {
  cercles.push(centre(i));
}
