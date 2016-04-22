(function (app) {
	'use strict';

	app.factory('apiService', apiService);

	apiService.$inject = ['$http', '$q'];
	
	/**
	 * Represents a Api Service.
	 * Helps to handle all api call
	 */
	function apiService($http, $q) {
		var service = {
			get: get,
			post: post
		};
		var config = {headers: {'X-Redmine-API-Key' : '58e93bc79d51bd7052a09ed5bc8597e851fb2e6d'}};
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