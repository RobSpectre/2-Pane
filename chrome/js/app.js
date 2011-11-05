/*
 * Reader Repaired - Content Script
 *
 * This is the primary JS file that toggles the top navigation elements in
 * Google Reader.
 *
 */

// Define top navigation divs
var topNavigation = new Array();
topNavigation.push($('#top-bar'));
topNavigation.push($('#1hn-add-subscription-section'));
topNavigation.push($('#sections-header'));
topNavigation.push($('#viewer-header'));
topNavigation.push($('#viewer-top-controls'));


function hideNavigation(topNavigation) {
    console.log("Hiding Google Reader top navigation...");
    for(var div in topNavigation) {
        console.log("Hiding element: " + topNavigation[div]);
        if (topNavigation[div]) {
            topNavigation[div].slideUp("fast");
        }
    }
}

function showNavigation(topNavigation) {
    console.log("Showing Google Reader top navigation...");
    for(var div in topNavigation) {
        console.log("Showing element: " + topNavigation[div]);
        if (topNavigation[div]) {
            topNavigation[div].slideDown("fast");
        }
    }
}

if (topNavigation) {
    console.log("Applying current settings to Google Reader page...");
    console.log(topNavigation);
    chrome.extension.sendRequest({method: "loadOptions"}, function(response) {
        console.log("Option saved is: " + response.options);
        if (response.options == false) {
            console.log("Option off - doing nothing.");
        } else {
            hideNavigation(topNavigation);
        } 
    });    
}
