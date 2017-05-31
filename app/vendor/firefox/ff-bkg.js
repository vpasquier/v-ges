var tabUrl;

function disableIcon(tabId) {
    chrome.browserAction.setIcon({
        path: {
            '16': '../images/v-grey-16.png',
            '19': '../images/v-grey-19.png',
            '32': '../images/v-grey-32.png',
            '38': '../images/v-grey-38.png'
        }, tabId: tabId
    });
}

function enableIcon(tabId) {
    chrome.browserAction.setIcon({
        path: {
            '16': '../images/v-16.png',
            '19': '../images/v-19.png',
            '32': '../images/v-32.png',
            '38': '../images/v-38.png'
        }, tabId: tabId
    });
}

function pageAction(tabInfo) {
    disableIcon();
    chrome.browserAction.disable(tabInfo.id);
    tabUrl = tabInfo.url;
    enableIcon();
    chrome.browserAction.enable(tabInfo.id);
    return;
}

function getInfoForTab(tabs) {
    if (tabs.length > 0) {
        chrome.tabs.get(tabs[0].id, pageAction);
    }
}

function onChange(tabInfo) {
    chrome.tabs.query({lastFocusedWindow: true, active: true}, getInfoForTab);
};

var target = "<all_urls>";
chrome.webRequest.onCompleted.addListener(onChange, {urls: [target]});
chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, pageAction);
});
