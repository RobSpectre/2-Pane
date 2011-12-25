/*
 * Reader Repaired - Content Script
 *
 * This is the primary JS file that toggles the top navigation elements in
 * Google Reader.
 *
 */

// Define top navigation divs
function getNavigation() {
    var navigation = new Array();
    navigation.push($('#top-bar'));
    navigation.push($('#1hn-add-subscription-section'));
    navigation.push($('#sections-header'));
    navigation.push($('#viewer-header'));
    navigation.push($('#viewer-top-controls'));
    return navigation;
}

function hideNavigation() {
    var topNavigation = getNavigation();
    console.log("Hiding Google Reader top navigation...");
    for(var div in topNavigation) {
        if (topNavigation[div]) {
            topNavigation[div].slideUp("fast");
        }
    }
}

function showNavigation() {
    var topNavigation = getNavigation();
    console.log("Showing Google Reader top navigation...");
    for(var div in topNavigation) {
        if (topNavigation[div]) {
            topNavigation[div].slideDown("fast");
        }
    }
}

// Check local settings and filter appropriately.
var topNavigation = getNavigation();
if (topNavigation) {
    console.log("Applying current settings to Google Reader page...");
    console.log(topNavigation);
    chrome.extension.sendRequest({method: "loadOptions"}, function(response) {
        console.log("Option saved is: " + response.hidden);
        if (response.hidden == "false" || response.hidden == undefined) {
            console.log("Option off - doing nothing.");
        } else {
            hideNavigation();
        } 
    });    
}

// Receive messages from popup.
chrome.extension.onRequest.addListener( function(request, sender, sendResponse) {
    console.log("Message received to content script.");
    if (request.method == "showNavigation") {
        console.log("Received showNavigation message.");
        showNavigation();
        var response_message = "Executed showNavigation.";
    } else if (request.method == "hideNavigation") {
        console.log("Received hideNavigation messages.");
        hideNavigation();
        var response_message = "Executed hideNavigation.";
    } else {
        console.log("Received unknown message: " + request.method);
        var response_message = "Did not understand message.";
    }
    sendResponse({response: response_message});
});
