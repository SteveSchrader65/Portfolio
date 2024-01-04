/* jshint esversion: 8 */

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
    // root.style.setProperty("--tipBorderColour", "");
    // root.style.setProperty("--tipBackgroundColour", "");
    // root.style.setProperty("--tipTextColour", "");
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
    // root.style.setProperty("--tipBorderColour", "");
    // root.style.setProperty("--tipBackgroundColour", "");
    // root.style.setProperty("--tipTextColour", "");
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

  document.querySelector("#navlist").style.top = "0";
}

function navbarHide() {
  "use strict";

  let prevScrollPos = window.scrollY;

  document.addEventListener("scroll", () => {
    let currentScrollPos = window.scrollY;

    if (prevScrollPos > currentScrollPos) {
      document.querySelector("#navlist").style.top = "0";
    } else {
      document.querySelector("#navlist").style.top = "-58px";
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
      const eventInfo = document.querySelector(eventDate); // !! selectedProject !!
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

      const openAnim = new KeyframeEffect(
        sidebar,
        [{ transform: "translateX(115%)" }, { transform: "translateX(15%)" }],
        {
          duration: 750,
          easing: "ease-in",
          fill: "forwards",
        }
      );

      new Animation(openAnim).play();
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

  // Close sidebar
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

// https://formcarry.com/blog/how-to-create-a-simple-html-contact-form/
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

  setViewingMode();
  scrollToTop();
  navbarHide();
  smoothScroll();
  block1SetUp();
  block2SetUp();
  block3SetUp();
  block4SetUp();
  block5SetUp();
  footerDate();

  // Tool-tips ??
  // Check coolors.com for palette contrast checks
  // NOTE: Hide navlist for mobile-sized screens and display hamburger drop-down menu
  // ADD RESPONSIVENESS
  //  - block4SetUp(): timeline will become vertical for mobile-sized devices
  //                   use "display: flex;", "flex-flow: row nowrap;" and "flex-direction: row;"
  //                   changed in @media to "column" ---------------------------------------^
}

// Event listener for the onload event will call the init() function when
// loading of the Document Object Model (DOM) has been completed
window.onload = init;
