(function (app) {
	'use strict';
	app.config(config);
	config.$inject = ['$routeProvider', '$httpProvider'];

	function config($routeProvider, $httpProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'app/home/homeView.html',
				controller: 'homeController',
				controllerAs: 'h'
			}).otherwise({ redirectTo: "/" });;
	}
})(angular.module('redmineLogtime', ['ngRoute']));