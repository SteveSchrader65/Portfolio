/* jshint esversion: 6 */

// Declare global variables
var formStatus = false;
const countryBox = document.querySelector("select");
const submitButton = document.querySelector("#enlist-button");
const success_message = document.querySelector("#registered");

// Function to load local and session variables
function sessionLoad() {
    'use strict';

    var localValues = ["pirateName", "piratePort"];
    var sessionValues = ["firstName", "lastName", "email"];

    // Load local and session variables into previously completed form
    localValues.forEach(function(storedAttribute) {
        if (localStorage.getItem(storedAttribute) != null) {
            document.querySelector('#' + storedAttribute).value = localStorage.getItem(storedAttribute);    
        }
    })

    sessionValues.forEach(function(storedAttribute) {
        if (sessionStorage.getItem(storedAttribute) != null) {
            document.querySelector('#' + storedAttribute).value = sessionStorage.getItem(storedAttribute);    
        }
    })

    if (sessionStorage.getItem("country") != null) {
        countryBox.selectedIndex = parseInt(sessionStorage.getItem("country"));
    } else {
        countryBox.selectedIndex = 0;
    }

    if (localStorage.getItem("pirateWeapon") != null) {
        document.querySelector('#weaponGrid input[value=\"' + localStorage.getItem("pirateWeapon") + '\"]').checked = true;    
    }
} 












// Function to validate form input fields
function validateForm() {
	'use strict';
	
	let status = true;
    
	/* Validate first name - must start with upper-case letter, followed by a maximum of
	20 additional upper- or lower-case letters. Can contain one apostrophe or hyphen 
	after first letter, followed by at least one more letter */
    if (document.querySelector('#firstName').value != sessionStorage.getItem("firstName")) {   
        if ((/^[A-Z][A-Za-z]{1,20}['-]?[A-Za-z]{1,20}$/).test(firstName.value)) {
            U.good('firstName');
            sessionStorage.setItem("firstName", firstName.value);
        } else {
            U.bad('firstName');
            status = false;
        }
    }

	/* Validate last name - as per first name, but may start with lower-case letter. Can be between
	2 and 25 letters in length. Can contain one hyphen or apostrophe */
    if (document.querySelector('#lastName').value != sessionStorage.getItem("lastName")) {   

        if ((/^[A-Z'-]{2,25}['-]?$/i).test(lastName.value)) {
            U.good('lastName');
            sessionStorage.setItem("lastName", lastName.value);
            } else {
            U.bad('lastName');
            status = false;
        }
    }

	// Validate pirate name - as per first name, but may include space.  
	    if (document.querySelector('#pirateName').value != sessionStorage.getItem("pirateName")) {   
            if ((/^[A-Z][A-Za-z ]{1,20}['-]?[A-Za-z ]{1,20}$/).test(pirateName.value)) {
            U.good('pirateName');
            sessionStorage.setItem("pirateName", pirateName.value);
            } else {
            U.bad('pirateName');
            status = false;
        }
    }

    // Validate home port - as per first name.  
    if (document.querySelector('#piratePort').value != sessionStorage.getItem("piratePort")) {   

        if ((/^[A-Z][A-Za-z ]{1,20}['-]?[A-Za-z ]{1,20}$/).test(piratePort.value)) {
            U.good('piratePort');
            sessionStorage.setItem("piratePort", piratePort.value);
        } else {
            U.bad('piratePort');
            status = false;
        }
    }

	// Validate country selection - confirm that a selection has been made.
    if (countryBox.selectedIndex != sessionStorage.getItem("country")) {
        if (countryBox.selectedIndex != 0) {
            U.good('country');
            sessionStorage.setItem("country", countryBox.selectedIndex);
        } else {
            U.bad('country');
            status = false;
        }
    }

	// Validate e-mail address - allows for two-level domain names.
    if (document.querySelector('#email').value != sessionStorage.getItem("email")) {   

        if ((/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,5})$/i).test(email.value)) {
            U.good('email');
            sessionStorage.setItem("email", email.value);
        } else {
            U.bad('email');
            status = false;
        }
    }

    // Check weapon selection
    if (document.querySelector('input[name="weapon"]:checked').value != localStorage.getItem("pirateWeapon")) {
        sessionStorage.setItem("pirateWeapon", document.querySelector('input[name="weapon"]:checked').id);
    }


    // CHECK IF textArea.value == NULL (OR NOT)


    return status;

}





// Function to handle Register button being pressed
function pressButton(e) {
	'use strict';

	e.preventDefault();

	// Validate all field inputs and determine if form is correctly filled
	formStatus = validateForm();

	if (formStatus) {

        // Display success message
        success_message.style.visibility = "visible";
    
        // Create local storage pirate variables
        localStorage.setItem("pirateName", pirateName.value);
        localStorage.setItem("piratePort", piratePort.value);
        localStorage.setItem("pirateWeapon", document.querySelector('input[name="weapon"]:checked').value);

        setTimeout(function() {
            success_message.style.visibility = "hidden";
        
            // Reset form for re-submission
            resetForm();
        }, 5000);

        submitButton.style.backgroundColor = "#00FF00";
        return true;
    }

	// Exit with form in current state
	return false;
}

// Function to reset the form after successful submission
function resetForm() {
	'use strict';

	var labels = document.querySelectorAll(".input-field");

	// Reset Booleans
	formStatus = false;

    // Reset labels to original colour, clear input fields and remove 'correct' spans
	for (let i = 0; i < labels.length; i++) {
		labels[i].style.color = "#000";
        labels[i].nextElementSibling.nextElementSibling.remove();
	}

    // Clear textarea
    document.querySelector("textarea").value = '';  

	// Reset buttons to original colour
	submitButton.style.backgroundColor = "#FF0000";
}

// Onload initialization function
window.onload = function() {
	'use strict';

	var inputFields = document.querySelectorAll("input");

	// Establish event-listener for SUBMIT button
	submitButton.addEventListener("click", pressButton);

	// Establish event-listeners to clear any input field on double-click 
	for (let i = 0; i < inputFields.length; i++) {
		inputFields[i].addEventListener("dblclick", function() {
			inputFields[i].value = '';
		});
	}

    document.querySelector("textarea").addEventListener("dblclick", function() {
        document.querySelector("textarea").value = '';
    });
    
    sessionLoad();
}
