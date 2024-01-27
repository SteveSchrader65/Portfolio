/* jshint esversion: 8 */

let viewingMode = "";

function setViewingMode() {
  "use strict";

  const root = document.querySelector(":root");
  const lightButtons = document.querySelectorAll(".lightMode");
  const darkButtons = document.querySelectorAll(".darkMode");

  lightButtons.forEach((button) => {
    button.addEventListener("click", _setLightMode);
  });

  darkButtons.forEach((button) => {
    button.addEventListener("click", _setDarkMode);
  });

  viewingMode = localStorage.getItem("viewingMode");

  if (viewingMode == "darkness" || window.matchMedia(`(prefers-color-scheme: dark)`).matches) {
    _setDarkMode();
  } else {
    _setLightMode();
  }

  function _setLightMode() {
    viewingMode = "lightness";
    localStorage.setItem("viewingMode", viewingMode);

    lightButtons.forEach((light) => {
      light.style.visibility = "hidden";
    });

    darkButtons.forEach((dark) => {
      dark.style.visibility = "visible";
    });

    root.style.setProperty("--textColour", "#210000");
    root.style.setProperty("--backColour", "#f2f2f2");
    root.style.setProperty("--navBarColour", "#cccccc");
    root.style.setProperty("--navTextColour", "black");
    root.style.setProperty("--navHoverColour", "#9b9b97");
    root.style.setProperty("--menuBackgroundColour", "#9b9b97");
    root.style.setProperty("--menuTextColour", "#e6e6e6");
    root.style.setProperty("--menuBackgroundHoverColour", "#82827d");
    root.style.setProperty("--menuTextHoverColour", "#f5f5f5");
    root.style.setProperty("--hamburgerButtonColour", "#0059b3");
    root.style.setProperty("--titleColour", "#cccc00");
    root.style.setProperty("--colour1", "#000000");
    root.style.setProperty("--colour2", "#ffffff");
    root.style.setProperty("--scrollTrackColour", "#b4b2b1");
    root.style.setProperty("--scrollThumbColour1", "#1d6dc9");
    root.style.setProperty("--scrollThumbColour2", "#6c9ee0");
    root.style.setProperty("--scrollButtonColour1", "#6c9ee0");
    root.style.setProperty("--scrollButtonColour2", "#8fbcef");
    root.style.setProperty("--scrollBorderColour", "#b7b6fc");
    root.style.setProperty("--progressColour", "#cccc00");
    root.style.setProperty("--tipBackgroundColour", "#808080");
    root.style.setProperty("--tipBorderColour", "#6c9ee0");
    root.style.setProperty("--tipTextColour", "whitesmoke");
    root.style.setProperty("--contactFormBorderColour", "#737373");
    root.style.setProperty("--contactLabelColour", "#000000");
    root.style.setProperty("--contactBackgroundColour", "#cceeff");
    root.style.setProperty("--contactFieldPlaceholderColour", "rgba(0, 0, 0, 0, 0.4)");
    root.style.setProperty("--contactFieldTextColour", "#000000");
    root.style.setProperty("--contactFieldBackgroundColour", "rgba(179, 217, 255, 0.6)");
    root.style.setProperty("--contactFieldBorderFocusColour", "#0d0d0d");
    root.style.setProperty("--contactButtonColour", "#8ae600");
    root.style.setProperty("--contactButtonTextColour", "#000000");
    root.style.setProperty("--contactButtonHoverColour", "#99ff00");
    root.style.setProperty("--contactButtonActiveColour", "#ffff33");

    /* ---------- Colours below this line not currently in use ---------- */
    root.style.setProperty("--highlightColour1", "#3399ff");
    root.style.setProperty("--highlightColour2", "#0059b3");
    root.style.setProperty("--postItColour", "#fffcaa");
    root.style.setProperty("--sidebarTextColour", "#0000cc");
    root.style.setProperty("--sidebarBackgroundColour", "#e8e8e8");
    root.style.setProperty("--sidebarBorderColour", "#33cc33");
    root.style.setProperty("--alertColour", "#ff1a1a");
    root.style.setProperty("--successColour", "#69cf9d");

    root.style.setProperty("--borderImage", "url('../images/border-light.png')");
  }

  function _setDarkMode() {
    viewingMode = "darkness";
    localStorage.setItem("viewingMode", viewingMode);

    lightButtons.forEach((light) => {
      light.style.visibility = "visible";
    });

    darkButtons.forEach((dark) => {
      dark.style.visibility = "hidden";
    });

    root.style.setProperty("--textColour", "#cccccc");
    root.style.setProperty("--backColour", "#262626");
    root.style.setProperty("--navBarColour", "#210000");
    root.style.setProperty("--navTextColour", "#d4bc2b");
    root.style.setProperty("--navHoverColour", "#82807d");
    root.style.setProperty("--menuBackgroundColour", "#82827d");
    root.style.setProperty("--menuTextColour", "#210000");
    root.style.setProperty("--menuBackgroundHoverColour", "#cccccc");
    root.style.setProperty("--menuTextHoverColour", "#f5f5f5");
    root.style.setProperty("--hamburgerButtonColour", "#82827d");
    root.style.setProperty("--titleColour", "#0e0cf3");
    root.style.setProperty("--colour1", "black");
    root.style.setProperty("--colour2", "white");
    root.style.setProperty("--scrollTrackColour", "#757270");
    root.style.setProperty("--scrollThumbColour1", "#0a2647");
    root.style.setProperty("--scrollThumbColour2", "#205295");
    root.style.setProperty("--scrollButtonColour1", "#1961b3");
    root.style.setProperty("--scrollButtonColour2", "#4282d7");
    root.style.setProperty("--scrollBorderColour", "#0e0cf3");
    root.style.setProperty("--progressColour", "#0e0cf3");
    root.style.setProperty("--tipBackgroundColour", "#3399ff");
    root.style.setProperty("--tipBorderColour", "black");
    root.style.setProperty("--tipTextColour", "black");
    root.style.setProperty("--contactFormBorderColour", "#0033cc");
    root.style.setProperty("--contactLabelColour", "#8c8c8c");
    root.style.setProperty("--contactBackgroundColour", "#4e4c4b");
    root.style.setProperty("--contactFieldPlaceholderColour", "rgba(38, 38, 38, 0.6)");
    root.style.setProperty("--contactFieldTextColour", "#262626");
    root.style.setProperty("--contactFieldBackgroundColour", "#827d7d");
    root.style.setProperty("--contactFieldBorderFocusColour", "#3399ff");
    root.style.setProperty("--contactButtonColour", "#006600");
    root.style.setProperty("--contactButtonTextColour", "#8c8c8c");
    root.style.setProperty("--contactButtonHoverColour", "#009900");
    root.style.setProperty("--contactButtonActiveColour", "#8ae600");

    /* ---------- Colours below this line not currently in use ---------- */
    root.style.setProperty("--highlightColour1", "#b3d9ff");
    root.style.setProperty("--highlightColour2", "#3399ff");
    root.style.setProperty("--postItColour", "#fffcaa");
    root.style.setProperty("--sidebarTextColour", "black");
    root.style.setProperty("--sidebarBackgroundColour", "#8f8b8a");
    root.style.setProperty("--sidebarBorderColour", "#0e0cf3");
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

function setFontsAndSizings() {
  "use strict";

  const root = document.querySelector(":root");
  let navLinkSize;
  let navDropLinkSize;
  let navDropMenuWidth;
  let hamburgerWidth;
  let hamburgerLayerHeight;
  let hamburgerSpacer;
  let hamburgerLinkSize;
  let hamburgerMenuWidth;
  let viewModeButtonSize;
  let viewModeTop;
  let viewModeLeft;
  let parallaxFontSize;
  let textFontSize;
  let footerFontSize;
  let tipFontSize;
  let largeSize = 650;
  let mobileInflate = 1.1;
  let screenWidth = window.innerWidth;
  let temp = screenWidth / 3395;

  navLinkSize = _clamp(temp * 4.5, 0.85, 4.75);
  navDropLinkSize = _clamp(temp * 4, 0.6, 4);
  navDropMenuWidth = _clamp(temp * 35, 4.5, 49);
  hamburgerWidth = _clamp(temp * 150, 18, 32);
  hamburgerLayerHeight = _clamp(temp * 20, 1, 3);
  hamburgerSpacer = _clamp(temp * 80, 6, 9);
  hamburgerLinkSize = _clamp(temp * 9, 1, 1.6);
  hamburgerMenuWidth = _clamp(temp * 73, 8, 14);
  viewModeButtonSize = screenWidth < largeSize ? _clamp(temp * 6, 2, 7) * mobileInflate: _clamp(temp * 6, 2, 7);
  viewModeTop = _clamp(temp * 24, 2, 18);
  viewModeLeft = screenWidth < largeSize ? _clamp(temp * -10, -4, -1) : _clamp(temp * 10, 1, 4) / 2;
  parallaxFontSize = _clamp(temp * 12, 2, 12);

  textFontSize =
    screenWidth < largeSize
      ? _clamp(temp * 2.7, 0.9, 2.7) * (mobileInflate + 0.15)
      : _clamp(temp * 2.7, 0.9, 2.7);

  footerFontSize = _clamp(temp * 2.25, 0.77, 2.25);

  tipFontSize =
    screenWidth < largeSize
      ? _clamp(temp * 1.9, 0.6, 1.9) * mobileInflate
      : _clamp(temp * 1.9, 0.6, 1.9);

  root.style.setProperty("--navLinkSize", navLinkSize + "rem");
  root.style.setProperty("--navDropLinkSize", navDropLinkSize + "rem");
  root.style.setProperty("--navDropMenuWidth", navDropMenuWidth + "rem");
  root.style.setProperty("--hamburgerWidth", hamburgerWidth + "px");
  root.style.setProperty("--hamburgerLayerHeight", hamburgerLayerHeight + "px");
  root.style.setProperty("--hamburgerSpacer", hamburgerSpacer + "px");
  root.style.setProperty("--hamburgerLinkSize", hamburgerLinkSize + "rem");
  root.style.setProperty("--hamburgerMenuWidth", hamburgerMenuWidth + "rem");
  root.style.setProperty("--viewModeButtonSize", viewModeButtonSize + "rem");
  root.style.setProperty("--viewModeTop", viewModeTop + "px");
  root.style.setProperty("--viewModeLeft", viewModeLeft + "rem");
  root.style.setProperty("--parallaxFontSize", parallaxFontSize + "rem");
  root.style.setProperty("--textFontSize", textFontSize + "rem");
  root.style.setProperty("--footerFontSize", footerFontSize + "rem");
  root.style.setProperty("--tipFontSize", tipFontSize + "rem");

  function _clamp(value, min, max) {
    let clamped;

    clamped = Math.min(Math.max(value, min), max);
    return clamped;
  }
}

function navbarHide() {
  "use strict";

  let prevScrollPos = window.scrollY;
  let isScrolling;

  if (!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches) {
    document.addEventListener("scroll", () => {
      let currentScrollPos = window.scrollY;

      if (prevScrollPos > currentScrollPos) {
        document.querySelector("nav").style.top = "0";
      } else {
        document.querySelector("nav").style.top = "-5rem";
      }

      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        document.querySelector("nav").style.top = "0";
      }, 2000);

      prevScrollPos = currentScrollPos;
    });
  }
}

