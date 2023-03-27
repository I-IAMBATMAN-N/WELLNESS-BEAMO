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
  index > 0 ? section.classList.add("hidden") : "";
});

//On scroll animated display of sections
const obsOptions = {
  root: null,
  threshold: 0.4,
};

const observer = new IntersectionObserver(obsCallback, obsOptions);

let time = 3000;

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
