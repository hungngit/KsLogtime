(function (app) {
	'use strict';
	app.directive('onLastRepeat', onLastRepeat);

	function onLastRepeat() {
		return function(scope) {
			if (scope.$last) {
				setTimeout(function(){
					commonUtils.unblockUI();
				}, 1);
			}
		}
	}

})(angular.module('redmineLogtime'));