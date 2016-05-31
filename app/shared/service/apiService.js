(function (app) {
	'use strict';

	app.factory('apiService', apiService);

	apiService.$inject = ['$rootScope', '$http', '$q'];
	
	/**
	 * Represents a Api Service.
	 * Helps to handle all api call
	 */
	function apiService($rootScope, $http, $q) {
		var service = {
			get: get,
			post: post
		};
		var config = $rootScope.headerConfig;
		var proxyUrl = '//nodejsproxy.herokuapp.com/proxy?url=';
		// Handle all get requests
		function get(url) {
			url = proxyUrl + encodeURI(url);
			return $q(function (success, failure) {
				$http.get(url, config)
					.then(function (result) {
						success && success(result.data);
					}, failure);
			});
		}
		
		// Handle all post requests
		function post(url, data) {
			url = proxyUrl + encodeURI(url);
			return $q(function (success, failure) {
				$http.post(url, data, config)
					.then(success, failure);
			});
		}

		return service;
	}

})(angular.module('redmineLogtime'));