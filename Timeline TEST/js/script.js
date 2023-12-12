/* jshint esversion: 6 */

function block3SetUp() {
  ("use strict");

  // !! TO-DO !! //
  // Responsiveness - converts to vertical at mobile-size
  // !! TO-DO !! //
  let prevEvent = null;
  let prevYr = null;
  let prevInfo = null;
  let clicked = false;
  let timelineExtended = false;
  let md;
  const timeline = document.querySelector(".events ol");
  const events = document.querySelectorAll(".events ol li a");

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
      const before = document.querySelector("#before");
      const after = document.querySelector("#after");

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

function init() {
  "use strict";

  block3SetUp();
}

// Event listener for the onload event will call the init() function when
// loading of the Document Object Model (DOM) has been completed
window.onload = init;
