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
		var timeEntriesUrl = 'http://14.161.22.172:3000/time_entries.json?f[]=spent_on&op[spent_on]=' + spentOn + '&f[]=user_id&op[user_id]==&v[user_id][]=56&v[user_id][]=60&v[user_id][]=54&v[user_id][]=35&v[user_id][]=25&v[user_id][]=38&v[user_id][]=12&v[user_id][]=34&v[user_id][]=23&f[]=&c[]=project&c[]=spent_on&c[]=user&c[]=activity&c[]=issue&c[]=comments&c[]=hours';
		var issueUrl = 'http://14.161.22.172:3000/issues/{0}.json'
		
		function getTimeEntries() {
			var d = $q.defer();
			apiService.get(timeEntriesUrl).then(function (data){
				getSpentTimeAll(data.time_entries).then(function (timeEntries){
					// Sort and group --- Start
					/*var result = timeEntries.reduce(function(timeEntryMap, timeEntry) {
						//console.log(timeEntry);
						var key = timeEntry.childIssue + '-' + timeEntry.ksLink + '-' + timeEntry.date + '-' + timeEntry.devId;
						//console.log('-----------------');
						//console.log(key);
						if (!(key in timeEntryMap))
							timeEntryMap.__array.push(timeEntryMap[key] = timeEntry);
						else {
							timeEntryMap[key].hours += timeEntry.hours;
							//console.log(key);
						}
						//console.log(timeEntryMap);
						return timeEntryMap;
					}, {__array:[]}).__array.sort(function(a,b) { 
						return a.devId - b.devId; 
					});*/
					// Sort --- End

					d.resolve(timeEntries);
				});
			});
			return d.promise;
		}

		function getSpentTimeAll(time_entries){
			var promises = [];
			time_entries.map(function(timeEntry){
				promises.push(getIssueInfo(timeEntry));
			});
			
			return $q.all(promises);
		}

		function getIssueInfo(timeEntry){
			var d = $q.defer();
			var childIssue = [];
			(function loadIssue(id){
				apiService.get(issueUrl.replace('{0}', id)).then(function(data){
					var issue = data.issue, 
						ksLink = '';
					childIssue.push({issueId: issue.id, issueName: issue.subject});
					if ('CodingPhase' == issue.tracker.name){
						return loadIssue(issue.parent.id);
					}

					if('Task' == issue.tracker.name ||
						'Change' == issue.tracker.name ||
						'Bug' == issue.tracker.name){
						angular.forEach(issue.custom_fields, function(field, i){
							if ('KS_Link' == field.name){
								ksLink = field.value;
								if (ksLink.indexOf('/a02') < 0 && 'Task' != issue.tracker.name){
									console.log(issue.parent.id);
									return loadIssue(issue.parent.id);
								}
							}
						});
					}

					if ('★★Research&Training★★' == issue.tracker.name){
						ksLink = 'https://ap.salesforce.com/a021000001824AJ';
					}
					console.log(ksLink);
					var spentTime = {
						issueId: timeEntry.issue.id,
						issueName: issue.subject,
						ksLink: ksLink,
						devId: timeEntry.user.id,
						devName: timeEntry.user.name,
						activity: timeEntry.activity.name,
						hours: timeEntry.hours,
						date: timeEntry.spent_on,
						childIssue: childIssue
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