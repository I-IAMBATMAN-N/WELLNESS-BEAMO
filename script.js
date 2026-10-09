"use strict";
// ======================================================================
// .remove intro class from header on load
// ======================================================================
const mainHeader = document.querySelector(".main-header");
document.addEventListener("load", () => setTimeout(() => mainHeader.classList.remove("intro"), 1000));

// ======================================================================
// .hamburger menu function
// ======================================================================
const mainNav = document.querySelector(".main-nav");

const navList = document.querySelector(".nav-list");
const navLinks = document.querySelectorAll(".nav-link");

const mobileBtnContainer = document.querySelector(".menu-btn-container");
const menuBtns = mobileBtnContainer.querySelectorAll(".mobile-menu-btn");


if (window.innerWidth < 768) {
  mobileBtnContainer.addEventListener("click", function(e) {
    const mobileBtn = e.target.closest(".mobile-menu-btn");
    if(!mobileBtn) return;

    menuBtns.forEach(item => item.classList.toggle("hidden"));
    mainNav.classList.toggle("active");
  });
  navList.addEventListener("click", function(e){
    const navLink = e.target.closest(".nav-link");
    if(!navLink) return;

    const isLinkTextContact = navLink.innerText.toLowerCase() === "kontakt";
    if(!isLinkTextContact) return;

    menuBtns.forEach(btn => btn.classList.toggle("hidden"));
    mainNav.classList.toggle("active");
  });
}
