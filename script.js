const palabras = [
  "manzana", "gato", "casa", "perro", "sol", "flor", "libro", "silla", "pelota", "lapiz",
  "agua", "amigo", "comida", "mesa", "guitarra", "arbol", "papel", "foto", "auto", "luna",
  "medialuna", "mariposa", "viento", "reloj", "corazon", "familia", "jardin", "relampago", "ventana", "hamburguesa",
  "telefono", "radio", "nube", "escuela", "estrella", "dinosaurio", "tren", "fiesta", "naturaleza", "playa",
  "chocolate", "pirata", "arcoiris", "telescopio", "robot", "selva", "piscina", "teclado"
];

let palabraSecreta = seleccionarPalabraAleatoria();
const letrasAdivinadas = new Set();
let intentosRestantes = 6;

const palabraElement = document.getElementById("palabra");
const intentosRestantesElement = document.getElementById("intentos-restantes");
const letrasElement = document.getElementById("letras");
const adivinarLetraElement = document.getElementById("adivinar-letra");
const adivinarBtnElement = document.getElementById("adivinar-btn");
const botonJugarOtraVez = document.getElementById('boton-jugar-otra-vez');
const ahorcadoImgElement = document.getElementById("imagen-ahorcado");

actualizarPalabraEnPantalla(palabraSecreta, letrasAdivinadas);
intentosRestantesElement.textContent = intentosRestantes;

adivinarBtnElement.addEventListener("click", adivinarLetra);

botonJugarOtraVez.addEventListener('click', () => {
  reiniciarJuego();
  botonJugarOtraVez.style.display = 'none';
});

function seleccionarPalabraAleatoria() {
  const indice = Math.floor(Math.random() * palabras.length);
  return palabras[indice];
}

function ocultarPalabra(palabra) {
  return palabra.replace(/[a-z]/g, "_ ");
}

function adivinarLetra() {
  const letra = adivinarLetraElement.value.toLowerCase();
  if (!letra.match(/^[a-z]$/)) {
    alert("Ingresa una letra válida.");
    return;
  }

  if (letrasAdivinadas.has(letra)) {
    alert("Ya adivinaste esta letra.");
    return;
  }

  letrasAdivinadas.add(letra);

  if (!palabraSecreta.includes(letra)) {
    intentosRestantes--;
    actualizarAhorcado();
  }

  actualizarPalabraEnPantalla(palabraSecreta, letrasAdivinadas);

  if (palabraSecreta === palabraElement.textContent.replace(/ /g, "")) {
    mostrarMensaje("¡Ganaste! La palabra es: " + palabraSecreta);
    deshabilitarInputYBoton();
    mostrarBotonJugarOtraVez();
    adivinarBtnElement.disabled = true; // Deshabilita el botón después de ganar
  }

  if (intentosRestantes === 0) {
    mostrarMensaje("¡Perdiste! La palabra era: " + palabraSecreta);
    deshabilitarInputYBoton();
    mostrarBotonJugarOtraVez();
  }

  intentosRestantesElement.textContent = intentosRestantes;
  adivinarLetraElement.value = "";
  letrasElement.textContent = Array.from(letrasAdivinadas).join(", ");
}

function mostrarPalabra(palabra, letrasAdivinadas) {
  let palabraMostrada = "";
  for (const letra of palabra) {
    if (letra === " " || letrasAdivinadas.has(letra)) {
      palabraMostrada += letra + " ";
    } else {
      palabraMostrada += "_ ";
    }
  }
  return palabraMostrada;
}

function mostrarMensaje(mensaje) {
  alert(mensaje);
}

function deshabilitarInputYBoton() {
  adivinarLetraElement.disabled = true;
  adivinarBtnElement.disabled = true;
}

function mostrarBotonJugarOtraVez() {
  botonJugarOtraVez.style.display = 'block';
}

function reiniciarJuego() {
  letrasAdivinadas.clear();
  palabraSecreta = seleccionarPalabraAleatoria();
  intentosRestantes = 6;
  actualizarPalabraEnPantalla(palabraSecreta, letrasAdivinadas);
  intentosRestantesElement.textContent = intentosRestantes;
  adivinarLetraElement.disabled = false;
  adivinarBtnElement.disabled = false;
  ahorcadoImgElement.src = 'img/ahorcado0.jpg';
  letrasElement.textContent = ""; // Limpiamos la lista de letras adivinadas
}


function actualizarPalabraEnPantalla(palabra, letrasAdivinadas) {
  palabraElement.textContent = mostrarPalabra(palabra, letrasAdivinadas);
}

function actualizarAhorcado() {
  if (intentosRestantes >= 0) {
    ahorcadoImgElement.src = `img/ahorcado${6 - intentosRestantes}.jpg`;
  }
}

// Inicialización de la representación visual del ahorcado
actualizarAhorcado();


