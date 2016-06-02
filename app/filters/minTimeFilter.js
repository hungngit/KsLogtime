(function (app) {
	'use strict';

	app.filter('minTime', minTime);

	function minTime(){
		return function(hourByUser, minHours) {
			var hourByUserFilter = [];
			angular.forEach(hourByUser, function(user, i) {
				if (user.hours != 0 && user.hours < minHours) {
					hourByUserFilter.push(user);
				}
			});
			return hourByUserFilter;
		}
	}

})(angular.module('redmineLogtime'));