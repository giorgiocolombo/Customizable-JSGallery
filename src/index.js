// Author: Giorgio Colombo
// Customizable JS Gallery/Carousel
// v. 1-0.0
//
// Readme
// The consts under the settings section can be customized and accept values as in the following table.
// Everything is written in vanilla js except for hammer.js which is a framework that handles gestures.
// All the svg(s) are linked from flaticon as to see them on codesandbox.io. They should be changed during implementation.
// Some comments in order to simplify the implementation are also given in the css.
// The gallery is provided as an array, but it can be turned into an object as for simplify its legibility with the provided comment for the object and the loop in the gallery section.
//
//
// Possible values:
//  -arrows:
//      [true/false  , "inner"/"outer"]
//
//  -autoScroll:
//      [true/false  | numberofseconds]
//
//  -keydownScroll:
//      true/false        => assign true to move imgs with keyboard arrows
//
//  -clicableImg:
//      true/false        => assign true to be able to toggle imgs fullscreen
//
//  -infiniteScroll:
//      true/false
//
//  -caption:
//      true/false
//
//  -fullscreen:          => assign true to make gallery cover the full width of its container
//      true/false
//

// Settings
const settings = {
  arrows: [true, "outer"],
  autoScroll: [true, 3],
  keydownScroll: true,
  clicableImg: true,
  infiniteScroll: true,
  caption: false,
  fullscreen: false
};

//  arrows
const gallery = document.querySelector(".gallery");
if (settings.arrows[0] === true) {
  const frecciasinistra = document.createElement("img");
  frecciasinistra.src = "https://image.flaticon.com/icons/svg/126/126492.svg";
  frecciasinistra.className = "arrowleft";
  frecciasinistra.alt = "freccia sinistra";
  const frecciadestra = document.createElement("img");
  frecciadestra.src = "https://image.flaticon.com/icons/svg/126/126490.svg";
  frecciadestra.className = "arrowright";
  frecciadestra.alt = "freccia destra";
  gallery.appendChild(frecciasinistra);
  gallery.appendChild(frecciadestra);
  if (settings.arrows[1] === "inner") {
    frecciasinistra.style.backgroundColor = "#fff";
    frecciadestra.style.background = "#fff";
    frecciasinistra.style.left = "0";
    frecciadestra.style.right = "0";
  }
}

// Get constants and position
const carousel = document.querySelector(".carousel");
const left = document.querySelector(".arrowleft");
const right = document.querySelector(".arrowright");
let position = 0;

if (settings.fullscreen === true) {
  gallery.style.width = "100%";
}

// Get images sources and counting array lenght
// Put here your images
// Always add an alt for accessibility
// Define a caption. Caption can be disable by configs, you can ignore the array or compile it anyway.
let galleria = {
  src: [
    "https://source.unsplash.com/random?forest",
    "https://source.unsplash.com/random?street",
    "https://source.unsplash.com/random?coding",
    "https://source.unsplash.com/random?vertical",
    "https://source.unsplash.com/random?urban"
  ],
  alt: ["a", "b", "c", "d", "e"],
  caption: ["Foresta", "Street", "Coding", "Vertical", "Urban"]
};
let numimg = galleria.src.length;
let contatoregalleria = 0;
// Alternative gallery object and loop
//
// let galleria = {
//   immagine1: {
//     src: "indirizzo1",
//     alt: "immagine1",
//     caption: "caption2"
//   },
//   immagine2: {
//     src: "indirizzo2",
//     alt: "immagine2",
//     caption: "caption2"
//   },
//   immagine3: {
//     src: "indirizzo3",
//     alt: "immagine3",
//     caption: "caption3"
//   }
// };

// for (var immagine in galleria) {
//   if (gallery.hasOwnProperty(immagine)) {
//     console.log(gallery[immagine].src);
//   }
// }

