"use strict";

const sliderContainer = document.querySelectorAll(".treatment-slider");

let counter = 0;

sliderContainer.forEach((sliderContainer) => {
  //
  const dotContainer = sliderContainer.querySelector(".slider-dots");
  const slides = sliderContainer.querySelectorAll(".treatment-card");

  slides.forEach((slide, index) => {
    if (window.innerWidth > 770) {
      if (slides.length > 1) {
        slide.style.transform = `translate(${50 + 160 * index}%, -50%)`;
        if (index !== 0) {
          // console.log(slide);
          slide.style.opacity = "0%";
        } else if (index === 0) {
          slide.style.opacity = "100%";
        }
        dotContainer.innerHTML += `<div class="slider-dot"></div>`;
        const dots = dotContainer.querySelectorAll(".slider-dot");
        dots[counter].classList.add("active");
      }
    }
  });
  //display default current dot
});

let currSlides;
let currDots;

sliderContainer.forEach((sliderComponent) => {
  let currSlide = 0;
  sliderComponent
    .querySelectorAll(".slider-controls")
    .forEach((sliderControl) => {
      sliderControl.addEventListener("click", function (event) {
        // console.log("sliderControl", sliderControl);
        //
        currSlides = event.target
          .closest(".slider-controls")
          .closest(".treatment-slider").children;

        currDots =
          event.target.closest(".slider-controls").children[1].children;
        //
        //define slide direction
        if (event.target.name === "chevron-forward-outline") {
          //
          if (currSlide === currSlides.length - 2) {
            currSlide = 0;
          } else {
            currSlide++;
          }
        } else if (event.target.name === "chevron-back-outline") {
          if (currSlide === 0) {
            currSlide = currSlides.length - 2;
          } else {
            currSlide--;
          }
        }
        //
        //shift all current slides on click
        for (let i = 0; i < currSlides.length - 1; i++) {
          currSlides[i].style.transform = `translate(${
            50 + 160 * (i - currSlide)
          }%, -50%)`;
          if (i !== currSlide) {
            // console.log(currSlides[i]);
            currSlides[i].style.opacity = "0%";
          } else if (i === currSlide) {
            currSlides[i].style.opacity = "100%";
          }
        }
        //reset active status for all dots
        for (let i = 0; i < currDots.length; i++) {
          currDots[i].classList.remove("active");
        }
        //display current active dot
        currDots[currSlide].classList.add("active");
      });
    });
});