function unanimate() {
  "use strict";

  const links = document.querySelectorAll("#mainNav .mainMenu a:not(.dropMenu a)");

  if (!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches) {
    links.forEach((link) => {
      link.addEventListener("mouseover", () => {
        const linkPopAnim = new KeyframeEffect(
          link,
          [{ transform: "scale(1)" }, { transform: "scale(1.2)" }],
          {
            duration: 250,
            easing: "ease-out",
            fill: "forwards",
          }
        );

        new Animation(linkPopAnim).play();
      });
    });

    links.forEach((link) => {
      link.addEventListener("mouseout", () => {
        const linkUnpopAnim = new KeyframeEffect(
          link,
          [{ transform: "scale(1.2)" }, { transform: "scale(1)" }],
          {
            duration: 250,
            easing: "ease-out",
            fill: "forwards",
          }
        );

        new Animation(linkUnpopAnim).play();
      });
    });
  }
}

function block1SetUp() {
  "use strict";

  const letters = document.querySelectorAll(".animateMe");
  const darkArray = ["red", "orange", "greenyellow", "limegreen", "#3399ff", "#e600e6"];
  const lightArray = ["#e60000", "#e69500", "#ffff00", "#00cc00", "#0000ff", "#990099"];
  let colourArray;
  let colourIndex;

  if (viewingMode == "lightness") {
    colourArray = lightArray;
  } else {
    colourArray = darkArray;
  }

  setInterval(() => {
    letters.forEach((letter) => {
      colourIndex = Math.floor(Math.random() * colourArray.length);
      letter.style.color = colourArray[colourIndex];
    });
  }, 250);
}

