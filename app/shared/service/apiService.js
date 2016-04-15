(function (app) {
	'use strict';

	app.factory('apiService', apiService);

	apiService.$inject = ['$http'];
	
	/**
	 * Represents a Api Service.
	 * Helps to handle all api call
	 */
	function apiService($http) {
		var service = {
			get: get,
			post: post
		};
		var config = {headers: {'X-Redmine-API-Key' : '58e93bc79d51bd7052a09ed5bc8597e851fb2e6d'}};
		var proxyUrl = '//nodejsproxy.herokuapp.com/proxy?url=';
		// Handle all get requests
		function get(url, success, failure) {
			return $http.get(proxyUrl + encodeURI(url), config)
					.then(function (result) {
						success(result);
					}, function (error) {
						
						if (error.status == '404') {
							//notificationService.displayError(messageService.ApiServiceNotFound);
						} else if (failure != null) {
							failure(error);
						}
					});
		}
		
		// Handle all post requests
		function post(url, data, success, failure) {
			return $http.post(proxyUrl + encodeURI(url), data)
					.then(function (result) {
						//success(result);
					}, function (error) {
						if (error.status == '404') {
							//notificationService.displayError(messageService.ApiServiceNotFound);
						}
						else if (failure != null) {
							//failure(error);
						}
					});
		}

		return service;
	}

})(angular.module('redmineLogtime'));