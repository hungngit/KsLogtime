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
		var proxyUrl = '//nodejsproxy.herokuapp.com/proxy?url=';
		// Handle all get requests
        function get(url, config, success, failure) {
            return $http.get(proxyUrl + encodeURI(url), config)
                    .then(function (result) {
                        success(result);
                    }, function (error) {
                        
                        /*if (error.status == '404') {
                            //notificationService.displayError(messageService.ApiServiceNotFound);
                        }
                        else 
							if (failure != null) {
                            failure(error);
                        }*/
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

})(angular.module('common.core'));