function block2SetUp() {
  "use strict";

  const diplomas = document.querySelectorAll(".course-card");
  const courses = document.querySelector("#courses");
  const outro = document.querySelector("#outro");

  diplomas.forEach((diploma) => {
    let isFlipped = false;

    diploma.addEventListener("mouseover", () => {
      const courseID = diploma.getAttribute("data-course");
      const courseInfo = document.querySelector(courseID);
      const diplomaAnim = new KeyframeEffect(
        diploma,
        [{ transform: "matrix(1.15, 0, 0, 1.15, -9, -9)" }],
        {
          duration: 500,
          easing: "linear",
          fill: "forwards",
        }
      );

      new Animation(diplomaAnim).play();

      setTimeout(() => {
        courses.innerHTML = courseInfo.textContent + "<p>" + outro.textContent + "</p>";
        courses.style.marginTop = "11%";
      }, 500);
    });

    diploma.addEventListener("mouseout", () => {
      if (isFlipped) {
        isFlipped = false;
        const diplomaAnim = new KeyframeEffect(diploma, [{ transform: "rotateY(-180deg" }], {
          duration: 150,
          easing: "linear",
          fill: "forwards",
        });

        new Animation(diplomaAnim).play();
      }

      const diplomaAnim = new KeyframeEffect(
        diploma,
        [{ transform: "matrix(1.0, 0, 0, 1.0, 0, 0)" }],
        { duration: 150, delay: 150, easing: "linear", fill: "forwards" }
      );

      new Animation(diplomaAnim).play();
    });

    diploma.addEventListener("click", () => {
      if (!isFlipped) {
        const diplomaAnim = new KeyframeEffect(
          diploma,
          [{ transform: `rotateY(180deg) matrix(1.15, 0, 0, 1.15, -9, -9)` }],
          {
            duration: 1000,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            fill: "forwards",
          }
        );

        new Animation(diplomaAnim).play();
      } else {
        const diplomaAnim = new KeyframeEffect(
          diploma,
          [{ transform: `rotateY(0deg) matrix(1.15, 0, 0, 1.15, -9, -9)` }],
          {
            duration: 1000,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            fill: "forwards",
          }
        );

        new Animation(diplomaAnim).play();
      }

      isFlipped = !isFlipped;
    });
  });
}

