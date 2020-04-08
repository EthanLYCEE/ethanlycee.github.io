let canvas = document.querySelector('#test');

canvas.width = 500;
canvas.height = 500;

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
    if (o.x + rayon >= canvas.width || o.x - rayon < 0) {
        o.dx = -o.dx;
    }
    if (o.y + rayon >= canvas.height || o.y - rayon < 0) {
        o.dy = -o.dy;
    }
    for (let c of cercles) {
      for (let v of cercles) {
        console.log(v.x, c.x, v.y, c.y)
        if (cercles.indexOf(c) != cercles.indexOf(v)){
          if (Math.sqrt((v.x - c.x)**2 + (v.y - c.y)**2) <= rayon*2){
            pause = true
          }
        }
        }
      }
    o.x += o.dx;
    o.y += o.dy;
    dessine(o);
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

let nbCercles = 3;

for (let i = 0; i < nbCercles; i++) {
    cercles.push(centre());
}
