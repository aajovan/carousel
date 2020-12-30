const prevButton = document.getElementById("carousel-button-prev");
const nextButton = document.getElementById("carousel-button-next");
const slideNav = document.getElementById("carousel-slide-nav");
const slides = document.querySelectorAll(".carousel-item");
const totalSlides = slides.length;
let slidePos = 0;
let navigation = slideNav.childNodes;
let intervalAutoplay = null;
slideNavigation();

function displaySlide(element, className) {
  for (let item = 0; item < totalSlides; item++) {
    item === slidePos
      ? element[item].classList.add(className)
      : element[item].classList.remove(className);
  }
}

function nextSlide() {
  if (slidePos === totalSlides - 1) {
    slidePos = 0;
  } else {
    slidePos++;
  }
  displaySlide(slides, "carousel-item-visible");
  displaySlide(navigation, "nav-current");
}

function prevSlide() {
  if (slidePos === 0) {
    slidePos = totalSlides - 1;
  } else {
    slidePos--;
  }
  displaySlide(slides, "carousel-item-visible");
  displaySlide(navigation, "nav-current");
}

function slideNavigation() {
  for (let slide = 0; slide < totalSlides; slide++) {
    let imgNavigation = document.createElement("img");
    imgNavigation.classList.add("carouselNav-img");
    imgNavigation.setAttribute('src', Array.from(slides)[slide].querySelectorAll("img")[0].src);
    if (slide === slidePos) {
      imgNavigation.classList.add("nav-current");
    }
    slideNav.append(imgNavigation);
    imgNavigation.addEventListener("click", function () {
      slidePos = slide;
      displaySlide(slides, "carousel-item-visible");
      displaySlide(navigation, "nav-current");
    });
  }
}

prevButton.addEventListener("click", prevSlide);
nextButton.addEventListener("click", nextSlide);

$('input[name="autoplay"]').on('click', function (e) {

  if (intervalAutoplay) {
    clearInterval(intervalAutoplay);
    intervalAutoplay = null;
  } else {
    intervalAutoplay = setInterval(nextSlide, 2000);
  }

});

