/* Error Message File */
/* jshint esversion: 6 */

/* ADD/REMOVE IMAGE TO/FROM CORRESPONDING #flagColumn */
function removeMessage(id) {
    'use strict';

    var spanMsg = document.querySelector('#flagColumn' + id);
    
    if (spanMsg.hasChildNodes) { // ADDED THIS LINE TO DAVE'S CODE
        for (var node of spanMsg.children) {
            spanMsg.removeChild(node);
        };
    } // ADDED THIS LINE TO DAVE'S CODE
}

function displayCorrectMessage(id) {
    'use strict';
  
    var element = document.getElementById('flagColumn' + id);       
    var newImg = document.createElement('img');

    // Create the image
    newImg.setAttribute("src", "images/greenFlag.png");
    newImg.setAttribute("width", "20");
    newImg.setAttribute("height", "20");
    newImg.classList.add('correct');

    // Add the image to the span
    element.appendChild(newImg);
}

function displayErrorMessage(id) {
    'use strict';
  
    var element = document.getElementById('flagColumn' +id);
    var newImg = document.createElement('img');
     
    // Create the image
    newImg.setAttribute("src", "images/skull.png");
    newImg.setAttribute("width", "20");
    newImg.setAttribute("height", "20");
    newImg.classList.add('error');
    
    // Add the image to the span 
    element.appendChild(newImg);
}
