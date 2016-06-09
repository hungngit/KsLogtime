(function (app) {
	'use strict';
	app.directive('notYetLogTime', notYetLogTime);
	notYetLogTime.$inject = ['$filter'];

	function notYetLogTime($filter) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'app/components/hourByUser/notYetLogTime.html',
			link: function(scope, element, attrs){
				scope.$watch(attrs.value, function (value){
					scope.notYetLogTimeUser = $filter('filter')(value, {hours:0});
				});
			}
		}
	}

})(angular.module('redmineLogtime'));