/* jshint esversion: 6 */

/*
    !!! MODIFY ISLAND GRID FOR SMALLER SCREENS !!!

    !!! ADD MOUSE- AND TOUCH-EVENTS FOR NAVIGATION !!!
*/

const background = document.querySelector("#oceanImage");
const islands = document.querySelector(".islands");
const oceanSounds = document.querySelector("#soundEffect");
const rootCSS = document.querySelector(":root");
const oceanStats = document.querySelector("#sevenSeas").getBoundingClientRect();
const ship = document.querySelector("#ship");
const scroll = document.querySelector(".scroll");
const speakerOnButton = document.querySelector("#speakerOn");
const speakerOffButton = document.querySelector("#speakerOff");
const setSailButton = document.querySelector("#setSail");
const speechBubble = document.querySelector("#speechBubble");
const speechText = document.querySelector("#speechBubble #speechBubbleText");
const shipStats = {
  x: 15,
  y: 170,
  facing: 0,
  bearing: 0,
  speed: 3,
  animate: null,
};
const keyPressed = [];
const keyz = {
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
};
let beached = false;
let shipXonBubble = -99;
let shipYonBubble = -99;
let firstKeyPressed = false;

function setSail() {
  "use strict";

  let soundStatus = sessionStorage.getItem("soundStatus");

  // CREATE SPEAKER EVENT LISTENERS
  speakerOnButton.addEventListener("click", speakerOn);
  speakerOffButton.addEventListener("click", speakerOff);

  // HIDE SCROLL AND UNBLUR SCREEN ELEMENTS
  scroll.style.display = "none";
  setSailButton.style.display = "none";
  background.classList.remove("blur");
  ship.classList.remove("blur");
  islands.classList.remove("blur");

  // IF FIRST INTERACTION FOR THIS SESSION ,,,
  if (!soundStatus) soundStatus = "ON";
  if (soundStatus == "ON") {
    speakerOn();
  } else if (soundStatus == "OFF") {
    speakerOff();
  }

  // CREATE KEY-PRESS EVENT LISTENER
  window.addEventListener("keydown", (e) => {
    if (!firstKeyPressed) {
      if (soundStatus == "ON") {
        speakerOn();
      } else if (soundStatus == "OFF") {
        speakerOff();
      }

      firstKeyPressed = true;
    }

    if (e.code in keyz) {
      switch (e.code) {
        case `${"ArrowDown"}`:
          keyPressed[0] = true;
          if (shipStats.facing == 2) ship.src = "images/shipSOUTHEAST.png";
          if (shipStats.facing == 1) ship.src = "images/shipSOUTHWEST.png";
          shipStats.bearing = 3;
          break;
        case `${"ArrowLeft"}`:
          keyPressed[1] = true;
          ship.src = "images/shipWEST.png";
          shipStats.facing = 1;
          shipStats.bearing = 2;
          break;
        case `${"ArrowRight"}`:
          keyPressed[2] = true;
          ship.src = "images/shipEAST.png";
          shipStats.facing = 2;
          shipStats.bearing = 4;
          break;
        case `${"ArrowUp"}`:
          keyPressed[3] = true;
          if (shipStats.facing == 2) ship.src = "images/shipNORTHEAST.png";
          if (shipStats.facing == 1) ship.src = "images/shipNORTHWEST.png";
          shipStats.bearing = 1;
          break;
      }
    }
  });

  // CREATE KEY-RELEASE EVENT LISTENERS
  window.addEventListener("keyup", (e) => {
    if (e.code in keyz) {
      switch (e.code) {
        case `${"ArrowDown"}`:
          keyPressed[0] = false;
          break;
        case `${"ArrowLeft"}`:
          keyPressed[1] = false;
          break;
        case `${"ArrowRight"}`:
          keyPressed[2] = false;
          break;
        case `${"ArrowUp"}`:
          keyPressed[3] = false;
          break;
      }
    }
  });
}

