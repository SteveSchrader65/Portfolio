/* Utilities File */
/* jshint esversion: 6 */

var U = {

    // Function for getting the document element
    $: function(id) {
        'use strict';

        if (typeof id == "string") {
            return document.querySelector(id);
        }
    },

	good: function(selector) {
		'use strict';

        var element = document.getElementById(selector);

		if (typeof element == "object") {
			(element).previousElementSibling.style.color = "#00CC00";
		}

        removeMessage(selector);
		displayCorrectMessage(selector);
    },

	bad: function(selector) {
		'use strict';
		
        var element = document.getElementById(selector);

		if (typeof element == "object") {
			(element).previousElementSibling.style.color = "#FF0000";
		}

        removeMessage(selector);
		displayErrorMessage(selector);
	},
};