/* =============================================================================

    BUILD IFRAME

============================================================================= */

// Get the chapter number from URL
var id = getParameter('id');

// If chapter number is not empty, fetch the chapter content
if ( id != '' & id != null ) {
	fetch('https://public-api.wordpress.com/rest/v1.1/sites/vincascalvii.wordpress.com/posts/' 
		+ id + '?fields=ID,title,content')

	// Validate the response and return it as JSON
	.then( function(response) {
		if (!response.ok) throw new Error("HTTP error " + response.status);
	    return response.json();
	})

	// Check if data exists
	.then( function(data) {

			// Get the chapter number and name
			var number = data[0]['title'].split(' ')[0];
			var name = data[0]['title'].split(' ')[1];

			// Populate the header navigation
			document.querySelector('#chap-number').innerText = number;
			document.querySelector('#chap-name').innerText = name;

			// Generate the chapter content in HTML
			document.querySelector('#main').innerHTML = data[0]['content'];

			// Generate the title and meta description
			document.querySelectorAll('title')[0].content = 
				'Chapter ' + number + ' - ' + name + ' | Freedom Cry - Web Novel - Calvin Lam';
			document.querySelector('meta[name="description"]').content =
				'Read Chapter ' + number + ', ' + name + 
				' from the fantasy web novel Freedom Cry on this site. ' +
				'Freedom Cry tells a story about the several adventures in a land named Valhalla.';

			// Get the current full URL
			var currentURL = window.location.href;

			// Populate Facebook OpenGraph metadata
			document.querySelector('meta[property="og:url"]').content = currentURL;
			document.querySelector('meta[property="og:title"]').content = 
				'Chapter ' + number + ' - ' + name + ' | Freedom Cry - Web Novel - Calvin Lam';
			document.querySelector('meta[property="og:description"]').content =
				'Read Chapter ' + number + ', ' + name + 
				' from the fantasy web novel Freedom Cry on this site. ' +
				'Freedom Cry tells a story about the several adventures in a land named Valhalla.';

			// Populate Twitter card metadata
			document.querySelector('meta[name="twitter:url"]').content = currentURL;
			document.querySelector('meta[name="twitter:title"]').content = 
				'Chapter ' + number + ' - ' + name + ' | Freedom Cry - Web Novel - Calvin Lam';
			document.querySelector('meta[name="twitter:description"]').content =
				'Read Chapter ' + number + ', ' + name + 
				' from the fantasy web novel Freedom Cry on this site. ' +
				'Freedom Cry tells a story about the several adventures in a land named Valhalla.';

	})

	// In case of error
	.catch( function(error) {
		console.log('Fetch error: ', error);
	});

	// Convert number to integer
	var prevID = getParameter('prev');
	var nextID = getParameter('next');

	// Generate previous chapter link if the user is at least on chapter number 2
	if ( prevID != '0' ) 
		document.querySelector('#nav-prev').href = '/freedom/chapter?id=' + prevID;
	else 
		document.querySelector('#nav-prev').classList.add('disabled');

	// Generate next chapter link unless the user is at the latest chapter
	if ( nextID != '0' ) 
		document.querySelector('#nav-next').href = '/freedom/chapter?number=' + nextID;
	else
		document.querySelector('#nav-next').classList.add('disabled');

} else {
	document.querySelector('#main').innerHTML = 
		'<p>Sorry! This chapter has not been released or does not exist.</p>';
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

document.querySelector('#copyright-year').innerHTML = new Date().getFullYear();

/* =============================================================================

    BACK TO TOP

============================================================================= */

document.querySelector('#back-to-top').addEventListener('click', function() {
	window.scrollTo({
		top: 0, 
		behavior: 'smooth'
	});
}, false);