function sailHo() {
  "use strict";

  let headerBottom = document
    .querySelector("header")
    .getBoundingClientRect().bottom;

  // IF CONTACT MADE WITH AN ISLAND, THEN PREVENT FURTHER MOVEMENT ...
  if (beached) return;

  // PRESS ARROW DOWN
  if (keyPressed[0]) {
    shipStats.y += shipStats.speed;

    // CHECK IF POSITION AT BOTTOM WALL
    if (shipStats.y > oceanStats.height - ship.offsetHeight) {
      shipStats.y = oceanStats.height - ship.offsetHeight;
      displaySpeechBubble("bottom");
    }

    // PRESS ARROW UP
  } else if (keyPressed[3]) {
    shipStats.y -= shipStats.speed;

    // CHECK IF POSITION AT UPPER WALL
    if (shipStats.y < headerBottom - shipStats.y / 4) {
      shipStats.y = headerBottom - shipStats.y / 4;
      displaySpeechBubble("top");
    }
  }

  // PRESS ARROW LEFT
  if (keyPressed[1]) {
    shipStats.x -= shipStats.speed;

    // CHECK IF POSITION AT LEFT WALL
    if (shipStats.x < 0) {
      shipStats.x = 0;
      displaySpeechBubble("left");
    }

    // PRESS ARROW RIGHT
  } else if (keyPressed[2]) {
    shipStats.x += shipStats.speed;

    // CHECK IF POSITION AT RIGHT WALL
    if (shipStats.x > oceanStats.width - ship.offsetWidth) {
      shipStats.x = oceanStats.width - ship.offsetWidth;
      displaySpeechBubble("right");
    }
  }

  // IF SHIP MOVES WHEN SPEECHBUBBLE IS DISPLAYED, THEN HIDE SPEECHBUBBLE
  if (
    (shipXonBubble != -99 && shipStats.x != shipXonBubble) ||
    (shipYonBubble != -99 && shipStats.y != shipYonBubble)
  ) {
    speechBubble.classList.remove("location");
    speechText.style.visibility = "hidden";
  }

  // CHECK IF USER HAS MADE CONTACT WITH ANY OF THE ISLANDS
  landHo();

  // POSITION SHIP TO UPDATED CO-ORDINATES
  ship.style.top = shipStats.y + "px";
  ship.style.left = shipStats.x + "px";

  shipStats.animate = window.requestAnimationFrame(sailHo);
}

function landHo() {
  "use strict";

  let beachedShip = ship.getBoundingClientRect();
  let islandStats, islandNorth, islandEast, islandSouth, islandWest;
  let islandOffset = oceanStats.width * 0.013021;
  let beachedShipX = shipStats.x;
  let beachedShipY = shipStats.y;

  // CHECK EACH ISLAND TO SEE IF USER HAS MADE CONTACT
  for (
    var island = 3;
    island <= document.querySelectorAll(".islands li").length;
    island++
  ) {
    islandStats = document
      .querySelector(".islands li:nth-of-type(" + island + ")")
      .getBoundingClientRect();

    // ADJUST SIZE OF ISLAND BOUNDING RECTANGLE
    islandSouth = islandStats.bottom - islandOffset * 3;
    switch (island) {
      case 3:
        islandNorth = islandStats.top - islandOffset;
        islandEast = islandStats.right - islandOffset;
        islandWest = islandStats.left + islandOffset * 1.3;
        break;
      case 4:
        islandNorth = islandStats.top + islandOffset * 2;
        islandEast = islandStats.right;
        islandWest = islandStats.left + islandOffset * 2;
        break;
      case 5:
        islandNorth = islandStats.top + islandOffset * 1.5;
        islandEast = islandStats.right + islandOffset;
        islandWest = islandStats.left + islandOffset * 2;
        break;
      case 6:
        islandNorth = islandStats.top + islandOffset;
        islandEast = islandStats.right + islandOffset;
        islandWest = islandStats.left + islandOffset * 3;
        islandSouth = islandStats.bottom - islandOffset * 2.5;
        break;
      case 7:
        islandNorth = islandStats.top + islandOffset * 1.5;
        islandEast = islandStats.right + islandOffset * 0.9;
        islandWest = islandStats.left + islandOffset * 1.5;
        break;
      case 8:
        islandNorth = islandStats.top + islandOffset;
        islandEast = islandStats.right;
        islandWest = islandStats.left + islandOffset * 1.5;
        break;
      case 9:
        islandNorth = islandStats.top + islandOffset * 1.5;
        islandEast = islandStats.right + islandOffset * 0.75;
        islandWest = islandStats.left + islandOffset * 1.25;
        break;
    }

    if (
      (beachedShip.right >= islandWest &&
        beachedShip.right <= islandEast &&
        beachedShip.bottom >= islandNorth &&
        beachedShip.bottom <= islandSouth) ||
      (beachedShip.right >= islandWest &&
        beachedShip.right <= islandEast &&
        beachedShip.top >= islandNorth &&
        beachedShip.top <= islandSouth) ||
      (beachedShip.left >= islandWest &&
        beachedShip.left <= islandEast &&
        beachedShip.bottom >= islandNorth &&
        beachedShip.bottom <= islandSouth) ||
      (beachedShip.left >= islandWest &&
        beachedShip.left <= islandEast &&
        beachedShip.top >= islandNorth &&
        beachedShip.top <= islandSouth)
    ) {
      switch (shipStats.bearing) {
        case 1:
          beachedShipY += islandOffset;
          weighAnchor(island, "south", beachedShipX, beachedShipY);
          break;
        case 2:
          beachedShipX += islandOffset;
          weighAnchor(island, "east", beachedShipX, beachedShipY);
          break;
        case 3:
          beachedShipY -= islandOffset;
          weighAnchor(island, "north", beachedShipX, beachedShipY);
          break;
        case 4:
          beachedShipX -= islandOffset;
          weighAnchor(island, "west", beachedShipX, beachedShipY);
          break;
      }
    }
  }
}

