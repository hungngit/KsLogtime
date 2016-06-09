(function (app) {
	'use strict';
	app.directive('notEnoughTime', notEnoughTime);
	notEnoughTime.$inject = ['$filter'];

	function notEnoughTime($filter) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'app/components/hourByUser/notEnoughTime.html',
			link: function(scope, element, attrs){
				scope.$watch(attrs.value, function (value){
					scope.notEnoughTimeUser = $filter('minTime')(value, 8);
				});
			}
		}
	}

})(angular.module('redmineLogtime'));