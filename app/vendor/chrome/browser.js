;(function (window) {
	var app = window.app = window.app || {};

	app.browser = {
		name: 'Chrome',

		getBackgroundPage: function(cb) {
			return chrome.runtime.getBackgroundPage(cb);
		},

		createTabs: function(url, tabId) {
			return chrome.tabs.query({
				active: true
			}, function(tabs) {
				var index = tabs[0].index;
				chrome.tabs.create({
					url: url,
					openerTabId: tabId,
					selected: false,
					index: index + 1
				});
			});
		},

	};
})(window);