function block3SetUp() {
  "use strict";

  const timeline = document.querySelector(".events ol");
  const events = document.querySelectorAll(".events ol li a");
  const before = document.querySelector("#before");
  const after = document.querySelector("#after");
  const arrows = document.querySelectorAll("#before .arrow, #after .arrow");
  const arrowDelay = 250;
  let timelineExtended = false;
  let prevEvent = null;
  let prevYr = null;
  let prevInfo = null;
  let clicked = false;
  let md;

  if (timelineExtended) {
    md = Math.floor(events.length / 2);
  } else {
    md = Math.ceil(events.length / 2) - 1;
  }

  arrows.forEach((arrow, index) => {
    const arrowAnim = new KeyframeEffect(
      arrow,
      [
        { opacity: 0, transform: "translateX(4vw)" },
        { opacity: 1, transform: "translateX(2vw)" },
        { opacity: 1, transform: "translateX(-2vw)" },
        { opacity: 0, transform: "translateX(-4vw)" },
      ],
      { duration: 2000, delay: arrowDelay * index, iterations: Infinity, easing: "linear" }
    );

    new Animation(arrowAnim).play();
  });

  events.forEach((event) => {
    const eventDate = event.getAttribute("data-date");
    let yr = Number(eventDate.substring(eventDate.length - 4));
    let midYr = Number(
      events[md]
        .getAttribute("data-date")
        .substring(events[md].getAttribute("data-date").length - 4)
    );

    event.addEventListener("mouseover", () => {
      if (!timelineExtended && yr > midYr) {
        before.style.visibility = "visible";

        const futureAnim = new KeyframeEffect(timeline, [{ transform: "translateX(-20%)" }], {
          duration: 1500,
          easing: "ease-out",
          fill: "forwards",
        });

        new Animation(futureAnim).play();

        timelineExtended = true;
        after.style.visibility = "hidden";
      } else if (timelineExtended && yr < midYr) {
        after.style.visibility = "visible";

        const pastAnim = new KeyframeEffect(timeline, [{ transform: "translateX(0%)" }], {
          duration: 1500,
          easing: "ease-out",
          fill: "forwards",
        });

        new Animation(pastAnim).play();

        timelineExtended = false;
        before.style.visibility = "hidden";
      }

      event.style.color = "var(--highlightColour1)";
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
      let eventAnim;
      let eventDirection;

      clicked = true;
      event.style.color = "var(--highlightColour2)";
      events.forEach((date) => {
        if (prevEvent) {
          // This branch followed only for second and subsequent selections
          if (event != prevEvent) {
            prevEvent.style.color = "var(--textColour)";

            // Slide current event off-screen
            if (date == prevEvent) {
              if (prevYr < midYr) {
                eventDirection = "translateX(-200%)";
              } else {
                eventDirection = "translateX(200%)";
              }

              eventAnim = new KeyframeEffect(prevInfo, [{ transform: eventDirection }], {
                duration: 750,
                easing: "ease-out",
                fill: "forwards",
              });

              new Animation(eventAnim).play();
            }
          }
        }

        // Slide new event onto screen
        if (date == event) {
          if (yr < midYr) {
            eventInfo.style.transform = "translateX(-200%)";
          } else {
            eventInfo.style.transform = "translateX(200%)";
          }

          eventAnim = new KeyframeEffect(eventInfo, [{ transform: "translateX(0%)" }], {
            duration: 1500,
            easing: "linear",
            fill: "forwards",
          });

          eventInfo.style.display = "inline-block";
          new Animation(eventAnim).play();
        }
      });

      prevEvent = event;
      prevYr = yr;
      prevInfo = eventInfo;
      prevInfo.style.display = "none;";
    });
  });
}

