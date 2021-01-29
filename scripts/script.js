/*

let allElements = document.getElementsByTagName("*");
let borderToggle = false;


function allBorders() {

    if (borderToggle) {
        for (let i = 0; i < allElements.length; i++) {
            allElements[i].style.border = `none`;
        }
        borderToggle = false;
    } else if (!borderToggle) {
        for (let i = 0; i < allElements.length; i++) {
        allElements[i].style.border = `1px solid gainsboro`;
        borderToggle = true;
        }
    }  
}

console.log(document.getElementById("title-container").scrollHeight);

/* Moveable navigation bar, depending on scroll position 
window.addEventListener('scroll', function() {
    let navbarOpacity = (this.pageYOffset - 198) / 300; // 0 --> 1 
    let logobarOpacity = 1; 
    $("#navbar-template").css("opacity", navbarOpacity); 
    $("#logobar").css("opacity", (logobarOpacity - navbarOpacity * 1.2))
  });

  */
 
   
    function start() {
        // 2. Initialize the JavaScript client library.
        gapi.client.init({
        'apiKey': 'AIzaSyDs-IR5i9SkUR_uxSR5LbWramUbZ_i1fxY',
        // Your API key will be automatically added to the Discovery Document URLs.
        'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
        // clientId and scope are optional if auth is not required.
        'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
        'scope': 'profile',
        }).then(function() {
        // 3. Initialize and make the API request.
        return gapi.client.people.people.get({
            'resourceName': 'people/me',
            'requestMask.includeField': 'person.names'
        });
        }).then(function(response) {
        console.log(response.result);
        }, function(reason) {
        console.log('Error: '/* + reason.result.error.message*/);
        });
    };

    // 1. Load the JavaScript client library.
    setTimeout(function() {
        gapi.load('client', start);
    }, 1000);
