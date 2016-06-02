var commonUtils = (function($){
	return {
		blockUI: blockUI,
		unblockUI: unblockUI
	}

	function blockUI(){
		$.blockUI({ message: null });
	}

	function unblockUI(){
		$.unblockUI();
	}
}(jQuery));