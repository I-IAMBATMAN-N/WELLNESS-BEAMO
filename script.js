"use strict";

const menuIcons = document.querySelectorAll(".mobile-menu-icon");
// const navList = document.querySelector(".nav-list");
const mainNav = document.querySelector(".main-nav");

menuIcons.forEach((icon) =>
  icon.addEventListener("click", function (event) {
    menuIcons.forEach((icon) => {
      icon.classList.toggle("active");
    });
    mainNav.classList.toggle("active");
  })
);

/*-------------------------------------------------------------------------------------------------------*/
let currOption = 0;

const optionalControls = document.querySelectorAll(
  ".options-controls .slider-btn"
);

const options = document.querySelectorAll(
  ".treatment-card.optional .treatment-options"
);

const optionsPrices = document.querySelectorAll(
  ".treatment-card.optional .treatment-price"
);

options.forEach((options) => {
  options.querySelectorAll("span").forEach((span, index) => {
    if (index === currOption) {
      span.style.display = "inline-block";
    } else if (index !== currOption) {
      span.style.display = "none";
    }
  });
});

optionsPrices.forEach((optionsPrice) => {
  optionsPrice.querySelectorAll("span").forEach((span, index) => {
    if (index === currOption) {
      span.style.display = "inline-block";
    } else if (index !== currOption) {
      span.style.display = "none";
    }
  });
});

// options.forEach((option, index) => {
//   if (index === currOption) {
//     option.style.display = "inline-block";
//   } else if (index !== currOption) {
//     option.style.display = "none";
//   }
// });

// optionsPrices.forEach((optionPrice, index) => {
//   if (index === currOption) {
//     optionPrice.style.display = "block";
//   } else if (index !== currOption) {
//     optionPrice.style.display = "none";
//   }
// });

optionalControls.forEach((control) => {
  let currOption = 0;
  control.addEventListener("click", function (event) {
    //
    const treatmentCardOptions = event.target
      .closest(".treatment-card")
      .children[1].children[1].querySelectorAll("span");
    const optionPrices = event.target
      .closest(".treatment-card")
      .children[1].children[3].children[1].querySelectorAll("span");
    //
    if (event.target.name === "chevron-forward-outline") {
      if (currOption === treatmentCardOptions.length - 1) {
        currOption = 0;
        console.log(currOption);
      } else if (currOption !== treatmentCardOptions.length - 1) {
        currOption++;
        console.log(currOption);
      }
    } else if (event.target.name === "chevron-back-outline") {
      if (currOption === 0) {
        currOption = treatmentCardOptions.length - 1;
        console.log(currOption);
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

//Start header animation
setTimeout(() => {
  document.querySelector(".main-header").classList.remove("intro");
}, 2000);

//Add hidden class for each section (will be removed in future in order to animate)
const sections = document.querySelectorAll(".section");

sections.forEach((section, index) => {
  if (!section.classList.contains("treatment"))
    index > 0 ? section.classList.add("hidden") : "";
});

//On scroll animated display of sections
const obsOptions = {
  root: null,
  threshold: 0.4,
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
let time = 0;
if (document.title !== "Schönheits- und Wellnessmassagen | BEAMO") {
  time = 1000;
} else {
  time = 3000;
}

function obsCallback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.remove("hidden");
      }, time);
      time = 0;
      // console.log(time);
    }
  });
}
sections.forEach((section) => {
  observer.observe(section);
});

const services = document.querySelectorAll(".wrapper");

// console.log(services);
services.forEach((service) => {
  // service.classList.add("active");
  // service.style.display = "none";
});

const secNavItems = document.querySelectorAll(".sec-nav--item");
const wrappers = document.querySelectorAll(".wrapper");

secNavItems.forEach((navItem, index) => {
  navItem.addEventListener("click", function (event) {
    services.forEach((service, serviceIndex) => {
      if (service.classList.contains("active")) {
        service.classList.remove("active");
      }
      if (serviceIndex === index) {
        // service.style.display = "block";

        service.classList.add("active");
        setTimeout(() => {
          service.classList.add("pad-right");
        }, 2000);

        console.log(service);

        if (window.innerWidth > 768) {
          const treatmentSlider =
            document.querySelectorAll(".treatment-slider");

          console.log("treatment-slider", treatmentSlider.length);
          treatmentSlider.forEach((slider, index) => {
            const treatmentPrices = slider.querySelectorAll(".treatment-price");
            if (checkBrowser() === "firefox") {
              treatmentPrices.forEach((price) => {
                // console.log(index);
                if (index !== 0) {
                  price.style.paddingRight = "3rem";
                } else {
                  price.style.paddingRight = "9rem";
                }
              });
            }
            // treatmentPrice.innerText = text;
            let cardHeight = slider.children[0].getBoundingClientRect().height;
            let headerHeight =
              slider.children[0].children[0].getBoundingClientRect().height;

            slider.style.height = `${cardHeight + headerHeight + 100}px`;
            // console.log("-\n", slider.children[0].getBoundingClientRect().height);
            // console.log(
            //   "-\n",
            //   slider.children[0].children[0].getBoundingClientRect().height
            // );
            // console.log(slider.children);
            // slider.style.backgroundColor = "red";
            // slider.style.height = `${slider.children[1].getBoundingClientRect().height}`;
          });
        }
      }
    });

    // console.log(index);
    // if (event.target.closest(".sec-nav--item")) {
    //   //
    //   secNavItems.forEach((item) => {
    //     if (item.classList.contains("active")) {
    //       item.classList.remove("active");
    //     }
    //   });
    //   console.log(event.target);
    //   event.target.closest(".sec-nav--item").classList.add("active");
    // }
  });
});

// console.log(navigator);

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
  return browserName;
}

console.log(checkBrowser());
// optionsPrices.forEach((price) => {
//   console.log(price);
// });

class Thermostat {
  constructor(f) {
    this._temperature = (5 / 9) * (f - 32);
  }
  get temperature() {
    return this._temperature;
  }
  set temperature(c) {
    this._temperature = c;
  }
}
// Only change code above this line

const thermos = new Thermostat(76); // Setting in Fahrenheit scale
let temp = thermos.temperature;
console.log(temp); // 24.44 in Celsius
thermos.temperature = 26;
temp = thermos.temperature;
console.log(temp); // 26 in Celsius
