"use strict";

const sliderContainer = document.querySelectorAll(".treatment-slider");

let counter = 0;

sliderContainer.forEach((sliderContainer) => {
  //
  const dotContainer = sliderContainer.querySelector(".slider-dots");
  const slides = sliderContainer.querySelectorAll(".treatment-card");

  slides.forEach((slide, index) => {
    if (window.innerWidth > 770) {
      slide.style.transform = `translateX(${140 * index}%)`;
      dotContainer.innerHTML += `<div class="slider-dot"></div>`;
    }
  });
  //display default current dot
  const dots = dotContainer.querySelectorAll(".slider-dot");
  // dots[counter].style.backgroundColor = "#6e825f";
  dots[counter].classList.add("active");
});
