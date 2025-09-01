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
let maxSlide = image.length;

function slideCarousel() {
  index++;

  // Se siamo oltre l'ultima immagine, resettiamo l'indice
  if (index === maxSlide - 2) {
    index = 0;
  }
  const imageStyle = getComputedStyle(image[0]);
  const imageMargin =
    parseInt(imageStyle.marginLeft) + parseInt(imageStyle.marginRight); // Margine totale
  const imageWidth = image[0].clientWidth; // Larghezza immagine
  const totalWidth = imageWidth + imageMargin;

  // Calcoliamo la larghezza di un'immagine (comprese margin) e spostiamo il carosello
  const translateX = -index * totalWidth;

  carouselInner.style.transform = `translateX(${translateX}px)`;
}

// Far partire lo slider ogni 3 secondi
setInterval(slideCarousel, 3000);

// //* box message */
//1. intercettare l'invio del form e impedirne il comportamento predefinito(reindirizzamento alla pagina di conferma di netlify)
//2. mostrare un messaggio di conferma personalizzato invece di quello standard di netlify
document.querySelector(".box-form").addEventListener("submit", function (e) {
  e.preventDefault(); //impedisce il comportamento predefinito del form(redirect o refresh della pagina)

  const form = e.target; // seleziona il form che scatena l'evento
  const formData = new FormData(form); // crea un oggetto con tutti i dati del form(nome,email,messaggio)

  fetch("/", {
    // i dati vengono inviati a netlify
    method: "POST",
    headers: { "Content-type": "application/x-www-form-urlencoded" }, // indica il formato dei dati inviati
    body: new URLSearchParams(formData).toString(), // i dati vengono convertiti in un formato leggibile
  })
    .then((response) => {
      // gestisce la risposta del server
      if (response.ok) {
        confirmationMessage("Thank you! Your message has been sent");
        form.reset();
      } else {
        confirmationMessage("Oops! Something went wrong. Please try again");
      }
    })
    .catch(() => {
      confirmationMessage("An error occurred. Please try again later");
    });
  //la funziona mostra e nasconde il messaggio personalizzato
  function confirmationMessage(message) {
    const confirmationMessage = document.getElementById("confirmation-message");
    const boxMessage = document.querySelector(".container-message-box");

    confirmationMessage.textContent = message;
    boxMessage.classList.remove("hidden");
    confirmationMessage.classList.add("visible");

    setTimeout(() => {
      confirmationMessage.classList.remove("visible");
      boxMessage.classList.add("hidden");
    }, 5000);
  }
});

// document.querySelector(".box-form").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const confirmationMessage = document.getElementById("confirmation-message");
//   const boxMessage = document.querySelector(".container-message-box");

//   confirmationMessage.textContent = "Thank you! Your message has been sent.";
//   boxMessage.classList.remove("hidden");
//   confirmationMessage.classList.add("visible");

//   e.target.reset();
//   setTimeout(() => {
//     confirmationMessage.classList.remove("visible");
//     boxMessage.style.opacity = "0";
//   }, 5000);
// });
// script.js;

//sticky nav
const sectionHome = document.querySelector(".home");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHome);
