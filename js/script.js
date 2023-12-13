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
    _setLightMode();
  } else if (viewingMode == "darkness") {
    _setDarkMode();
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
    root.style.setProperty("--scrollTrackColour", "");
    root.style.setProperty("--scrollThumbColour1", "");
    root.style.setProperty("--scrollThumbColour2", "");
    root.style.setProperty("--scrollButtonColour1", "");
    root.style.setProperty("--scrollButtonColour2", "");
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
    root.style.setProperty("--highlightColour1", "#b3d9ff");
    root.style.setProperty("--highlightColour2", "#3399ff");
    root.style.setProperty("--postItColour", "#fffcaa");
    root.style.setProperty("--sidebarTextColour", "black");
    root.style.setProperty("--sidebarBackgroundColour", "#8f8c8a");
    root.style.setProperty("--sidebarBorderColour", "#0e0cf3");
    root.style.setProperty("--colour1", "black");
    root.style.setProperty("--colour2", "white");
    root.style.setProperty("--scrollTrackColour", "");
    root.style.setProperty("--scrollThumbColour1", "");
    root.style.setProperty("--scrollThumbColour2", "");
    root.style.setProperty("--scrollButtonColour1", "");
    root.style.setProperty("--scrollButtonColour2", "");
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

/* Arrows for timeline: See "animated CSS arrows" */
/* https://www.sliderrevolution.com/resources/css-arrow/ */
function block3SetUp() {
  ("use strict");

  let prevEvent = null;
  let prevYr = null;
  let prevInfo = null;
  let clicked = false;
  let timelineExtended = false;
  let md;
  const timeline = document.querySelector(".events ol");
  const events = document.querySelectorAll(".events ol li a");
  const before = document.querySelector("#before");
  const after = document.querySelector("#after");

  if (timelineExtended) {
    md = Math.floor(events.length / 2);
  } else {
    md = Math.ceil(events.length / 2) - 1;
  }

  events.forEach((event) => {
    const eventDate = event.getAttribute("data-date");
    let yr = Number(eventDate.substring(eventDate.length - 4));
    let midYr = Number(
      events[md]
        .getAttribute("data-date")
        .substring(events[md].getAttribute("data-date").length - 4)
    );

    event.addEventListener("mouseover", () => {
      event.style.color = "var(--highlightColour1)";

      // Modify timeline graphic
      if (!timelineExtended && yr > midYr) {
        before.innerHTML = "<<<";
        after.innerHTML = "";
        timeline.style.transition = "transform 1.5s ease-out";
        timeline.style.transform = "translateX(-20%)";
        timelineExtended = true;
      } else if (timelineExtended && yr < midYr) {
        before.innerHTML = "";
        after.innerHTML = ">>>";
        timeline.style.transition = "transform 1.5s ease-out";
        timeline.style.transform = "translateX(0%)";
        timelineExtended = false;
      }
    });

    event.addEventListener("mouseout", () => {
      if (clicked) {
        event.style.color = "var(--highlightColour2)";
      } else {
        event.style.color = "var(--textColour)";
      }

      clicked = false;
    });

    event.addEventListener("click", () => {
      const eventInfo = document.querySelector(eventDate);

      clicked = true;
      event.style.color = "var(--highlightColour2)";
      events.forEach((date) => {
        // This branch followed only for second and subsequent selections
        if (prevEvent) {
          // If this event is the current selection then go to next event
          if (event == prevEvent) {
            next;
          }

          prevEvent.style.color = "var(--textColour)";

          // Remove previous event
          if (date == prevEvent) {
            if (prevYr < midYr) {
              prevInfo.classList.remove("selected", "enter-left");
              prevInfo.classList.add("leave-left");
            } else {
              prevInfo.classList.remove("selected", "enter-right");
              prevInfo.classList.add("leave-right");
            }
          }
        }

        // Slide-in new event
        if (date == event) {
          if (yr < midYr) {
            date.classList.add("selected");
            eventInfo.classList.add("selected", "enter-left");
          } else {
            date.classList.add("selected");
            eventInfo.classList.add("selected", "enter-right");
          }
        }
      });

      // Remove display classes from previous event
      if (prevEvent) {
        prevInfo.classList.remove(...prevInfo.classList);
      }

      prevEvent = event;
      prevYr = yr;
      prevInfo = eventInfo;
    });
  });
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

  // Customize scroll-bars ??
  // Tool-tips ??
  // ADD RESPONSIVENESS
  //  - block4SetUp(): timeline will become vertical for mobile-sized devices
}

// Event listener for the onload event will call the init() function when
// loading of the Document Object Model (DOM) has been completed
window.onload = init;
