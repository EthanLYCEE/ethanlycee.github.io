var scroll = window.requestAnimationFrame ||
             function(callback){ window.setTimeout(callback, 1000/60)};
var elementsToShow = document.querySelectorAll('.toAnim');

var animPClass = ['animP1','animP2', 'animP3']

//Fonction qui retourne un élément aléatoire d'un tableau
function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

//Si l'élément est visible sur la page, on lui attribut une des classes d'animation d'aparition selon son type aléatoirement,
//une fois que l'élément aura cette classe, l'animation css se lancera.
function loop() {

  elementsToShow.forEach(function (element) {
    if (isElementInViewport(element)) {
      if (element.classList.length < 2 && element.tagName == "P"){
        element.classList.add(choose(animPClass));
      }
      else if (element.classList.length < 2 && element.tagName == "H2"){
        element.classList.add(choose(animPClass));
      }
      else if (element.classList.length < 2 && element.tagName == "U"){
        element.classList.add('animU')
      }
    } else {
      element.classList.forEach(function (elem) {
        element.classList.remove(elem)
      });
      element.classList.add("toAnim");
    }
  });

  scroll(loop);
}

loop();

//Fonction pour vérifier si l'élément "el" est visible par l'utilisateur, renvoie "true" ou "false" ( faite à l'aide d'un tuto )
function isElementInViewport(el) {
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}
