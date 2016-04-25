(function (app) {
	'use strict';

	app.controller('homeController', homeController);
	homeController.$inject = ['$scope', '$q', 'homeService'];
	
	function homeController($scope, $q, homeService) {
		this.test = 'Test from controller';
		homeService.getTimeEntries().then(function (timeEntries){
			console.log(timeEntries);
		});
	}

})(angular.module('redmineLogtime'));