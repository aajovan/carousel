"use strict";

var globalUI = {
  popup: "#popup",
  popupBtnOpen: ".popup__btn-open",
  popupBtnClose: ".popup__btn-close",
  toggleNav_mb: 'input[name="toggleNav-mb"]',
  toggleNav_dt: 'input[name="toggleNav-dt"]',
  autoplay_mb: 'input[name="autoplay-mb"]',
  autoplay_dt: 'input[name="autoplay-dt"]',
  autoplayNum_mb: 'input[name="autoplayNum-mb"]',
  autoplayNum_dt: 'input[name="autoplayNum-dt"]',
  carousel: '.carousel',
  carouselNav: ".carousel__nav",
  carouselItem: ".carousel__item",
  carouselNavImg: ".carousel__nav-img",
  carouselNavActive: "carousel__nav-active",
  carouselItemActive: "carousel__item-visible",
  buttonSave: "#saveBtn",
  prevBtn: "#carousel__button-prev",
  nextBtn: "#carousel__button-next"
};
var mbConfig = {
  autoplay: false,
  hideNav: false,
  time: 0
};
var dtConfig = {
  autoplay: false,
  hideNav: false,
  time: 0
};
var totalSlides = $(globalUI.carouselItem).length;
var slidePos = 0;
var intervalAutoplay = null;

// init, apply default config

slideNavigation();
checkIsMobile();
window.onresize = checkIsMobile;

// setup next, prev btns

$(globalUI.prevBtn).on("click", prevSlide);
$(globalUI.nextBtn).on("click", nextSlide);

// setup settings popup

$(globalUI.popupBtnOpen).on("click", function () {
  $(globalUI.popup).fadeIn(300);
  loadSettings();
});
$(globalUI.popupBtnClose).on("click", function () {
  $(globalUI.popup).fadeOut(300);
});

// setup save btn

$(globalUI.buttonSave).on("click", function () {
  checkIsMobile();
});

// main function, setup carousel and carousel nav

function slideNavigation() {
  $(globalUI.carouselItem).each(function (slide) {
    var imgNavigation = document.createElement("img");
    imgNavigation.classList.add("carousel__nav-img");
    imgNavigation.setAttribute("src", $(this).find("img").attr("src"));

    if (slide === slidePos) {
      imgNavigation.classList.add(globalUI.carouselNavActive);
    }

    $(globalUI.carouselNav).append(imgNavigation);
    imgNavigation.addEventListener("click", function () {
      slidePos = slide;
      displayActiveSlide();
    });
  });
}

// helper function - sets active carousel and nav item

function displayActiveSlide() {
  displaySlide(globalUI.carouselItem, globalUI.carouselItemActive);
  displaySlide(globalUI.carouselNavImg, globalUI.carouselNavActive);
}

// set active item

function displaySlide(element, className) {
  $(element).each(function (item) {
    item === slidePos
      ? $(this).addClass(className)
      : $(this).removeClass(className);
  });
}

// go to next slide function

function nextSlide() {
  if (slidePos === totalSlides - 1) {
    slidePos = 0;
  } else {
    slidePos++;
  }

  displayActiveSlide();
}

// go to previous slide function

function prevSlide() {
  if (slidePos === 0) {
    slidePos = totalSlides - 1;
  } else {
    slidePos--;
  }

  displayActiveSlide();
}

// get and set navigation toggle data

function toggleNav(input, configItem, isCurrent) {
  if ($(input).prop("checked") === true) {
    if (isCurrent) {
      $(globalUI.carouselNav).addClass("hidden");
    }

    configItem.hideNav = true;
  } else {
    if (isCurrent) {
      $(globalUI.carouselNav).removeClass("hidden");
    }

    configItem.hideNav = false;
  }
}

// get and set autoplay data

function toggleAutoplay(input, inputNum, configItem, isCurrent) {
  var autoplayNum = Number($(inputNum).val());

  if ($(input).prop("checked") === true && autoplayNum) {
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

// load popup settings

function loadSettings() {
  $(globalUI.toggleNav_mb).prop("checked", mbConfig.hideNav);
  $(globalUI.autoplay_mb).prop("checked", mbConfig.autoplay);
  $(globalUI.autoplayNum_mb).prop("value", mbConfig.time);
  $(globalUI.toggleNav_dt).prop("checked", dtConfig.hideNav);
  $(globalUI.autoplay_dt).prop("checked", dtConfig.autoplay);
  $(globalUI.autoplayNum_dt).prop("value", dtConfig.time);
}

// check if current window mobile or desktop
// apply user configuration

function checkIsMobile() {
  if (window.innerWidth < 992) {
    toggleNav($(globalUI.toggleNav_mb), mbConfig, true);
    toggleNav($(globalUI.toggleNav_dt), dtConfig, false);
    toggleAutoplay(
      $(globalUI.autoplay_mb),
      $(globalUI.autoplayNum_mb),
      mbConfig,
      true
    );
    toggleAutoplay(
      $(globalUI.autoplay_dt),
      $(globalUI.autoplayNum_dt),
      dtConfig,
      false
    );
  } else {
    toggleNav($(globalUI.toggleNav_mb), mbConfig, false);
    toggleNav($(globalUI.toggleNav_dt), dtConfig, true);
    toggleAutoplay(
      $(globalUI.autoplay_mb),
      $(globalUI.autoplayNum_mb),
      mbConfig,
      false
    );
    toggleAutoplay(
      $(globalUI.autoplay_dt),
      $(globalUI.autoplayNum_dt),
      dtConfig,
      true
    );
  }
}

//add swipe gestures

$(globalUI.carousel).on("touchstart", startTouch);
$(globalUI.carousel).on("touchmove", moveTouch);

var initialX = null;
var initialY = null;

function startTouch(e) {
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;
};

function moveTouch(e) {
  if (initialX === null) {
    return;
  }

  if (initialY === null) {
    return;
  }

  var currentX = e.touches[0].clientX;
  var currentY = e.touches[0].clientY;

  var diffX = initialX - currentX;
  var diffY = initialY - currentY;

  if (Math.abs(diffX) > Math.abs(diffY)) {

    if (diffX > 0) {
      prevSlide()
    } else {
      nextSlide();
    }
  }

  initialX = null;
  initialY = null;

  e.preventDefault();
};