// Shortcuts
chrome.commands.onCommand.addListener(function (command) {
    chrome.tabs.update({'url': 'http://chromium.org' + command}, function (tab) {
    });
});

// Omnibox
chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
    text = text.replace(' ', '');
    var suggestions = [];
    suggestions.push({content: 'Search with DuckDuckGo: ' + text, description: 'https://duckduckgo.com/?q=' + text});
    chrome.omnibox.setDefaultSuggestion({description: suggestions[0].description});
    suggestions.shift();
    suggest(suggestions);
});

chrome.omnibox.onInputEntered.addListener(function (text) {
    navigate('https://duckduckgo.com/?q=' + text + '&ia=web');
});

function navigate(url) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.update(tabs[0].id, {url: url});
    });
}
