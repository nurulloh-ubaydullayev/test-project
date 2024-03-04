const elSlideBtns = document.querySelectorAll(".slides__footer-btn");
const elSlidesList = document.querySelector(".slides__footer-list");
const elPresentationImg = document.querySelector("#slides__presentation-img");
const elsSlides = document.querySelectorAll(".slides__footer-slide");
const elSlidePointer = document.querySelector(".slides__presentation-pointer");
const elSlideNavigation = document.querySelectorAll(
  ".slides__presentation-navigation .navigation-btn"
);
const elCounterManual = document.querySelectorAll(".product__form-size-manual");
const elsBeltWidthRadio = document.querySelectorAll("input[name='belt-width']");
const elFinalCount = document.querySelector(
  ".product__characteristics-final-count"
);
const elPresentationModal = document.querySelector(
  ".slides__presentation-modal"
);
const elPresentationModalOpener = document.querySelector(
  ".slides__presentation-expander"
);

elSlidePointer.textContent = `1/${elsSlides.length}`;

function scrollToSlide(index) {
  const slide = elsSlides[index];
  if (slide) {
    elSlidesList.scrollTo({
      left:
        slide.offsetLeft - elSlidesList.offsetWidth / 2 + slide.offsetWidth / 2,
      behavior: "smooth",
    });
  }
}

function switchToSlide(event) {
  const activeSlideEl = document.querySelector(".slides__footer-slide.active");
  const activeSlideIdx = Number(activeSlideEl.getAttribute("data-idx"));
  if (
    (this.classList.contains("slides__footer-btn-next") ||
      this.classList.contains("slides__presentation-btn-next")) &&
    activeSlideIdx < elsSlides.length - 1
  ) {
    activeSlideEl.classList.remove("active");
    activeSlideEl.nextElementSibling.classList.add("active");
    elPresentationImg.src =
      activeSlideEl.nextElementSibling.querySelector("img").src;
    scrollToSlide(activeSlideIdx + 1);
    elSlidePointer.textContent = `${
      +activeSlideEl.nextElementSibling.getAttribute("data-idx") + 1
    }/${elsSlides.length}`;
  } else if (
    (this.classList.contains("slides__footer-btn-prev") ||
      this.classList.contains("slides__presentation-btn-prev")) &&
    activeSlideIdx > 0
  ) {
    activeSlideEl.classList.remove("active");
    activeSlideEl.previousElementSibling.classList.add("active");
    elPresentationImg.src =
      activeSlideEl.previousElementSibling.querySelector("img").src;
    scrollToSlide(activeSlideIdx - 1);
    elSlidePointer.textContent = `${
      +activeSlideEl.previousElementSibling.getAttribute("data-idx") + 1
    }/${elsSlides.length}`;
  }
}

elSlideBtns.forEach((nodeEl) => {
  nodeEl.addEventListener("click", switchToSlide);
});
elSlideNavigation.forEach((nodeEl) => {
  nodeEl.addEventListener("click", switchToSlide);
});

elSlidesList.addEventListener("click", (event) => {
  const parentLi = event.target.closest(".slides__footer-slide");
  if (parentLi) {
    const selectedElIdx = parentLi.getAttribute("data-idx");
    elsSlides.forEach((el) => {
      el.classList.remove("active");
    });
    parentLi.classList.add("active");
    scrollToSlide(+selectedElIdx);
  }
});

elCounterManual.forEach((field) => {
  field.addEventListener("click", handleCounterField);
});

elsBeltWidthRadio.forEach((radioEl) => {
  radioEl.addEventListener("change", handleRadioCustomClick);
});

elFinalCount.addEventListener("click", handleFinalCountChange);

elPresentationModalOpener.addEventListener("click", handleModalToggler);
elPresentationModal.addEventListener("click", handleModalToggler);

function handleCounterField(event) {
  const clickedBtn = event.target.closest(".navigation-btn");
  if (clickedBtn) {
    if (clickedBtn.classList.contains("navigation-btn-next")) {
      const inputEl = clickedBtn.previousElementSibling;
      const inputElVal = parseInt(inputEl.value);
      inputEl.value = `${inputElVal + 1}”`;
    } else if (clickedBtn.classList.contains("navigation-btn-prev")) {
      const inputEl = clickedBtn.nextElementSibling;
      const inputElVal = parseInt(inputEl.value);
      if (inputElVal > 1) {
        inputEl.value = `${inputElVal - 1}”`;
      }
    }
  }
}

function handleRadioCustomClick(event) {
  if (this.value === "custom") {
    document.querySelector(".product__form-size-width").style.display = "flex";
  } else {
    document.querySelector(".product__form-size-width").style.display = "none";
  }
}

function handleFinalCountChange(event) {
  const clickElBtn = event.target.closest("button");
  if (clickElBtn) {
    const clickAction = clickElBtn.getAttribute("data-action");
    const inputEl = this.querySelector("input");
    if (clickAction === "plus") {
      inputEl.value = Number(inputEl.value) + 1;
      this.querySelector("button[data-action='minus']").disabled = false;
    } else {
      inputEl.value -= 1;
      if (+inputEl.value === 1) {
        this.querySelector("button[data-action='minus']").disabled = true;
      }
    }
  }
}

function handleModalToggler(event) {
  if (this.classList.contains("slides__presentation-expander")) {
    elPresentationModal.classList.toggle("active");
  } else if (
    this.classList.contains("slides__presentation-modal") &&
    event.target.tagName === "DIV"
  ) {
    elPresentationModal.classList.toggle("active");
  }
}
