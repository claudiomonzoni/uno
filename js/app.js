// nav
const menuIco = document.querySelector(".menu-toggle");
const menuFull = document.querySelector("#barraNav");
const abierto = false;

let abrirMenuFull = () => {
  this.abierto = !this.abierto;
  menuFull.classList.remove("abierto");
  menuFull.classList.remove("animaMenu");
  menuIco.classList.toggle("is-active");

  this.abierto
    ? menuFull.classList.toggle("abierto")
    : menuFull.classList.toggle("animaMenu");
};

menuIco.addEventListener("click", abrirMenuFull);

//carrusel

const botonesSlider = document.getElementById("botonesSlider");
//video
const play = document.querySelector("#play");
const video = document.getElementById("video");
const slider = document.querySelector(".slider");

if (slider) {
  console.log("hola");
  const mySiema = new Siema({
    selector: ".slider",
    duration: 200,
    easing: "ease-out",
    perPage: 1,
    startIndex: 0,
    draggable: true,
    multipleDrag: true,
    threshold: 20,
    loop: false,
  });

  // Add a function that generates pagination to prototype
  Siema.prototype.addPagination = function () {
    for (let i = 0; i < this.innerElements.length; i++) {
      const btn = document.createElement("button");
      btn.textContent = i + 1;
      btn.classList.add("boton");
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (video) {
          video.pause();
          play.style.opacity = "1";
        }
        this.goTo(i);
      });
      this.selector.appendChild(btn);
      botonesSlider.appendChild(btn);
    }
  };

  // Trigger pagination creator
  mySiema.addPagination();
}

//video
//video

play.addEventListener("click", (e) => {
  e.preventDefault();
  video.play();
  play.style.opacity = "0";
});

video.addEventListener("click", (e) => {
  e.preventDefault();
  video.pause();
  play.style.opacity = "1";
  console.log("play");
});

// torres
//falta hacer un array u obtener la ruta de la imagen por data
// document.getElementById("portada").src = portada[1];

// Paso1: hacer un JSON
// paso2: cargarlo y generar lo botonesSlider
// paso3: event listener con funcion para cargar y colocar imagenes
// paso 4: funcion para cada btn de cada torre y cambiar el JSON.

const niveles = document.getElementById("BtnesNiveles");
const nivelesCss = document.getElementById("nivelesCSS");
const nivelesCssH3 = document.querySelector("#nivelesCSS h3");
const planos = document.querySelector(".planos img");

carga = (url) => {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((nivel) => {
      generar(nivel);
    });
};


generar = (btnes) => {
 
  //inserto primer imagen
  planos.src = btnes[0].url;
  niveles.innerHTML = ""
  let botones = "";
  btnes.forEach((btn) => {

    const boton = document.createElement("li");
    boton.innerHTML = `<a href="#" data-url="${btn.url}">${btn.nombre}</a>`;
    //childnode para llegar al anchor y no quedarme el li
    boton.childNodes[0].addEventListener("click", (e) => {
      e.preventDefault();
      quitarCssActivo()
      e.target.classList.add("btnactivo")
      planos.src = e.target.dataset.url
    });

    niveles.appendChild(boton);
  });
  //obtengo un array de todos los botones y los elimino

  quitarCssActivo = () =>{
    const todosNiveles = document.querySelectorAll("#BtnesNiveles li a")
    for(i=0; i < todosNiveles.length; i++){
      todosNiveles[i].classList.remove("btnactivo")
    }
  
  }

};

document.querySelector("#torreA").addEventListener("click", function(e){
  e.preventDefault()
  carga("img/plantas/torreA.json")
  nivelesCss.classList.remove("nivelesB", "nivelesC", "nivelesD")
  nivelesCss.classList.add("nivelesA")
  nivelesCssH3.textContent ="TORRE A"

})

document.querySelector("#torreB").addEventListener("click", function(e){
  e.preventDefault()
  carga("img/plantas/torreB.json")
  nivelesCss.classList.remove("nivelesA", "nivelesC", "nivelesD")
  nivelesCss.classList.add("nivelesB")
  nivelesCssH3.textContent ="TORRE B"
})

//inicio
carga("img/plantas/torreA.json")