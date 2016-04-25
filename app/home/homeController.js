(function (app) {
	'use strict';

	app.controller('homeController', homeController);
	homeController.$inject = ['$scope', 'homeService'];
	
	function homeController($scope, homeService) {
		//this.test = 'Test from controller';
		homeService.getTimeEntries().then(function (timeEntries){
			console.log(timeEntries);
			$scope.timeEntries = timeEntries;
		});
	}

})(angular.module('redmineLogtime'));