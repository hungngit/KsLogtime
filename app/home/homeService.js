(function (app) {
	'use strict';
	app.controller('homeController', homeController);

	homeController.$inject = ['$scope'];

	function homeController($scope) {
		console.log('ccccccccccc');
	}

})(angular.module('redmineLogtime'))