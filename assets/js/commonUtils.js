var commonUtils = (function($){
	return {
		blockUI: blockUI,
		unblockUI: unblockUI
	}

	function blockUI(){
		$.blockUI({ 
			message: '<img src="/assets/img/trollfaceship.gif"/>', 
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