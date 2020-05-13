var canelés = 0;
var production = 1
var nbFour = 1
var nbEmpl = 0
var nbChef = 0
var employé = setInterval(employe,1000);
var chef = setInterval(chef,1000);


function verif(){
  if (canelés >= 25){
    document.getElementById('NouvFour').disabled = false
  }
  else {
    document.getElementById('NouvFour').disabled = true
  }
  if (canelés < 100){
    document.getElementById('AutoCanelé').disabled = true
  } else{
    document.getElementById('AutoCanelé').disabled = false
  }
  if (canelés < 150){
    document.getElementById('Chef').disabled = true
  } else{
    document.getElementById('Chef').disabled = false
  }
}


function Cuisine(){
  canelés += production
  document.getElementById('nbCan').innerHTML = canelés
  verif()
}

function NouveauFour (){
  canelés = canelés - 25
  document.getElementById('nbCan').innerHTML = canelés
  production += 1
  nbFour += 1
  if (nbFour == 2){
    alert("Tu peux maintenant embaucher ! Cela te couteras 100 canelés et un four ( donc -1 en production ) mais chaque employé produira 1 canelé par seconde !")
    document.getElementById('AutoCanelé').style = "display:inline"
    verif()
  }
  verif()
}

function employe(){
  canelés += nbEmpl
  document.getElementById('nbCan').innerHTML = canelés
  verif()
}

function NouveauEmpl(){
  canelés = canelés - 100
  nbEmpl += 1
  document.getElementById('nbCan').innerHTML = canelés
  production = production - 1
  if (nbEmpl == 1){
    alert("Tu peux maintenant embaucher des chefs d'equipe! Cela te couteras 150 canelés mais chaque chef d'equipe produira 10 canelés par seconde !")
    document.getElementById('Chef').style = "display:inline"
    verif()
  }
  verif()
}

function chef(){
  canelés += nbChef * 10
  document.getElementById('nbCan').innerHTML = canelés
  verif()
}

function NouveauChef(){
  canelés = canelés - 150
  nbChef += 1
  document.getElementById('nbCan').innerHTML = canelés
  verif()
}
