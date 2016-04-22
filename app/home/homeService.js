(function (app) {
	'use strict';
	app.factory('homeService', homeService);

	homeService.$inject = ['$q', 'apiService'];

	function homeService($q, apiService) {
		var config = {headers: {'X-Redmine-API-Key' : '58e93bc79d51bd7052a09ed5bc8597e851fb2e6d'}};
		var homeService = {
			getTimeEntries: getTimeEntries
		}
		
		var spentOn = 't';
		var timeEntriesUrl = 'http://14.161.22.172:3000/time_entries.json?f[]=spent_on&op[spent_on]=' + spentOn + '&f[]=user_id&op[user_id]==&v[user_id][]=56&v[user_id][]=54&v[user_id][]=35&v[user_id][]=25&v[user_id][]=38&v[user_id][]=12&v[user_id][]=34&v[user_id][]=23&f[]=&c[]=project&c[]=spent_on&c[]=user&c[]=activity&c[]=issue&c[]=comments&c[]=hours';
		var issueUrl = 'http://14.161.22.172:3000/issues/{0}.json'
		function getTimeEntries() {
			apiService.get(timeEntriesUrl).then(function (data){
				
				var time_entries = data.time_entries;

				console.log(getSpentTimeAll(time_entries));
			});
		}

		function getSpentTimeAll(time_entries){
			//var spentTimeAll = {};
			var deferred = $q.defer();
			var promises = [];

			angular.forEach(time_entries, function(timeEntry, i){
				promises.push(getIssueInfo(timeEntry, i));
			});
			$q.all(promises).then(
				function(timeEntry, i) {
					deferred.resolve(timeEntry, i) ;
				},
				function(errors) {
					deferred.reject(errors);
				},
				function(updates) {
					deferred.update(updates);
			});
			return deferred.promise;
		}

		function getIssueInfo(timeEntry, _i){

			console.log('----------------- ' + _i + ' ******');
			// Creates a Deferred object
			var deferred = $q.defer();
			apiService.get(issueUrl.replace('{0}', timeEntry.issue.id)).then(function(data){
				var issue = data.issue;
				var ksLink = '';
				
				if ('CodingPhase' == issue.tracker.name){
					timeEntry.issue.id = issue.parent.id;
					console.log('----------------- ' + _i + ' CodingPhase');
					return getIssueInfo(timeEntry, _i);
				}

				if('Change' == issue.tracker.name ||
					'Task' == issue.tracker.name){
					console.log('----------------- ' + _i + ' Task');
					angular.forEach(issue.custom_fields, function(field, i){
						if ('KS_Link' == field.name){
							ksLink = field.value;
							if (ksLink.indexOf('a02') < 0 && 'Task' != issue.tracker.name){
								timeEntry.issue.id = issue.parent.id;
								console.log('----------------- ' + _i + ' Change');
								return getIssueInfo(timeEntry, _i);
							}
						}
					});
				}

				if ('★★Research&Training★★' == issue.tracker.name){
					ksLink = 'https://ap.salesforce.com/a021000001824AJ';
				}

				var spentTime = {
					issueId: timeEntry.issue.id,
					issueName: issue.subject,
					ksLink: ksLink,
					DevName: timeEntry.user.name,
					activity: timeEntry.activity.name,
					hours: timeEntry.hours,
					date: timeEntry.spent_on
				};
				console.log('----------------- ' + _i + ' ########');
				deferred.resolve(spentTime);
				return deferred.promise;
			});
		}

		function getTimeEntriesData(result) {
			var viewObj = {};
			var time_entries = result.data.time_entries;

			angular.forEach(time_entries, function(data, i){
				viewObj[i] = {
					issueId: data.issue.id,
					issueName: '',
					ksLink: '',
					DevName: data.user.name,
					activity: data.activity.name,
					hours: data.hours,
					date: data.spent_on
				};
			});
		}

		return homeService;
	}

})(angular.module('redmineLogtime'))