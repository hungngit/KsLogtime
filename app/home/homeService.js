(function (app) {
	'use strict';
	app.factory('homeService', homeService);

	homeService.$inject = ['apiService'];

	function homeService(apiService) {
		var config = {headers: {'X-Redmine-API-Key' : '58e93bc79d51bd7052a09ed5bc8597e851fb2e6d'}};
		var homeService = {
			getTimeEntries: getTimeEntries
		}
		
		function getTimeEntries() {
			apiService.get('http://14.161.22.172:3000/time_entries.json?f[]=spent_on&op[spent_on]=t&f[]=user_id&op[user_id]==&v[user_id][]=56&v[user_id][]=54&v[user_id][]=35&v[user_id][]=25&v[user_id][]=38&v[user_id][]=12&v[user_id][]=34&v[user_id][]=23&f[]=&c[]=project&c[]=spent_on&c[]=user&c[]=activity&c[]=issue&c[]=comments&c[]=hours', getTimeEntriesData, null);
		}

		function getTimeEntriesData(result) {
			console.log(result.data.time_entries);
		}

		return homeService;
	}

})(angular.module('redmineLogtime'))