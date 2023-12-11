/* jshint esversion: 6 */

let viewingMode = "";
const root = document.querySelector(":root");
const lightButton = document.querySelector("#lightMode");
const darkButton = document.querySelector("#darkMode");

function setViewingMode() {
  "use strict";

  viewingMode = localStorage.getItem("viewingMode");

  if (!viewingMode) viewingMode = "lightness";

  if (viewingMode == "lightness") {
    setLightMode();
  } else if (viewingMode == "darkness") {
    setDarkMode();
  }

  lightButton.addEventListener("click", _setLightMode);
  darkButton.addEventListener("click", _setDarkMode);

  function _setLightMode() {
    "use strict";

    viewingMode = "lightness";
    localStorage.setItem("viewingMode", viewingMode);
    lightButton.style.visibility = "hidden";
    darkButton.style.visibility = "visible";
    root.style.setProperty("--titleColour", "#cccc00");
    root.style.setProperty("--navBarColour", "#cccccc");
    root.style.setProperty("--navTextColour", "black");
    root.style.setProperty("--navHoverColour", "#e6e6e5");
    root.style.setProperty("--textColour", "#210000");
    root.style.setProperty("--backColour", "#cccccc");
    root.style.setProperty("--postItColour", "#fffcaa");
    root.style.setProperty("--sidebarTextColour", "#0000cc");
    root.style.setProperty("--sidebarBackgroundColour", "#e8e8e8");
    root.style.setProperty("--sidebarBorderColour", "#33cc33");
    root.style.setProperty("--colour1", "#000000");
    root.style.setProperty("--colour2", "#ffffff");
    root.style.setProperty("--borderImage", "url('../images/border-light.png')");
  }

  function _setDarkMode() {
    "use strict";

    viewingMode = "darkness";
    localStorage.setItem("viewingMode", viewingMode);
    lightButton.style.visibility = "visible";
    darkButton.style.visibility = "hidden";
    root.style.setProperty("--titleColour", "#0e0cf3");
    root.style.setProperty("--navBarColour", "#210000");
    root.style.setProperty("--navTextColour", "#cccc00");
    root.style.setProperty("--navHoverColour", "#82807d");
    root.style.setProperty("--textColour", "#cccccc");
    root.style.setProperty("--backColour", "#210000");
    root.style.setProperty("--postItColour", "#fffcaa");
    root.style.setProperty("--sidebarTextColour", "black");
    root.style.setProperty("--sidebarBackgroundColour", "#8f8c8a");
    root.style.setProperty("--sidebarBorderColour", "#0e0cf3");
    root.style.setProperty("--colour1", "#000000");
    root.style.setProperty("--colour2", "#ffffff");
    root.style.setProperty("--borderImage", "url('../images/border-dark.png')");
  }
}

function scrollToTop() {
  "use strict";

  let element = document.documentElement;

  if ("scrollBehavior" in element.style) {
    element.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  } else {
    element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  document.querySelector("nav").style.top = "0";
}

function navbarHide() {
  "use strict";

  let prevScrollPos = window.scrollY;

  document.addEventListener("scroll", () => {
    let currentScrollPos = window.scrollY;

    if (prevScrollPos > currentScrollPos) {
      document.querySelector("nav").style.top = "0";
    } else {
      document.querySelector("nav").style.top = "-55px";
    }

    prevScrollPos = currentScrollPos;

    document.querySelector("#viewingMode");
  });
}

function smoothScroll() {
  "use strict";

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      let selection = document.querySelector(this.getAttribute("href"));

      selection.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function block1SetUp() {
  "use strict";

  const letters = document.querySelectorAll(".animateMe");
  const darkArray = ["red", "orange", "greenyellow", "limegreen", "#3399ff", "#e600e6"];
  const lightArray = ["#e60000", "#e69500", "#ffff00", "#00cc00", "#0000ff", "#990099"];
  let colourArray;
  let colourIndex;

  setInterval(() => {
    letters.forEach((letter) => {
      if (viewingMode == "lightness") {
        colourArray = lightArray;
      } else {
        colourArray = darkArray;
      }

      colourIndex = Math.floor(Math.random() * colourArray.length);
      letter.style.color = colourArray[colourIndex];
    });
  }, 250);
}

function block2SetUp() {
  ("use strict");

  const cards = document.querySelectorAll(".course-card");
  const outro = document.querySelector("#outro");
  const output = document.querySelector("#output");

  cards.forEach((card) => {
    card.addEventListener("mouseover", function () {
      const cardID = this.getAttribute("data");
      const courseInfo = document.querySelector(cardID);

      card.classList.add("course-card-animate");
      setTimeout(() => {
        card.classList.add("course-card-flip");
        output.innerHTML = courseInfo.textContent + "<p>" + outro.textContent + "</p>";
      }, 1000);
    });

    card.addEventListener("mouseout", function () {
      card.classList.remove("course-card-animate");
      setTimeout(() => {
        card.classList.remove("course-card-flip");
      }, 1000);
    });
  });
}

let prevEvent = null;
let prevYr = null;
let prevInfo = null;
let clicked = false;
function block3SetUp() {
  "use strict";

  // Horizontal timeline with dot markers. On hover, a pop-up/slide-in text appears to describe role
  // Link to download resume PDF
  // Skill-set section

  const sections = document.querySelectorAll(".section");
  const timeline = document.querySelector(".timeline");
  const line = document.querySelector(".line");
  const slideInStart = window.innerWidth * 0.8;
  let prevScrollX = window.scrollX;
}

// Use this selector (.content li > *) to have sidebar scroll properly with rest of content.

function block4SetUp() {
  "use strict";

  const sidebar = document.querySelector(".sidebar");
  const closeButton = document.querySelector(".sidebar .close");

  document.querySelectorAll(".projectList li").forEach((item) => {
    item.addEventListener("click", function () {
      const sidebarID = this.getAttribute("data");
      const correspondingSidebar = document.querySelector(sidebarID);

      document.querySelectorAll("aside").forEach((aside) => {
        aside.style.display = "none";
        // Call animation to close any open sidebar
      });

      correspondingSidebar.style.display = "inline-block";
      sidebar.style.right = "-2.5%";
      correspondingSidebar.style.top = "0";
      correspondingSidebar.style.left = "0";
    });
  });

  closeButton.addEventListener("click", function () {
    sidebar.style.right = "-57.5%";
  });
}

function block5SetUp() {
  "use strict";

  // Create input form to send e-mail to my address
  // Will require 'AreYouHuman ??' pop-up to allow input
}

function footerDate() {
  "use strict";

  const currentYear = new Date().getFullYear();

  document.querySelector("footer h3").innerHTML = "&copySteve Schrader " + currentYear;
}

function init() {
  "use strict";

  setViewingMode();
  scrollToTop();
  navbarHide();
  smoothScroll();
  block1SetUp();
  block2SetUp();
  block3SetUp();
  block4SetUp();
  // block5SetUp();
  footerDate();

  // ADD RESPONSIVENESS
}

// Event listener for the onload event will call the init() function when
// loading of the Document Object Model (DOM) has been completed
window.onload = init;
