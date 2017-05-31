var tabUrl;

function pageActionOnGES(tabInfo) {
    chrome.pageAction.show(tabInfo.id);
    return;
}

function getInfoForTab(tabs) {
    if (tabs.length > 0) {
        chrome.tabs.get(tabs[0].id, pageActionOnGES);
    }
}

function onChange(tabInfo) {
    chrome.tabs.query({lastFocusedWindow: true, active: true}, getInfoForTab);
};

var target = '<all_urls>';
chrome.webRequest.onCompleted.addListener(onChange, {urls: [target]});
chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, pageActionOnGES);
});