function weighAnchor(island, approach, shipX, shipY) {
  "use strict";

  let landingBubble = document.querySelector("#landingBubble");
  let landingText = document.querySelector("#landingBubble #landingBubbleText");
  let xOffset, yOffset;

  // SET FLAG TO PREVENT MOVEMENT AFTER CONTACT WITH AN ISLAND
  beached = true;

  // SET LOCATION OF LANDING BUBBLE
  switch (approach) {
    case "west":
      xOffset = 60;
      yOffset = 55;
      break;
    case "east":
      xOffset = -185;
      yOffset = 55;
      break;
    case "north":
      xOffset = -50;
      yOffset = 120;
      break;
    case "south":
      xOffset = -50;
      yOffset = -10;
      break;
  }

  // SAVE SHIP LOCATION TO BE LOADED WHEN USER RETURNS TO LANDING PAGE
  sessionStorage.setItem("savedShipXPos", shipX.toString());
  sessionStorage.setItem("savedShipYPos", shipY.toString());
  sessionStorage.setItem("savedShipDirection", shipStats.bearing);

  // DISPLAY LANDING BUBBLE
  rootCSS.style.setProperty(
    "--xBubble",
    (shipStats.x + xOffset).toString() + "px"
  );
  rootCSS.style.setProperty(
    "--yBubble",
    (shipStats.y + yOffset).toString() + "px"
  );
  landingBubble.classList.add("location");
  landingText.style.visibility = "visible";

  // HIDE LANDING BUBBLE
  setTimeout(() => {
    landingBubble.classList.remove("location");
    landingText.style.visibility = "hidden";

    // JUMP TO THIS ISLAND LINK
    window.location.href = document.querySelector(
      ".islands li:nth-of-type(" + island + ") a"
    );
  }, 2500);
}

function speakerOn() {
  "use strict";

  oceanSounds.play();
  speakerOnButton.style.visibility = "hidden";
  speakerOffButton.style.visibility = "visible";
  sessionStorage.setItem("soundStatus", "ON");
  oceanSounds.volume = 0.2;
}

function speakerOff() {
  "use strict";

  oceanSounds.pause();
  speakerOnButton.style.visibility = "visible";
  speakerOffButton.style.visibility = "hidden";
  sessionStorage.setItem("soundStatus", "OFF");
}