function block4SetUp() {
  "use strict";

  const projects = document.querySelectorAll("#projectList li");
  const closeButton = document.querySelector("#sidebar #close");
  let sidebar = document.querySelector("#sidebar");
  let isSidebarOpen = false;
  let selectedProject;
  let images = [];

  projects.forEach((project) => {
    project.addEventListener("click", async () => {
      const projectID = project.getAttribute("data-project");

      if (isSidebarOpen) {
        await __closeSidebar();
      }

      // Open sidebar
      selectedProject = document.querySelector(projectID).cloneNode(true);
      selectedProject.id = "selectedProject";
      sidebar.appendChild(selectedProject);

      const openSidebarAnim = new KeyframeEffect(
        sidebar,
        [{ transform: "translateX(115%)" }, { transform: "translateX(15%)" }],
        {
          duration: 750,
          easing: "ease-in",
          fill: "forwards",
        }
      );

      new Animation(openSidebarAnim).play();
      isSidebarOpen = true;

      /* Apply hover to each image */
      images = selectedProject.querySelectorAll("img");

      images.forEach((image) => {
        let top;
        let left;
        let width;
        let height;

        image.addEventListener("mouseover", () => {
          let boundaries = sidebar.getBoundingClientRect();
          top = image.style.top;
          left = image.style.left;
          width = image.width;
          height = image.height;
          // image.style.position = "absolute";
          image.style.top = boundaries.top + "px";
          image.style.left = boundaries.left + "px";
          image.style.width = boundaries.width + "px";
          image.style.height = boundaries.height + "px";
          image.style.zIndex = "50";
          /* Inflate animation to fill sidebar */
        });

        image.addEventListener("mouseout", () => {
          // image.style.position = "relative";
          image.style.top = top;
          image.style.left = left;
          image.style.width = width;
          image.style.height = height;
          image.style.zIndex = "25";
          /* De-flate animation */
        });
      });
    });
  });

  closeButton.addEventListener("click", () => {
    __closeSidebar();
  });

  function __closeSidebar() {
    const closeAnim = new KeyframeEffect(
      sidebar,
      [{ transform: "translateX(15%)" }, { transform: "translateX(115%)" }],
      {
        duration: 750,
        easing: "ease-in",
        fill: "forwards",
      }
    );

    new Animation(closeAnim).play();

    const finished = new Promise((resolve) => {
      setTimeout(() => {
        sidebar.removeChild(selectedProject);
        images.forEach((image) => image.remove());
        isSidebarOpen = false;
        resolve(true);
      }, 750);
    });

    return finished;
  }
}


function block5SetUp() {
  "use strict";

  // Will require 'AreYouHuman ??' pop-up to allow input
}

function footerDate() {
  "use strict";

  const currentYear = new Date().getFullYear();

  document.querySelector("footer h3").innerHTML = "&copySteve Schrader " + currentYear;
}

function init() {
  "use strict";

  // NOTES - 23/1/24
  // Studies page CSS and wrap animations
  // Employment page CSS and wrap animations (timeline swaps to vertical for smaller devices)
  // Projects page CSS and wrap animations
  // Re-consider layout of text block for section1
  // Check coolors.com for colour palette contrasts
  // Edit and finalize text portions

  setViewingMode();
  setFontsAndSizings();

  if (!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches) {
    scrollToTop();
    smoothScroll();
    navbarHide();
    unanimate();
    block1SetUp();
  }

  block2SetUp();
  // block3SetUp();
  // block4SetUp();
  block5SetUp();
  footerDate();

  window.addEventListener("resize", setFontsAndSizings);
}

window.onload = init;
