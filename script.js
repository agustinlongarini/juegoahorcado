const palabras = [
  "manzana", "gato", "casa", "perro", "sol", "flor", "libro", "silla", "pelota", "lapiz",
  "agua", "amigo", "comida", "mesa", "guitarra", "arbol", "papel", "foto", "coche", "luna",
  "montana", "mariposa", "viento", "reloj", "corazon", "familia", "jardin", "relampago", "ventana", "hamburguesa",
  "telefono", "radio", "nube", "escuela", "estrella", "dinosaurio", "tren", "fiesta", "naturaleza", "playa",
  "chocolate", "pirata", "arcoiris", "telescopio", "robot", "selva", "piscina", "teclado"
];
const palabraSecreta = seleccionarPalabraAleatoria();
const letrasAdivinadas = new Set();
let intentosRestantes = 5;

const ahorcadoImgElement = document.getElementById("imagen-ahorcado");
const palabraElement = document.getElementById("palabra");
const intentosRestantesElement = document.getElementById("intentos-restantes");
const letrasElement = document.getElementById("letras");
const adivinarLetraElement = document.getElementById("adivinar-letra");
const adivinarBtnElement = document.getElementById("adivinar-btn");

document.getElementById("palabra").textContent = ocultarPalabra(palabraSecreta);

adivinarBtnElement.addEventListener("click", adivinarLetra);

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

  const palabraMostrada = mostrarPalabra(palabraSecreta, letrasAdivinadas);
  palabraElement.textContent = palabraMostrada;
  letrasElement.textContent = Array.from(letrasAdivinadas).join(", ");

  if (palabraMostrada === palabraSecreta) {
    mostrarMensaje("¡Ganaste! La palabra es: " + palabraSecreta);
    deshabilitarInputYBoton();
  }

  if (intentosRestantes === 0) {
    mostrarMensaje("¡Perdiste! La palabra era: " + palabraSecreta);
    deshabilitarInputYBoton();
  }

  intentosRestantesElement.textContent = intentosRestantes;
  adivinarLetraElement.value = "";
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

function actualizarAhorcado() {
    if (intentosRestantes >= 0) {
      ahorcadoImgElement.src = `img/ahorcado${5 - intentosRestantes}.jpg`;
    }
  }

// Inicialización de la representación visual del ahorcado
actualizarAhorcado();







