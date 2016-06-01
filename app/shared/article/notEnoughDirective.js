(function (app) {
	'use strict';
	app.directive('onLastRepeat', onLastRepeat);

	function onLastRepeat() {
		return function($scope, $element, $attrs) {
			/*if ($scope.$last) {
				setTimeout(function(){
					angular.forEach($scope.warningTime, function(hours, devId){
						if (hours < 8){
							$('.dev' + devId).css('background', 'red');
						}
					});
				}, 1);
			}*/
		};
	}
})(angular.module('redmineLogtime'));