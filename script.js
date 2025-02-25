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

//* box message */
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

// aggiungere il messaggio del form
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".box-form");
  const confirmationMessage = document.getElementById("confirmation-message");
  const messageBox = document.querySelector(".container-message-box");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita il refresh della pagina

    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          form.style.display = "none"; // Nasconde il form
          messageBox.classList.remove("hidden");
          confirmationMessage.textContent =
            "Grazie! Il tuo messaggio è stato inviato con successo.";
          confirmationMessage.classList.add("visible");
        } else {
          confirmationMessage.textContent =
            "Errore nell'invio. Riprova più tardi.";
          confirmationMessage.classList.add("visible");
        }
      })
      .catch((error) => {
        confirmationMessage.textContent =
          "Errore di connessione. Controlla la tua rete.";
        confirmationMessage.classList.add("visible");
      });
  });
});
