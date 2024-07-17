/* jshint esversion: 6 */

const dropdown = document.querySelector(".dropdown-menu");
function showDropdown() {
	'use strict';

  dropdown.style.display = "block";
}

function hideDropdown() {
  "use strict";

  dropdown.style.display = "none";

}

function init() {
	'use strict';

  document.querySelector("#navbarDropdown").addEventListener("mouseover", showDropdown);
}

window.onload = init;
