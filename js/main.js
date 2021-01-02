
$(document).ready(function () {
  const prevButton = document.getElementById("carousel__button-prev");
  const nextButton = document.getElementById("carousel__button-next");
  const slideNav = document.getElementById("carousel__nav");
  const slides = document.querySelectorAll(".carousel__item");
  const totalSlides = slides.length;
  var slidePos = 0;
  var navigation = slideNav.childNodes;
  var intervalAutoplay = null;

  var mbConfig = {
    autoplay: false,
    hideNav: false,
    time: 0
  }
  var dtConfig = {
    autoplay: false,
    hideNav: false,
    time: 0
  }

  slideNavigation();

  function displaySlide(element, className) {
    for (var item = 0; item < totalSlides; item++) {
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
      var imgNavigation = document.createElement("img");
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

  $('#saveBtn').on('click', function (e) {
    checkIsMobile();
  });

  var toggleNav = function (input, configItem, isCurrent) {
    if ($(input).prop("checked") === true) {
      if (isCurrent) { $('.carousel__nav').addClass('hidden'); }
      configItem.hideNav = true;
    } else {
      if (isCurrent) { $('.carousel__nav').removeClass('hidden'); }
      configItem.hideNav = false;
    }
  }

  var toggleAutoplay = function (input, inputNum, configItem, isCurrent) {
    var autoplayNum = Number.parseInt($(inputNum).val());
    if (($(input).prop("checked") === true) && autoplayNum) {
      if (isCurrent) {
        clearInterval(intervalAutoplay);
        intervalAutoplay = setInterval(nextSlide, autoplayNum);
      }
      configItem.autoplay = true;
      configItem.time = autoplayNum;
    } else {
      if (isCurrent && intervalAutoplay) {
        clearInterval(intervalAutoplay);
        intervalAutoplay = null;
      }
      configItem.autoplay = false;
      configItem.time = 0;
      $(input).prop("checked", false);
      $(inputNum).prop("value", 0);
    }
  }

  $('[popup-open]').on('click', function () {
    var popup_name = $(this).attr('popup-open');
    $('[popup-name="' + popup_name + '"]').fadeIn(300);
    loadSettings();
  });

  $('[popup-close]').on('click', function () {
    var popup_name = $(this).attr('popup-close');
    $('[popup-name="' + popup_name + '"]').fadeOut(300);
  });

  var loadSettings = function () {
    $('input[name="toggleNav-mb"]').prop("checked", mbConfig.hideNav);
    $('input[name="autoplay-mb"]').prop("checked", mbConfig.autoplay);
    $('input[name="autoplayNum-mb"]').prop("value", mbConfig.time);
    $('input[name="toggleNav-dt"]').prop("checked", dtConfig.hideNav);
    $('input[name="autoplay-dt"]').prop("checked", dtConfig.autoplay);
    $('input[name="autoplayNum-dt"]').prop("value", dtConfig.time);
  }
  var checkIsMobile = function () {
    if (window.innerWidth < 992) {
      toggleNav($('input[name="toggleNav-mb"]'), mbConfig, true);
      toggleNav($('input[name="toggleNav-dt"]'), dtConfig, false);
      toggleAutoplay($('input[name="autoplay-mb"]'), $('input[name="autoplayNum-mb"]'), mbConfig, true);
      toggleAutoplay($('input[name="autoplay-dt"]'), $('input[name="autoplayNum-dt"]'), dtConfig, false);
    } else {
      toggleNav($('input[name="toggleNav-mb"]'), mbConfig, false);
      toggleNav($('input[name="toggleNav-dt"]'), dtConfig, true);
      toggleAutoplay($('input[name="autoplay-dt"]'), $('input[name="autoplayNum-dt"]'), dtConfig, true);
      toggleAutoplay($('input[name="autoplay-mb"]'), $('input[name="autoplayNum-mb"]'), mbConfig, false);
    }
  };
  checkIsMobile();
  window.onresize = checkIsMobile;
});
