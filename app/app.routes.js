(function () {
	'use strict';
	angular.module('app.routes', [
		'app.module'
	]).config(config);
	config.$inject = ['$routeProvider', '$locationProvider'];

	function config($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'app/home/homeView.html',
				controller: 'homeController',
				controllerAs: 'h'
			}).otherwise({ redirectTo: "/" });;
		$locationProvider.html5Mode(true);
	}
})();