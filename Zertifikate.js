"use strict";

window.addEventListener("load", () => {
  const certImgs = document.querySelectorAll(".certificate-img");

  if (window.innerWidth > 768) {
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
  }
});
