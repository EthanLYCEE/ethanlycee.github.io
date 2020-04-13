let canvas = document.querySelector('#test');

canvas.width = 1000;
canvas.height = 1000;

let c = canvas.getContext('2d');

let pause = false;

$("#pause").on("click", function(){
  pause = true;
});
$("#lancer").on("click", function(){
  pause = false;
  requestAnimationFrame(bouge);
});

let rayon = 30;

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

function centre() {
  return {
    x: rand(rayon, canvas.width - rayon),
    y: rand(rayon, canvas.height - rayon),
    dx: rand(3,15) * posOuNeg(),
    dy: rand(3,15) * posOuNeg()
  };
}

function dessine(o) {
  c.beginPath();
  c.arc(o.x, o.y, rayon, 0, Math.PI*2, false);
  c.strokeStyle = 'blue';
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
  for (let v of cercles) {
    if (cercles.indexOf(o) != cercles.indexOf(v)){
      if (Math.sqrt((v.x - o.x)**2 + (v.y - o.y)**2) <= rayon*2.1){
        choc(o,v)
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


function bouge() {
  requestAnimationFrame(bouge);
  if (pause) {return};
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (let o of cercles) {
    maj(o);
  }
}


bouge();

let nbCercles = 10;

for (let i = 0; i < nbCercles; i++) {
  cercles.push(centre());
}
