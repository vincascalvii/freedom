/* =============================================================================

    BUILD IFRAME

============================================================================= */

// Get the chapter number and name from URL
var number = getParameter('number');
var name = getParameter('name');

// If chapter number is not empty, fetch the chapter content
if ( number != '' & number != null ) {
	fetch('/freedom/data/' + number + '.json')
	.then( function(response) {
		if (!response.ok) throw new Error("HTTP error " + response.status);
	    return response.json();
	})
	.then( function(data) {
		if ( data ) document.getElementById('main').innerHTML = data[0]['html'];
	})
	.catch( function(error) {
		console.log('Fetch error: ', error);
	});
}

// If chapter number and name both exist, populate the values to below
if ( number != '' & number != null && name != '' && name != null ) {

	// Populate the header navigation
	document.getElementById('chap-number').innerText = number;
	document.getElementById('chap-name').innerText = name;

	// Get the current full URL
	var currentURL = window.location.href;

	// Populate Facebook OpenGraph metadata
	document.querySelector('meta[property="og:url"]').content = currentURL;
	document.querySelector('meta[property="og:title"]').content = 
		'Chapter ' + number + ' - ' + name + ' | Freedom Cry - Web Novel - Calvin Lam';
	document.querySelector('meta[property="og:description"]').content =
		'Read Chapter ' + number + ', ' + name + ' from the fantasy web novel Freedom Cry on this site. Freedom Cry tells a story about the several adventures in a land named Valhalla.';

	// Populate Twitter card metadata
	document.querySelector('meta[name="twitter:url"]').content = currentURL;
	document.querySelector('meta[name="twitter:title"]').content = 
		'Chapter ' + number + ' - ' + name + ' | Freedom Cry - Web Novel - Calvin Lam';
	document.querySelector('meta[name="twitter:description"]').content =
		'Read Chapter ' + number + ', ' + name + ' from the fantasy web novel Freedom Cry on this site. Freedom Cry tells a story about the several adventures in a land named Valhalla.';
}

/* =============================================================================

    GET PARAMETER

============================================================================= */

function getParameter() {

    var key = false, results = {}, item = null;

    // Get the query string without the "?"
    var qs = location.search.substring(1);

    // Check for the key as an argument
    if ( arguments.length > 0 && arguments[0].length > 1 ) key = arguments[0];

    // Make a regex pattern to grab key/value
    var pattern = /([^&=]+)=([^&]*)/g;

    // Loop the items in the query string,
    // Either find a match to the argument, 
    // Or build an object with key/value pairs
    while ( item = pattern.exec(qs) ) {
        if ( key !== false && decodeURIComponent(item[1]) === key ) {
            return decodeURIComponent(item[2]);
        } else if ( key === false ) {
            results[decodeURIComponent(item[1])] = decodeURIComponent(item[2]);
        }
    }

    return key === false ? results : null;
}

/* =============================================================================

    POPULATE YEAR

============================================================================= */

document.getElementById('copyright-year').innerHTML = new Date().getFullYear();

/* =============================================================================

    BACK TO TOP

============================================================================= */

document.getElementById('back-to-top').addEventListener('click', function() {
	window.scrollTo({
		top: 0, 
		behavior: 'smooth'
	});
}, false);