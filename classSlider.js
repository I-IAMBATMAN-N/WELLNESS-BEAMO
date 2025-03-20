"use strict";

function setHeightAndPadding(service, userAgent) {
  const isFirefox = () => {
    let browserName;

    const { userAgent } = navigator;

    if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
      browserName = "firefox";
    } else if (userAgent.match(/safari/i)) {
      browserName = "safari";
    } else if (userAgent.match(/opr\//i)) {
      browserName = "opera";
    } else if (userAgent.match(/edg/i)) {
      browserName = "edge";
    } else {
      browserName = "No browser detection";
    }
    return browserName === "firefox";
  };
  const treatmentSlider = document.querySelectorAll(".treatment-slider");
  //
  treatmentSlider.forEach((slider, index) => {
    //
    let cardHeight = slider.children[0].getBoundingClientRect().height;
    let headerHeight =
      slider.children[0].children[0].getBoundingClientRect().height;
    slider.style.height = `${cardHeight + headerHeight + 100}px`;
    //
    if (isFirefox()) {
      const treatmentPrices = service.querySelectorAll(".treatment-price");
      if (treatmentPrices.length > 1) {
        treatmentPrices.forEach((price) => {
          if (index !== 0) {
            price.style.paddingRight = "4rem";
          } else {
            price.style.paddingRight = "9rem";
          }
        });
      } else {
        if (index !== 0) {
          treatmentPrices[0].style.paddingRight = "4rem";
        } else {
          treatmentPrices[0].style.paddingRight = "9rem";
        }
      }
    }
  });
}

class Slider {
  constructor() {
    this.sliderContainers = document.querySelectorAll(".treatment-slider");
    this.secNavItems = document.querySelectorAll(".sec-nav--item");
    // this.services = document.querySelectorAll(".wrapper");
    // console.log("services", this.services);

    this.optionalControls = document.querySelectorAll(
      ".options-controls .slider-btn"
    );
    this.options = document.querySelectorAll(
      ".treatment-card.optional .treatment-options"
    );
    this.optionsPrices = document.querySelectorAll(
      ".treatment-card.optional .treatment-price"
    );
  }
  setCurrOption(number) {
    this.currOption = number;
  }
  setSlides() {
    this.sliderContainers.forEach((sliderContainer) => {
      let counter = 0;
      const dotContainer = sliderContainer.querySelector(".slider-dots");
      const slides = sliderContainer.querySelectorAll(".treatment-card");
      if (window.innerWidth > 768) {
        slides.forEach((slide, index) => {
          // set slides
          if (slides.length > 1) {
            slide.style.transform = `translate(${50 + 160 * index}%, -50%)`;
            if (index !== 0) {
              slide.style.opacity = "0%";
            } else if (index === 0) {
              slide.style.opacity = "100%";
            }
            // set controls
            dotContainer.innerHTML += `<div class="slider-dot"></div>`;
            const dots = dotContainer.querySelectorAll(".slider-dot");
            dots[counter].classList.add("active");
          }
        });
      }
    });
  }
  secNavItemsListener() {
    const services = document.querySelectorAll(".wrapper");

    this.secNavItems.forEach((navItem, index) => {
      navItem.addEventListener("click", function (event) {
        //
        services.forEach((service, serviceIndex) => {
          //
          if (service.classList.contains("active")) {
            service.classList.remove("active");
          }
          //
          if (serviceIndex === index) {
            //
            service.classList.add("active");
            //
            if (window.innerWidth > 768) {
              setHeightAndPadding(service);
            }
          }
        });
      });
    });
  }
  sliderContainersListener() {
    this.sliderContainers.forEach((sliderComponent) => {
      //
      let currSlide = 0;
      //
      sliderComponent
        .querySelectorAll(".slider-controls")
        .forEach((sliderControl) => {
          sliderControl.addEventListener("click", function (event) {
            //
            let currSlides = event.target.closest(".treatment-slider").children;
            let currControls = event.target.closest(".slider-controls");
            let currDots =
              currControls.closest(".slider-controls").children[1].children;
            //
            //define slider direction
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
  }
  optionsListener() {
    // console.log("optionsListener this.currOption", this.currOption);

    let currOption = 0;

    this.options.forEach((options) => {
      options.querySelectorAll("span").forEach((span, index) => {
        if (index === currOption) {
          span.style.display = "inline-block";
        } else if (index !== currOption) {
          span.style.display = "none";
        }
      });
    });
    this.optionsPrices.forEach((optionsPrice) => {
      optionsPrice.querySelectorAll("span").forEach((span, index) => {
        if (index === currOption) {
          span.style.display = "inline-block";
        } else if (index !== currOption) {
          span.style.display = "none";
        }
      });
    });
    this.optionalControls.forEach((control) => {
      const arrowRight = "chevron-forward-outline";
      const arrowLeft = "chevron-back-outline";

      control.addEventListener("click", function (event) {
        //
        const treatmentCardOptions = event.target
          .closest(".treatment-card")
          .children[1].children[1].querySelectorAll("span");
        const optionPrices = event.target
          .closest(".treatment-card")
          .children[1].children[3].children[1].querySelectorAll("span");
        //
        if (event.target.name === arrowRight) {
          if (currOption === treatmentCardOptions.length - 1) {
            currOption = 0;
            console.log(currOption);
          } else if (currOption !== treatmentCardOptions.length - 1) {
            console.log(currOption);
            currOption++;
            console.log(currOption);
          }
        } else if (event.target.name === arrowLeft) {
          if (currOption === 0) {
            currOption = treatmentCardOptions.length - 1;
            // console.log(this.currOption);
          } else if (currOption !== 0) {
            currOption--;
            console.log(currOption);
          }
        }
        treatmentCardOptions.forEach((option, index) => {
          if (index === currOption) {
            option.style.display = "inline-block";
          } else if (index !== currOption) {
            option.style.display = "none";
          }
        });
        optionPrices.forEach((optionPrice, index) => {
          if (index === currOption) {
            optionPrice.style.display = "inline-block";
          } else if (index !== currOption) {
            optionPrice.style.display = "none";
          }
        });
      });
    });
  }
}

const slider = new Slider();
// console.log("slider", slider);

slider.setSlides();
slider.secNavItemsListener();
slider.sliderContainersListener();
slider.optionsListener();
