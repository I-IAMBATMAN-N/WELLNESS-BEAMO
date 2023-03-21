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
