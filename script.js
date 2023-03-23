"use strict";

const menuIcons = document.querySelectorAll(".mobile-menu-icon");
const navList = document.querySelector(".nav-list");

menuIcons.forEach((icon) =>
  icon.addEventListener("click", function (event) {
    menuIcons.forEach((icon) => {
      icon.classList.toggle("active");
    });
    navList.classList.toggle("active");
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
    const optioncardOptions = event.target
      .closest(".treatment-card")
      .children[1].children[1].querySelectorAll("span");
    const optionPrices = event.target
      .closest(".treatment-card")
      .children[1].children[3].children[1].querySelectorAll("span");
    //
    if (event.target.name === "chevron-forward-outline") {
      if (currOption === options.length) {
        currOption = 0;
      } else if (currOption !== options.length) {
        currOption++;
      }
    } else if (event.target.name === "chevron-back-outline") {
      if (currOption === 0) {
        currOption = options.length - 1;
      } else if (currOption !== 0) {
        currOption--;
      }
    }

    optioncardOptions.forEach((option, index) => {
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
