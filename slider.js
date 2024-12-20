"use strict";

const sliderContainers = document.querySelectorAll(".treatment-slider");
/* ---------------------------------------- setSlides function ----------------------------------------
- default (onload) styling for slides
- 
*/

function setSlides() {
  sliderContainers.forEach((sliderContainer) => {
    let counter = 0;

    // set controls
    const dotContainer = sliderContainer.querySelector(
      ".slider-controls .slider-dots"
    );
    // console.log("dotContainer", dotContainer);
    if (dotContainer) dotContainer.innerHTML = ``;

    const slides = sliderContainer.querySelectorAll(".treatment-card");
    // console.log("slides", slides);

    if (window.innerWidth > 768) {
      //
      slides.forEach((slide, index) => {
        // set slides
        if (slides.length > 1) {
          slide.style.transform = `translate(${50 + 160 * index}%, -50%)`;
          if (index !== 0) {
            slide.style.opacity = "0%";
          } else if (index === 0) {
            slide.style.opacity = "100%";
          }

          if (dotContainer)
            dotContainer.innerHTML += `<div class="slider-dot"></div>`;

          const dots = dotContainer.querySelectorAll(".slider-dot");
          dots[counter].classList.add("active");
          // console.log("slide", slide);

          /*------------------------------------------------ .treatment-card options FUNCTION -------------------------------------------------------*/
          let currOption = 0;
          const options = slide.querySelectorAll(
            ".treatment-card.optional .treatment-options span"
          );
          // console.log("options", options);

          if (options) {
            options.forEach((option, index) => {
              // optionalDotsContainer.innerHTML += `<div class="slider-dot"></div>`;

              if (index === currOption) {
                option.style.display = "inline-block";
              } else if (index !== currOption) {
                option.style.display = "none";
              }
            });
          }

          const optionsPrices = document.querySelectorAll(
            ".treatment-card.optional .treatment-price"
          );
          // console.log("optionsPrices", optionsPrices);
          if (optionsPrices) {
            optionsPrices.forEach((optionsPrice) => {
              optionsPrice.querySelectorAll("span").forEach((span, index) => {
                if (index === currOption) {
                  span.style.display = "inline-block";
                } else if (index !== currOption) {
                  span.style.display = "none";
                }
              });
            });
          }

          const optionalControls = document.querySelectorAll(
            ".options-controls .slider-btn"
          );
          // console.log("optionalControls", optionalControls);
          if (optionalControls) {
            optionalControls.forEach((control) => {
              let currOption = 0;
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
                    // console.log(currOption);
                  } else if (currOption !== treatmentCardOptions.length - 1) {
                    currOption++;
                    // console.log(currOption);
                  }
                } else if (event.target.name === arrowLeft) {
                  if (currOption === 0) {
                    currOption = treatmentCardOptions.length - 1;
                    // console.log(currOption);
                  } else if (currOption !== 0) {
                    currOption--;
                    // console.log(currOption);
                  }
                }

                const optionsDots = slide.querySelectorAll(".slider-dot");

                optionsDots.forEach((dot, index) => {
                  if (dot.classList.contains("active")) {
                    dot.classList.remove("active");
                  }
                  if (index === currOption) {
                    dot.classList.add("active");
                  }
                });

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
      });
    } else {
      slides.forEach((slide, index) => {
        /*------------------------------------------------ .treatment-card options FUNCTION -------------------------------------------------------*/
        let currOption = 0;
        const options = slide.querySelectorAll(
          ".treatment-card.optional .treatment-options span"
        );
        // console.log("options", options);

        if (options) {
          options.forEach((option, index) => {
            // optionalDotsContainer.innerHTML += `<div class="slider-dot"></div>`;

            if (index === currOption) {
              option.style.display = "inline-block";
            } else if (index !== currOption) {
              option.style.display = "none";
            }
          });
        }

        const optionsPrices = document.querySelectorAll(
          ".treatment-card.optional .treatment-price"
        );
        // console.log("optionsPrices", optionsPrices);
        if (optionsPrices) {
          optionsPrices.forEach((optionsPrice) => {
            optionsPrice.querySelectorAll("span").forEach((span, index) => {
              if (index === currOption) {
                span.style.display = "inline-block";
              } else if (index !== currOption) {
                span.style.display = "none";
              }
            });
          });
        }

        const optionalControls = document.querySelectorAll(
          ".options-controls .slider-btn"
        );
        // console.log("optionalControls", optionalControls);
        if (optionalControls) {
          optionalControls.forEach((control) => {
            let currOption = 0;
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
                  // console.log(currOption);
                } else if (currOption !== treatmentCardOptions.length - 1) {
                  currOption++;
                  // console.log(currOption);
                }
              } else if (event.target.name === arrowLeft) {
                if (currOption === 0) {
                  currOption = treatmentCardOptions.length - 1;
                  // console.log(currOption);
                } else if (currOption !== 0) {
                  currOption--;
                  // console.log(currOption);
                }
              }

              const optionsDots = slide.querySelectorAll(".slider-dot");

              optionsDots.forEach((dot, index) => {
                if (dot.classList.contains("active")) {
                  dot.classList.remove("active");
                }
                if (index === currOption) {
                  dot.classList.add("active");
                }
              });

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
      });
    }
  });
}
//
// setSlides();

/* ---------------------------------------- setHeight function ----------------------------------------
- sets height fgor slider-container
- container has position: absolute property (container does not adjust height accordingly)
*/
//
//
//
function setHeightAndPadding(service) {
  const treatmentSlider = document.querySelectorAll(".treatment-slider");
  //
  treatmentSlider.forEach((slider, index) => {
    //
    let cardHeight = slider.children[0].getBoundingClientRect().height;
    let headerHeight =
      slider.children[0].children[0].getBoundingClientRect().height;
    slider.style.height = `${cardHeight + headerHeight + 100}px`;
    //
    if (checkBrowser()) {
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

/* ---------------------------------------- DEFAULT SLIDER STYLINGS ---------------------------------------- */
function checkBrowser() {
  let userAgent = navigator.userAgent;
  let browserName;

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
}

/*------------------------------------------------ .sec-nav FUNCTION -------------------------------------------------------*/
const secNavItems = document.querySelectorAll(".sec-nav--item");
const services = document.querySelectorAll(".wrapper");
const mainFooter = document.querySelector(".main-footer");

secNavItems.forEach((navItem, index) => {
  navItem.addEventListener("click", function (event) {
    //
    const { target } = event;
    // console.log("target", target);

    const secNavInnerText = target
      .closest(".sec-nav--link")
      .innerText.toLowerCase();
    console.log("secNavInnerText", secNavInnerText);

    if (secNavInnerText !== "Zusatzprogramme".toLowerCase()) {
      setTimeout(() => setSlides(), 200);
    }

    if (!mainFooter.classList.contains("background-bottom")) {
      mainFooter.classList.add("background-bottom");
    }
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
        if (
          window.innerWidth > 768 &&
          secNavInnerText !== "Zusatzprogramme".toLowerCase()
        ) {
          setHeightAndPadding(service);
        }
      }
    });
  });
});

sliderContainers.forEach((sliderComponent) => {
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

// =======================================================================================================================================================
// =======================================================================================================================================================
// =======================================================================================================================================================
// =======================================================================================================================================================
// =======================================================================================================================================================
