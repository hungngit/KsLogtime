(function (app) {
	'use strict';

	app.controller('homeController', homeController);
	homeController.$inject = ['$scope', 'homeService'];
	
	function homeController($scope, homeService) {
		//this.test = 'Test from controller';
		homeService.getTimeEntries().then(function (timeEntries){
			console.log(timeEntries);

			/*timeEntries = timeEntries.sort(function(a, b){
				a = parseInt(a.parentIssueId ? a.parentIssueId : 0);
				b = parseInt(b.parentIssueId ? b.parentIssueId : 0);
				return b - a;
			});
*/
			$scope.timeEntries = timeEntries;
		});
	}

})(angular.module('redmineLogtime'));