"use strict";

// listeners
function sliderControlsListener(e) {
  function slideIndex() {
    const sliderContainer = slideControls.closest(".treatment-slider");

    function getIndex(){
      return sliderContainer.dataset.currentSlide * 1;
    }
    function setIndex(index){
      sliderContainer.dataset.currentSlide = index;
    }
    return { getIndex, setIndex };
  }

  const slideControls = e.target.closest(".slider-controls");
  if(!slideControls) return;

  const sliderContainer = slideControls.closest(".treatment-slider");
  const currSlides = sliderContainer.querySelectorAll(".treatment-card");
  const currDots = sliderContainer.querySelectorAll(".slider-controls .slider-dots .slider-dot");

  const lastIndex = currSlides.length - 1;

  const clickedNext = e.target.closest('.slider-btn.next');
  const clickedPrev = e.target.closest('.slider-btn.previous');
  const clickedDot = e.target.closest(".slider-dot");

  const { getIndex, setIndex } = slideIndex();
  console.log("getIndex() before", getIndex())

  // set new currSlide index
  if (clickedDot) setIndex(Number(clickedDot.dataset.index));

  if (clickedNext) setIndex(getIndex() === lastIndex ? 0 : getIndex() + 1);
  if (clickedPrev) setIndex(getIndex() === 0 ? lastIndex : getIndex() - 1);

  console.log("getIndex() after", getIndex());


  // shift all slides acc. to newly set currSlide
  currSlides.forEach((slide, index) => {
    slide.style.transform = `translate(${50 + 160 * (index - getIndex())}%, -50%)`;
    slide.style.visibility = index === getIndex() ? "visible" : "hidden";
  })
  currDots.forEach((dot, index) => {
    // reset active status for all dots
    dot.classList.remove("active");

    // set active class to current active dot
    if(index === getIndex()) dot.classList.add("active");
  });
}
function optionsControlsListener(e){
  function currentOption(slide) {
    function getCurrOption(){
      return slide.dataset.currentOption * 1;
    }
    function setCurrOption(index) {
      slide.dataset.currentOption = index;
    }

    return { getCurrOption, setCurrOption }
  }
  const { target } = e;

  const optionsSlideControls = target.closest(".options-controls");
  if(!optionsSlideControls) return;
  //
  const slide = target.closest(".treatment-card");
  const treatmentOptions = slide.querySelectorAll(".treatment-options .option");
  const optionPrices = slide.querySelectorAll(".treatment-price .amount");
  const optionsDots = slide.querySelectorAll(".options-controls .slider-dot");
  const optionsTimes = slide.querySelectorAll(".treatment-time .duration");

  const lastIndex = treatmentOptions.length - 1;

  const leftArrowClicked = target.closest(".slider-btn.previous");
  const rightArrowClicked = target.closest(".slider-btn.next");

  // const currOptionIndex = slide.dataset.currentOption * 1;

  const { getCurrOption, setCurrOption } = currentOption(slide);

  // currOptionIndex change
  if (leftArrowClicked) setCurrOption(getCurrOption() === 0 ? lastIndex : getCurrOption() - 1);
  if (rightArrowClicked) setCurrOption(getCurrOption() === lastIndex ? 0 : getCurrOption() + 1);

  // change options data after currOptionIndex change
  for(let i = 0; i <= lastIndex; i++) {
    treatmentOptions[i].style.display = i === getCurrOption() ? "inline-block" : "none";
    optionsTimes[i].style.display = i === getCurrOption() ? "inline-block" : "none";
    optionPrices[i].style.display = i === getCurrOption() ? "inline-block" : "none";

    optionsDots[i].classList.remove("active");

    if (i === getCurrOption()) optionsDots[i].classList.add("active");
  }
}

