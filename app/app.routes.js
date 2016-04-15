(function (app) {
	'use strict';
	app.config(config);
	config.$inject = ['$routeProvider', '$httpProvider', '$locationProvider'];

	function config($routeProvider, $httpProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'app/home/homeView.html',
				controller: 'homeController',
				controllerAs: 'h',
				factory: 'homeService'
			}).otherwise({ redirectTo: "/" });;
		$locationProvider.html5Mode(true);
	}
})(angular.module('redmineLogtime'));