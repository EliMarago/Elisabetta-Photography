// Array di immagini di background
const images = [
  "./img/IMG_8216-2.jpg", // Immagine 1
  "./img/img-24-4.JPG", // Immagine 2
  "./img/img-22-22.jpg",
  "./img/img-DSC_0116.jpg",
];

// Variabile per tracciare l'indice corrente
let currentIndex = 0;

// Funzione per cambiare l'immagine di background
function changeBackground() {
  const homeSection = document.getElementById("background");

  // Cambia l'immagine di background della sezione home
  homeSection.style.backgroundImage = `url(${images[currentIndex]})`;

  // Incrementa l'indice per passare alla prossima immagine
  currentIndex++;

  // Resetta l'indice se ha raggiunto la fine dell'array
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
}

// Cambia l'immagine ogni 5 secondi
setInterval(changeBackground, 4000);

//carosello immagini automatico

const carouselInner = document.querySelector(".carousel-inner");
const image = document.querySelectorAll(".carousel-inner img");
let index = 0; // Indice corrente della foto visibile

function slideCarousel() {
  index++;

  // Se siamo oltre l'ultima immagine, resettiamo l'indice
  if (index >= image.length) {
    index = 0;
  }

  // Calcoliamo la larghezza di un'immagine (comprese margin) e spostiamo il carosello
  const translateX = -index * (image[0].clientWidth + 30); // larghezza + margin

  carouselInner.style.transform = `translateX(${translateX}px)`;
}

// Far partire lo slider ogni 3 secondi
setInterval(slideCarousel, 3000);
