(function (app) {
	'use strict';

	app.controller('homeController', homeController);
	homeController.$inject = ['$scope', 'apiService'];

	function homeController($scope, apiService) {
		var config = {headers: {'X-Redmine-API-Key' : '58e93bc79d51bd7052a09ed5bc8597e851fb2e6d'}};
		var test = apiService.get('http://14.161.22.172:3000//time_entries.json', config, null, null);
		console.log(test);
	}

})(angular.module('redmineLogtime'));