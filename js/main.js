const prevButton = document.getElementById("carousel__button-prev");
const nextButton = document.getElementById("carousel__button-next");
const slideNav = document.getElementById("carousel__nav");
const slides = document.querySelectorAll(".carousel__item");
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
  displaySlide(slides, "carousel__item-visible");
  displaySlide(navigation, "carousel__nav-active");
}

function prevSlide() {
  if (slidePos === 0) {
    slidePos = totalSlides - 1;
  } else {
    slidePos--;
  }
  displaySlide(slides, "carousel__item-visible");
  displaySlide(navigation, "carousel__nav-active");
}

function slideNavigation() {
  for (let slide = 0; slide < totalSlides; slide++) {
    let imgNavigation = document.createElement("img");
    imgNavigation.classList.add("carousel__nav-img");
    imgNavigation.setAttribute('src', Array.from(slides)[slide].querySelectorAll("img")[0].src);
    if (slide === slidePos) {
      imgNavigation.classList.add("carousel__nav-active");
    }
    slideNav.append(imgNavigation);
    imgNavigation.addEventListener("click", function () {
      slidePos = slide;
      displaySlide(slides, "carousel__item-visible");
      displaySlide(navigation, "carousel__nav-active");
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

$('input[name="toggleNav"]').on('click', function (e) {
$('.carousel__nav').toggleClass('hidden');

});

$('[popup-open]').on('click', function () {
  var popup_name = $(this).attr('popup-open');
  $('[popup-name="' + popup_name + '"]').fadeIn(300);
});

$('[popup-close]').on('click', function () {
  var popup_name = $(this).attr('popup-close');
  $('[popup-name="' + popup_name + '"]').fadeOut(300);
});


