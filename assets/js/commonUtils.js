var commonUtils = (function($){
	return {
		blockUI: blockUI,
		unblockUI: unblockUI
	}

	function blockUI(){
		var items = [1,2,3,4,5,6];
		var item = items[Math.floor(Math.random()*items.length)];
		$.blockUI({
			message: '<img style="max-width: 500px;" src="/assets/img/troll' + item + '.gif"/>',
			css: {
				top:  ($(window).height() - 400) /2 + 'px',
				left: ($(window).width() - 400) /2 + 'px',
				border: 0
			}
		});
	}

	function unblockUI(){
		$.unblockUI();
	}
}(jQuery));
