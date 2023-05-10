"use strict";

const mainHeader = document.querySelector(".main-header");

/*---------------------------------------- Header Start Animation ----------------------------------------*/
setTimeout(() => {
  mainHeader.classList.remove("intro");
}, 2000);

const menuIcons = document.querySelectorAll(".mobile-menu-icon");
const mainNav = document.querySelector(".main-nav");

/*---------------------------------------- Hamburger Menu Function ----------------------------------------*/

const navLinks = document.querySelectorAll(".nav-item");

if (window.innerWidth < 768) {
  menuIcons.forEach((icon) =>
    icon.addEventListener("click", function () {
      menuIcons.forEach((icon) => {
        icon.classList.toggle("active");
      });
      mainNav.classList.toggle("active");
    })
  );
  navLinks.forEach((navLink) => {
    navLink.addEventListener("click", function () {
      menuIcons.forEach((icon) => {
        icon.classList.toggle("active");
      });
      mainNav.classList.toggle("active");
    });
  });
}

/*---------------------------------------- Certificate Images Function ----------------------------------------*/
const certImgs = document.querySelectorAll(".certificate-img");

certImgs.forEach((img) => {
  img.classList.add("scale");
  img.addEventListener("click", function (event) {
    mainHeader.style.transition = ".3s ease";
    mainHeader.style.opacity = "0%";
    if (this.classList.contains("view")) {
      this.classList.remove("view");
      mainHeader.style.opacity = "100%";
    } else {
      this.classList.add("view");
      this.classList.remove("scale");
    }
  });
});
/*---------------------------------------- Hidden Class Function ---------------------------------------- 
- Add hidden class for each section (will be removed in future)
*/
const sections = document.querySelectorAll(".section");

sections.forEach((section, index) => {
  if (window.innerWidth > 768) {
    if (!section.classList.contains("section"))
      // index > 0 ? section.classList.add("hidden") : "";
      section.classList.add("hidden");
  }
});

/*---------------------------------------- Hidden Class Function ---------------------------------------- 
- remove hidden class on scroll
*/
const obsOptions = {
  root: null,
  threshold: 0.4,
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
let time = 0;
if (document.title !== "Schönheits- und Wellnessmassagen | BEAMO") {
  time = 2000;
} else {
  time = 3000;
}

function obsCallback(entries, observer) {
  entries.forEach((entry) => {
    if (window.innerWidth > 768) {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.remove("hidden");
        }, time);
        time = 0;
      }
    }
  });
}
sections.forEach((section) => {
  observer.observe(section);
});
