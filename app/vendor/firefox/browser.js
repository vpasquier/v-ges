;(function (window, self) {
	var app = window.app = window.app || {};

	app.browser = {
		name: 'Firefox',

		getBackgroundPage: function(bkg) {
			return bkg(chrome.extension.getBackgroundPage());
		},

		createTabs: function(url, tabId) {
			return chrome.tabs.query({
				active: true
			}, function(tabs) {
				var index = tabs[0].index;
				return chrome.tabs.create({
					url: url,
					active: false,
					index: index + 1
				});
			});
		},

	};
})(window, self);