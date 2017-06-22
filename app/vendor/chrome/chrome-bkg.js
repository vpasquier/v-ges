// Shortcut: Cmd + I
chrome.commands.onCommand.addListener(function (command) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        var tab = tabs[0];
        console.log(tab);
        chrome.windows.create({'url': tab.url, 'incognito': true});
    });
});

// Omnibox - Type ('l' + space) for entering search in DuckDuckGo or else
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