// style functions
function setSlides() {
  const sliderContainers = document.querySelectorAll(".wrapper.active .treatment-slider");

  sliderContainers.forEach((sliderContainer) => {
    function setSlideStyles(slide, index) {
      // set initial slide styles
      slide.style.transform = `translate(${50 + 160 * index}%, -50%)`;
      slide.style.visibility = `${index === 0 ? "visible" :"hidden"}`
    }
    function fillDotContainer(dotContainer, index){
      if(index === 0) dotContainer.innerHTML = "";
      dotContainer.innerHTML += `<button type="button" data-index="${index}" aria-label="Behandlung Nummer ${index + 1} "class="slider-dot ${index === 0 ? "active" : ""}">`;
    }
    function setOptionalData(slide) {
      const treatmentOptions = slide.querySelectorAll(".treatment-options .option");
      const optionPrices = slide.querySelectorAll(".treatment-price .amount");
      const optionsTimes = slide.querySelectorAll(".treatment-time .duration");

      const optionsDots = slide.querySelectorAll(".options-controls .slider-dot");

      for(let i = 0; i < treatmentOptions.length; i++) {
        treatmentOptions[i].style.display = i === 0 ? "inline-block" : "none";
        optionsTimes[i].style.display = i === 0 ? "inline-block" : "none";
        optionPrices[i].style.display = i === 0 ? "inline-block" : "none";

        optionsDots[i].classList.remove("active");
      }
      optionsDots[0].classList.add("active");
    }

    // set for each relevant slider container
    // - used for slider navigation 
    sliderContainer.setAttribute("data-current-slide", 0);
    
    const slides = sliderContainer.querySelectorAll(".treatment-card");
    const dotContainer = sliderContainer.querySelector(".slider-controls .slider-dots");

    slides.forEach((slide, index) => {
      // set additional options of a slide(treatment-card) if there are any
      // - relevant for mobbile and desktop layout
      const hasOptions = slide.classList.contains("optional");
      if(hasOptions) setOptionalData(slide, index);

      if (window.innerWidth <= 768) return;
      setSlideStyles(slide, index);

      if(!dotContainer) return;
      // fill dot container if there is any!
      fillDotContainer(dotContainer, index);
    });

    // add background bottom to main footer
    // - .add silently fails when footer already has class set
    document.querySelector(".main-footer").classList.add("background-bottom");
  });
}
function setHeightAndPadding(service) {
  function checkBrowser() {
    if (/firefox|fxios/i.test(navigator.userAgent)) return true;
    if (/edg(e|a|ios)?\//i.test(navigator.userAgent)) return false;
    if (/opr\/|opera/i.test(navigator.userAgent)) return false;
    if (/chrome|chromium|crios/i.test(navigator.userAgent)) return false;
    if (/safari/i.test(navigator.userAgent)) return false;
  }
  
  const treatmentSliders = document.querySelectorAll(".treatment-slider");
  treatmentSliders.forEach(slider => {
    const slide = slider.querySelector(".treatment-card");
    const heading = slide.querySelector(".treatment-heading");

    let slideHeight = slide.getBoundingClientRect().height;
    let headingHeight = heading.getBoundingClientRect().height;

    // set slider initial height based on inner content
    slider.style.height = `${slideHeight + headingHeight + 100}px`;

    if (!checkBrowser()) return;

    // set larger right padding for firefox browser
    const treatmentPrices = service.querySelectorAll(".treatment-price");
    treatmentPrices.forEach((price) => price.style.paddingRight = "4rem");
  });
}

// ======================================================================
// .sec-nav listener
// - dynamically displays relevant content and attaches event listener
// ======================================================================
const secNavList = document.querySelector(".sec-nav--list");
secNavList.addEventListener("click", function(e) {
  const navLink = e.target.closest(".sec-nav--link");
  if(!navLink) return;

  const servicesWrappers = document.querySelectorAll(".wrapper");
  const activeWrapper = servicesWrappers[Number(navLink.dataset.id)];
  const hasOptionalSlides = activeWrapper.querySelectorAll(".optional");


  servicesWrappers.forEach((wrapper) => wrapper.classList.remove("active"));
  activeWrapper.classList.add("active");

  servicesWrappers.forEach((wrapper) => wrapper.removeEventListener("click", optionsControlsListener));
  // slide options controls listener
  if(hasOptionalSlides) activeWrapper.addEventListener("click", optionsControlsListener);
  
  // set height and padding for active wrapper elements
  if (window.innerWidth <= 768) return;
  setHeightAndPadding(document.querySelector(".wrapper.active"));
  setSlides();

  // remove all possible listeners from wrappers
  servicesWrappers.forEach((wrapper) => {
    wrapper.removeEventListener("click", sliderControlsListener);
  });
  // add listeners to active wrapper
  // slider controls listener
  activeWrapper.addEventListener("click", sliderControlsListener);


})
