(function (app) {
	'use strict';
	app.factory('homeService', homeService);

	homeService.$inject = ['$q', 'apiService'];

	function homeService($q, apiService) {
		var config = {headers: {'X-Redmine-API-Key' : '58e93bc79d51bd7052a09ed5bc8597e851fb2e6d'}};
		var homeService = {
			getTimeEntries: getTimeEntries
		}
		
		var spentOn = 'm';
		var timeEntriesUrl = 'http://14.161.22.172:3000/time_entries.json?f[]=spent_on&op[spent_on]=' + spentOn + '&f[]=user_id&op[user_id]==&v[user_id][]=56&v[user_id][]=54&v[user_id][]=35&v[user_id][]=25&v[user_id][]=38&v[user_id][]=12&v[user_id][]=34&v[user_id][]=23&f[]=&c[]=project&c[]=spent_on&c[]=user&c[]=activity&c[]=issue&c[]=comments&c[]=hours';
		var issueUrl = 'http://14.161.22.172:3000/issues/{0}.json'
		var spentTimeAll = {};
		function getTimeEntries() {
			apiService.get(timeEntriesUrl).then(function (data){
				
				var time_entries = data.time_entries;
				getSpentTimeAll(time_entries).then(function (data){
					console.log('----------------- All resolved');
					console.log(data);
				});
			});
		}

		function getSpentTimeAll(time_entries){
			var promises = [];

			time_entries.map(function(timeEntry){
				promises.push(getIssueInfo(timeEntry));
			});
			
			return $q.all(promises);
		}

		function getIssueInfo(timeEntry, _i){
			var d = $q.defer();
			
			(function loadIssue(id){
				apiService.get(issueUrl.replace('{0}', id)).then(function(data){
					var issue = data.issue;
					var ksLink = '';					
					if ('CodingPhase' == issue.tracker.name){
						timeEntry.issue.id = issue.parent.id;
						return loadIssue(timeEntry.issue.id);
					}

					if('Change' == issue.tracker.name ||
						'Task' == issue.tracker.name){
						angular.forEach(issue.custom_fields, function(field, i){
							if ('KS_Link' == field.name){
								ksLink = field.value;
								if (ksLink.indexOf('a02') < 0 && 'Task' != issue.tracker.name){
									timeEntry.issue.id = issue.parent.id;
									return loadIssue(timeEntry.issue.id);
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
					d.resolve(spentTime);
					return d.promise;
				});

			})(timeEntry.issue.id);
			return d.promise;
		}

		return homeService;
	}

})(angular.module('redmineLogtime'))