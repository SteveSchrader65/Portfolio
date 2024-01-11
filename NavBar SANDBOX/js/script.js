/* jshint esversion: 6 */

let viewingMode = "";
const root = document.querySelector(":root");
const lightButton = document.querySelector(".lightMode");
const darkButton = document.querySelector(".darkMode");

function setViewingMode() {
  "use strict";

  viewingMode = localStorage.getItem("viewingMode");

  if (!viewingMode) viewingMode = "lightness";

  if (viewingMode == "lightness") {
    _setLightMode();
  } else if (viewingMode == "darkness") {
    _setDarkMode();
  }

  lightButton.addEventListener("click", _setLightMode);
  darkButton.addEventListener("click", _setDarkMode);

  function _setLightMode() {
    viewingMode = "lightness";
    localStorage.setItem("viewingMode", viewingMode);
    lightButton.style.visibility = "hidden";
    darkButton.style.visibility = "visible";
    root.style.setProperty("--titleColour", "#cccc00");
    root.style.setProperty("--navBarColour", "#cccccc");
    root.style.setProperty("--navTextColour", "black");
    root.style.setProperty("--navHoverColour", "#82827d");
    root.style.setProperty("--textColour", "#210000");
    root.style.setProperty("--backColour", "#f2f2f2");
    root.style.setProperty("--highlightColour1", "#3399ff");
    root.style.setProperty("--highlightColour2", "#0059b3");
    root.style.setProperty("--postItColour", "#fffcaa");
    root.style.setProperty("--sidebarTextColour", "#0000cc");
    root.style.setProperty("--sidebarBackgroundColour", "#e8e8e8");
    root.style.setProperty("--sidebarBorderColour", "#33cc33");
    root.style.setProperty("--colour1", "#000000");
    root.style.setProperty("--colour2", "#ffffff");
    root.style.setProperty("--scrollTrackColour", "#b4b2b1");
    root.style.setProperty("--scrollThumbColour1", "#1d6dc9");
    root.style.setProperty("--scrollThumbColour2", "#6c9ee0");
    root.style.setProperty("--scrollButtonColour1", "#6c9ee0");
    root.style.setProperty("--scrollButtonColour2", "#8fbcef");
    root.style.setProperty("--scrollBorderColour", "#b7b6fc");
    root.style.setProperty("--progressColour", "#008000");
    root.style.setProperty("--tipBorderColour", "#6c9ee0");
    root.style.setProperty("--tipBackgroundColour", "#b4b2b1");
    root.style.setProperty("--tipTextColour", "#1d6dc9");
    root.style.setProperty("--tipShadow", "-2px -2px 3px #210000;");
    root.style.setProperty("--alertColour", "#ff1a1a");
    root.style.setProperty("--successColour", "#69cf9d");
    root.style.setProperty("--borderImage", "url('../images/border-light.png')");
  }

  function _setDarkMode() {
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
    root.style.setProperty("--highlightColour1", "#b3d9ff");
    root.style.setProperty("--highlightColour2", "#3399ff");
    root.style.setProperty("--postItColour", "#fffcaa");
    root.style.setProperty("--sidebarTextColour", "black");
    root.style.setProperty("--sidebarBackgroundColour", "#b4b2b1");
    root.style.setProperty("--sidebarBorderColour", "#0e0cf3");
    root.style.setProperty("--colour1", "black");
    root.style.setProperty("--colour2", "white");
    root.style.setProperty("--scrollTrackColour", "#757270");
    root.style.setProperty("--scrollThumbColour1", "#0a2647");
    root.style.setProperty("--scrollThumbColour2", "#205295");
    root.style.setProperty("--scrollButtonColour1", "#1961b3");
    root.style.setProperty("--scrollButtonColour2", "#4282d7");
    root.style.setProperty("--scrollBorderColour", "#0e0cf3");
    root.style.setProperty("--progressColour", "#99ff99");
    root.style.setProperty("--tipBorderColour", "#6c9ee0");
    root.style.setProperty("--tipBackgroundColour", "#b4b2b1");
    root.style.setProperty("--tipTextColour", "#1d6dc9");
    root.style.setProperty("--tipShadow", "-2px -2px 3px #210000;");
    root.style.setProperty("--alertColour", "#b30000");
    root.style.setProperty("--successColour", "#29a329");
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

function navSetup() {
  "use strict";

  // const mainMenu = document.querySelector("#mainNav");
  // const hamburgerMenu = document.querySelector("#hamburgerNav");

  // document.querySelector("#hamburgerButton").addEventListener("mouseover", function () {
  //   document.querySelector("nav").style.display = "block";
  // });

  // document.querySelector("#hamburgerButton").addEventListener("mouseout", function () {
  //   document.querySelector("nav").style.display = "none";
  // });


  // Get screen-size (use eventListener to detect change)
  // window.addEventListener("resize", (event) => {
    // console.log(event);
  // });
  // OR new ResizeObserver

  // Add menu Event listeners
  // Activate 'display: block(??)' for required components
}


function navbarHide() {
  "use strict";

  let prevScrollPos = window.scrollY;

  document.addEventListener("scroll", () => {
    let currentScrollPos = window.scrollY;

    if (prevScrollPos > currentScrollPos) {
      document.querySelector("#mainNav").style.top = "0";
      document.querySelector("#hamburgerNav").style.top = "0";
    } else {
      document.querySelector("#mainNav").style.top = "-58px";
      document.querySelector("#hamburgerNav").style.top = "-58px";
    }

    prevScrollPos = currentScrollPos;
  });
}

function smoothScroll() {
  "use strict";

  document.querySelectorAll('a[href^="#"]').forEach((section) => {
    section.addEventListener("click", function (e) {
      e.preventDefault();

      let selection;

      try {
        selection = document.querySelector(e.target.getAttribute("href"));
        selection.scrollIntoView({ behavior: "smooth" });
      } catch (error) {
        throw new Error("Sumink went rong: " + error);
      }
    });
  });
}

function init() {
	'use strict';

  setViewingMode();
  scrollToTop();
  // navSetup();
  navbarHide();
  smoothScroll();
}

window.onload = init;