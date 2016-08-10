/*global tau */
/*jslint unparam: true */
(function(){
	var page = document.querySelector("#tabsectionchangerPage"),
		popup = page.querySelector("#moreoptionsPopup"),
		handler = page.querySelector(".ui-more"),
		clickHandlerBound;

	function clickHandler(event) {
		
			tau.openPopup(popup);
		
	}

	page.addEventListener( "pagebeforeshow", function() {
		clickHandlerBound = clickHandler.bind(null);
		handler.addEventListener("click", clickHandlerBound);
		
	});

	page.addEventListener( "pagebeforehide", function() {
		handler.removeEventListener("click", clickHandlerBound);
		
	});

	/*
	 * When user click the indicator of Selector, drawer will close.
	 */
	elSelector.addEventListener("click", function(event) {
		var target = event.target;

	});
}());
