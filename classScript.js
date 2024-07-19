"use strict";

const mainHeader = document.querySelector(".main-header");

const menuIcons = document.querySelectorAll(".mobile-menu-icon");
const mainNav = document.querySelector(".main-nav");

const navLinks = document.querySelectorAll(".nav-item");

const sections = document.querySelectorAll(".section");

class App {
  constructor() {
    this.mainHeader = document.querySelector(".main-header");

    this.menuIcons = document.querySelectorAll(".mobile-menu-icon");
    // console.log("this.menuIcons", this.menuIcons);

    this.mainNav = document.querySelector(".main-nav");

    this.navLinks = document.querySelectorAll(".nav-item");

    this.sections = document.querySelectorAll(".section");
  }

  removeHeaderWithDelay() {
    setTimeout(() => {
      this.mainHeader.classList.remove("intro");
    }, 2000);
  }
  hamburgerMenuListener() {
    const menuIcons = this.menuIcons;
    // console.log("derived menuIcons", menuIcons);

    const mainNav = this.mainNav;
    // console.log("derived mainNav", mainNav);

    if (window.innerWidth < 768) {
      menuIcons.forEach((icon) =>
        icon.addEventListener("click", function () {
          menuIcons.forEach((icon) => {
            icon.classList.toggle("active");
          });
          mainNav.classList.toggle("active");
        })
      );
      this.navLinks.forEach((navLink) => {
        navLink.addEventListener("click", function () {
          menuIcons.forEach((icon) => {
            icon.classList.toggle("active");
          });
          mainNav.classList.toggle("active");
        });
      });
    }
  }

  addHiddenClass() {
    this.sections.forEach((section, index) => {
      if (window.innerWidth > 768) {
        if (!section.classList.contains("section"))
          // index > 0 ? section.classList.add("hidden") : "";
          section.classList.add("hidden");
      }
    });
  }
}
//
class Observer {
  constructor() {
    this.options = {
      root: null,
      threshold: 0.4,
    };
    this.sections = document.querySelectorAll(".section");

    this.time = 0;
    this.setTime();
    // console.log("this.time", this.time);
  }
  setTime() {
    if (document.title !== "Schönheits- und Wellnessmassagen | BEAMO") {
      this.time = 2000;
    } else {
      this.time = 3000;
    }
  }
  callback(entries, observer) {
    entries.forEach((entry) => {
      if (window.innerWidth > 768) {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.remove("hidden");
          }, this.time);
          this.time = 0;
        }
      }
    });
  }
  getObserver() {
    return new IntersectionObserver(this.callback, this.options);
  }
  mountObserver() {
    const observer = this.getObserver();

    this.sections.forEach((section) => {
      observer.observe(section);
    });
  }
}
const observer = new Observer();
observer.mountObserver();

const app = new App();

app.removeHeaderWithDelay();
app.hamburgerMenuListener();
app.addHiddenClass();
