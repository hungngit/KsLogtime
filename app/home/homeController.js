(function (app) {
	'use strict';

	app.controller('homeController', homeController);
	homeController.$inject = ['$scope', 'homeService'];
	
	function homeController($scope, homeService) {
		console.log(homeService.getTimeEntries());
	}

})(angular.module('redmineLogtime'));