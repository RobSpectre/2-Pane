
function showPopup() {
    function Button() {
        button = document.createElement('a');
        button.setAttribute('href', '#');
        button.setAttribute('class', 'setting');
        return button;
    }

    var onButton = Button();
    onButton.appendChild(document.createTextNode("Repair"));
    var offButton = Button();
    offButton.setAttribute('onclick', 'hideNavigation()');
    console.log(onButton);

    document.body.appendChild(onButton);
    document.body.appendChild(offButton);

    $('.setting').click(function(e) {
        chrome.tabs.sendRequest(tab.id, {action:'start'}, function(response) {
            console.log('Start action sent');
        });
    }
}