// append images to carousel
galleria.src.forEach(img => {
  const divcontainer = document.createElement("div");
  const immagine = document.createElement("img");
  immagine.src = img;
  immagine.alt = galleria.alt[contatoregalleria];
  divcontainer.appendChild(immagine);
  carousel.appendChild(divcontainer);
  if (settings.caption === true) {
    const imgcaption = document.createElement("p");
    imgcaption.innerText = galleria.caption[contatoregalleria];
    divcontainer.appendChild(imgcaption);
  }
  contatoregalleria++;
});

// Click for fullscreen img
if (settings.clicableImg === true) {
  carousel.querySelectorAll("img").forEach(immagine => {
    immagine.addEventListener("click", evt => {
      clearInterval(intervallo);
      const immagineclone = immagine.cloneNode();
      const opacity = document.createElement("div");
      const closefullscreen = document.createElement("img");
      closefullscreen.src =
        "https://image.flaticon.com/icons/svg/748/748122.svg";
      closefullscreen.className = "close__fullscreen";
      opacity.className = "fullscreen__opacity";
      opacity.style.backgroungColor = "fullscreen__opacity";
      immagineclone.className = "img__fullscreen";
      if (immagineclone.width > immagineclone.height) {
        immagineclone.className = "img__orizontal";
      } else {
        immagineclone.className = "img__vertical";
      }
      opacity.appendChild(immagineclone);
      opacity.appendChild(closefullscreen);
      document.body.appendChild(opacity);
      closefullscreen.addEventListener("click", evt => {
        opacity.parentNode.removeChild(opacity);
      });
    });
  });
}

// hide arrows function and start it

function hide() {
  if (settings.infiniteScroll !== true) {
    if (position === 0) {
      left.style.visibility = "hidden";
    }
    if (position < 0) {
      left.style.visibility = "visible";
    }
    if (position === -(numimg - 1) * 100) {
      right.style.visibility = "hidden";
    }
    if (position > -(numimg - 1) * 100) {
      right.style.visibility = "visible";
    }
  }
}
if (settings.arrows[0] === true) {
  hide();
}

// Autoscroll
let intervallo = 0;
if (settings.autoScroll[0] === true) {
  intervallo = setInterval(() => {
    avanti();
  }, settings.autoScroll[1] * 1000);
}

// Create function in order to translate the carousel that can be used in multiple listeners
function indietro() {
  if (position < 0) {
    position = position + 100;
  } else {
    if (settings.infiniteScroll === true) {
      position = -((numimg - 1) * 100);
    }
  }
  carousel.style.transform = `translateX(${position}%)`;
}
function avanti() {
  if (position > -((numimg - 1) * 100)) {
    position = position - 100;
  } else {
    if (settings.infiniteScroll === true) {
      position = 0;
    }
  }
  carousel.style.transform = `translateX(${position}%)`;
}

// listening for left arrow to be clicked
if (settings.arrows[0] === true) {
  left.addEventListener("click", evt => {
    clearInterval(intervallo);
    indietro();
    hide();
  });
}

// listening for right arrow to be clicked
if (settings.arrows[0] === true) {
  right.addEventListener("click", evt => {
    clearInterval(intervallo);
    avanti();
    hide();
  });
}

// liistening for both keydown
if (settings.keydownScroll === true) {
  document.addEventListener("keydown", evt => {
    clearInterval(intervallo);
    if (evt.keyCode === 39) {
      avanti();
    }
    if (evt.keyCode === 37) {
      indietro();
    }
    if (
      (evt.keyCode === 37 || evt.keyCode === 39) &
      (settings.arrows[0] === true)
    ) {
      hide();
    }
  });
}

// Gestures
const touchTarget = new Hammer(carousel);
touchTarget.on("swipeleft", evt => {
  clearInterval(intervallo);
  avanti();
  hide();
});
touchTarget.on("swiperight", evt => {
  clearInterval(intervallo);
  indietro();
  hide();
});