function displaySpeechBubble(location) {
  "use strict";

  let xOffset, yOffset;
  let arrowMargin, arrowStyle;

  // INITIALIZE CSS VARIABLES AS NULL
  rootCSS.style.setProperty("--arrowTop", "");
  rootCSS.style.setProperty("--arrowBottom", "");
  rootCSS.style.setProperty("--arrowLeft", "");
  rootCSS.style.setProperty("--arrowRight", "");
  rootCSS.style.setProperty("--arrowMargin", "");
  rootCSS.style.setProperty("--arrowStyle", "");

  switch (location) {
    case "bottom":
      xOffset = -40;
      yOffset = 0;
      if (shipStats.x < 30) {
        xOffset = 20;
      }
      if (shipStats.x > 1750) {
        xOffset = -120;
      }
      rootCSS.style.setProperty("--arrowTop", "100%");
      rootCSS.style.setProperty("--arrowLeft", "45%");
      arrowMargin = "0 0 0 -5px";
      arrowStyle = "#666666 transparent transparent transparent";
      break;

    case "top":
      xOffset = -30;
      yOffset = 140;
      if (shipStats.x < 30) {
        xOffset = 20;
      }
      if (shipStats.x > 1750) {
        xOffset = -120;
      }
      rootCSS.style.setProperty("--arrowBottom", "100%");
      rootCSS.style.setProperty("--arrowRight", "50%");
      arrowMargin = "0 0 0 -5px";
      arrowStyle = "transparent transparent #666666 transparent";
      break;

    case "left":
      xOffset = 60;
      yOffset = 50;
      rootCSS.style.setProperty("--arrowTop", "48%");
      rootCSS.style.setProperty("--arrowRight", "99%");
      arrowMargin = "-5px 0 0 0";
      arrowStyle = "transparent #666666 transparent transparent";
      break;

    case "right":
      xOffset = -185;
      yOffset = 50;
      rootCSS.style.setProperty("--arrowTop", "48%");
      rootCSS.style.setProperty("--arrowLeft", "100%");
      arrowMargin = "-5px 0 0 0";
      arrowStyle = "transparent transparent transparent #666666";
      break;
  }

  // SET CSS SPEECHBUBBLE VARIABLES
  rootCSS.style.setProperty(
    "--xBubble",
    (shipStats.x + xOffset).toString() + "px"
  );
  rootCSS.style.setProperty(
    "--yBubble",
    (shipStats.y + yOffset).toString() + "px"
  );
  rootCSS.style.setProperty("--arrowMargin", arrowMargin);
  rootCSS.style.setProperty("--arrowStyle", arrowStyle);

  // DISPLAY SPEECH BUBBLE
  shipXonBubble = shipStats.x;
  shipYonBubble = shipStats.y;
  speechBubble.classList.add("location");
  speechText.style.visibility = "visible";

  // HIDE SPEECH BUBBLE
  setTimeout(() => {
    speechBubble.classList.remove("location");
    speechText.style.visibility = "hidden";
  }, 7500);
}

function init() {
  "use strict";

  // ATTEMPT TO READ LOCAL AND SESSION STORAGE VARIABLES
  let storedShipX = sessionStorage.getItem("savedShipXPos");
  let storedShipY = sessionStorage.getItem("savedShipYPos");
  let storedShipDirection = sessionStorage.getItem("savedShipDirection");
  let pirateName = localStorage.getItem("pirateName");
  let piratePort = localStorage.getItem("piratePort");
  let pirateWeapon = localStorage.getItem("pirateWeapon");

  // CALCULATE SHIP-SIZE BASED ON SCREENWIDTH AND SET WITH ROOT VARIABLE
  let shipWidth = oceanStats.width * 0.03;

  if (shipWidth < 25) shipWidth = 25;
  rootCSS.style.setProperty("--shipWidth", shipWidth + "px");
  rootCSS.style.setProperty("--shipHeight", shipWidth * 1.1 + "px");
  ship.style.width = rootCSS.style.getPropertyValue("--shipWidth");
  ship.style.height = rootCSS.style.getPropertyValue("--shipHeight");

  // BLUR IMAGES WHILE DISPLAYING INTRO SCROLL
  ship.style.visibility = "visible";
  ship.classList.add("blur");
  islands.classList.add("blur");
  background.classList.add("blur");

  // IF USER IS RETURNING FROM A CONTENT PAGE ...
  if (storedShipX != null) {
    // REMOVE setSail BUTTON ...
    setSailButton.style.display = "none";

    // SET SHIP POSITION
    shipStats.x = parseInt(storedShipX);
    shipStats.y = parseInt(storedShipY);
    ship.style.top = shipStats.y + "px";
    ship.style.left = shipStats.x + "px";

    // SET SHIP DIRECTION
    shipStats.bearing = parseInt(storedShipDirection);
    if (shipStats.bearing == 2) ship.src = "images/shipEAST.png";
    if (shipStats.bearing == 4) ship.src = "images/shipWEST.png";

    setSail();
  } else {
    // POSITION SCROLL AND SET-SAIL BUTTON
    scroll.style.display = "block";

    if (pirateName != null) {
      // IF USER IS A RETURNING VISITOR ...
      document.querySelector("#newVisitor").style.display = "none";
      document.querySelector("#returnVisitor").style.display = "block";
      document.getElementById("pirateName").innerHTML = pirateName;
      document.getElementById("piratePort").innerHTML = piratePort;

      if (pirateWeapon == "default") {
        pirateWeapon = "weapon";
      }
      document.getElementById("pirateWeapon").innerHTML = pirateWeapon;
    } else {
      // IF USER IS NEW TO SITE ...
      document.querySelector("#newVisitor").style.display = "block";
      document.querySelector("#returnVisitor").style.display = "none";
    }

    setSailButton.addEventListener("click", setSail);
  }

  shipStats.animate = window.requestAnimationFrame(sailHo);
}

window.onload = init;
