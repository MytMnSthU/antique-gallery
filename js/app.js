const images = [
   "1-best-oil-portraits-elisabeth-vigee-lebrun.jpg",
   "13-pavel-stroganov-old-painting.jpg",
   "16-best-old-paintings-elisabeth-vigee-lebrun.jpg",
   "18-elisabeth-vigee-lebrun-old-paintings.jpg",
   "18-ingres-princess-albert-de-broglie-old-painting.jpg",
   "19-princess-charlotte-old-painting.jpg",
   "385893_original.jpg",
   "6768355a85927fbeffdcf6695045bd43.jpg",
   "9-elisabeth-vigee-lebrun-old-paintings.jpg",
   "angel-holding-a-phylactery-raphael-1500-b19b797f.jpg",
   "famous-painting.jpg",
   "la-belle-ferroniere-famous-painting-s20migp9qoodqk9p.jpg",
   "madonna-of-loreto-raphael-1509-a167d7fb.jpg",
   "Metal Poster Displate _William Bouguereau_.jfif",
   "portrait-of-a-cardinal-raphael-1510-49347d94.jpg",
   "The Unbroken Line Catalog — Eleventh Street Arts.jfif",
   "15-prince-andrei-obolensky-old-painting.jpg",
];

const slider = document.querySelector(".slider");
loadImages();

const imgs = document.querySelectorAll(".slider img:not(.full)");
const closebtn = document.querySelector(".close-btn");
// const slideindicator = document.querySelector(".slide");
const indicatorelm = document.querySelector(".indicator");

const scrollbar = window
   .getComputedStyle(slider)
   .getPropertyValue("scrollbar-width");

function loadImages() {
   images.forEach((img, idx) => {
      const imgelm = document.createElement("img");
      imgelm.src = "./assets/img/" + img;
      imgelm.classList.add("slide-ani");
      imgelm.style.animationDelay = idx * 0.1 + "s";
      slider.appendChild(imgelm);
   });
}

let currentscrollpos = 0;
window.addEventListener("wheel", (evt) => {
   slider.scrollLeft += evt.deltaY * 10;
   // currentscrollpos += evt.deltaY;
   currentscrollpos += evt.deltaY / 10;
   // slideindicator.style.left = currentscrollpos + "px";
   // console.log(window.innerWidth);
   // console.log(slider.scrollLeft);
   console.log(evt.deltaY);
});

imgs.forEach((img) => {
   img.addEventListener("mouseenter", () => {
      img.classList.add("large");
      imgs.forEach((img) => {
         if (
            !img.classList.contains("large") &&
            !img.classList.contains("full")
         ) {
            img.classList.add("small");
         }
      });
   });

   img.addEventListener("mouseleave", () => {
      imgs.forEach((img) => img.classList.remove("small"));
      img.classList.remove("large");
   });

   img.addEventListener("click", (evt) => {
      // console.log(document.documentElement.offsetWidth, evt.clientX);
      let currentpos = evt.clientX;
      // let currentwidth = evt.target.offsetWidth;
      // let currentX = evt.pageX;
      // console.log(currentwidth, currentX);
      let half = document.documentElement.offsetWidth / 2;
      let diff = 0;

      let yearelm = document.querySelector('.year');
      yearelm && yearelm.remove();

      imgs.forEach((img) => img.classList.remove("full"));

      if (currentpos < half) {
         diff = half - currentpos;
         slider.scrollLeft -= diff;
      } else {
         diff = currentpos - half;
         slider.scrollLeft += diff;
      }

      indicatorelm.classList.add("hide");
      closebtn.classList.remove("hide");
      img.classList.add("full");

      const newspan  = document.createElement('span');
      newspan.textContent = "1780";
      newspan.className = 'year';
      evt.target.parentNode.insertBefore( newspan, evt.target)      
   });

   closebtn.addEventListener("click", () => {
      closebtn.classList.add("hide");
      indicatorelm.classList.remove("hide");
      imgs.forEach((img) => img.classList.remove("full"));
      document.querySelector('.year').remove();
   });
});

const getScrollbarWidth = () => slider.scrollWidth - slider.clientWidth;

// slider.scrollLeft = 5000;

console.log(getScrollbarWidth());
