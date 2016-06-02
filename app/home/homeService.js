(function (app) {
	'use strict';
	app.factory('homeService', homeService);

	homeService.$inject = ['$rootScope', '$q', 'apiService'];

	function homeService($rootScope, $q, apiService) {
		var homeService = {
			getTimeEntries: getTimeEntries
		}
		
		var timeEntriesUrl = $rootScope.timeEntriesUrl;
		var issueUrl = $rootScope.issueUrl;
		
		function getTimeEntries(spentOn, userMap) {

			var userFilter = $rootScope.userFilter;
			var userIds = userMap ? Object.keys(userMap) : null;

			if (!spentOn){
				spentOn = $rootScope.defaultSpentOn;
			}
			
			if (spentOn.length == 10){
				spentOn = $rootScope.spentOnOption1 + spentOn;
			}
			timeEntriesUrl = timeEntriesUrl.replace('{0}', spentOn);

			if (userIds){
				for (var i = 0; i < userIds.length; i++){
					userFilter += $rootScope.userFilterId + userIds[i];
				}
				timeEntriesUrl = timeEntriesUrl.replace('{1}', userFilter);
			}

			var d = $q.defer();
			apiService.get(timeEntriesUrl).then(function (data){
				getSpentTimeAll(data.time_entries).then(function (timeEntries){
					// Sort and group --- Start
					var timeEntriesGroup = timeEntries.reduce(function(timeEntryMap, timeEntry) {
						var key = timeEntry.devId + '-'
								+ timeEntry.issueId + '-'
								+ timeEntry.date + '-'
								+ timeEntry.ksLink;
						
						if (!(key in timeEntryMap))
							timeEntryMap.__array.push(timeEntryMap[key] = timeEntry);
						else {
							timeEntryMap[key].hours += timeEntry.child[0].hours;
							timeEntryMap[key].child.push(timeEntry.child[0]);
						}
						return timeEntryMap;
					}, {__array:[]}).__array.sort(function(a,b) { 
						return a.devId - b.devId; 
					});
					// Sort --- End
					d.resolve(timeEntriesGroup);
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
			
			var spentTime = {
				devId: timeEntry.user.id,
				devName: timeEntry.user.name,
				issueId: timeEntry.issue.id,
				issueName: null,
				trackerName: null,
				date: timeEntry.spent_on,
				hours: timeEntry.hours,
				ksLink: null,
				child: [{
					issueId: timeEntry.issue.id,
					issueName: null,
					trackerName: null,
					activity: timeEntry.activity.name,
					date: timeEntry.spent_on,
					hours: timeEntry.hours,
					ksLink: null
				}]
			};

			(function loadIssue(id){
				apiService.get(issueUrl.replace('{0}', id)).then(function(data){
					var issue = data.issue, 
						ksLink = '',
						parentId = issue.parent ? issue.parent.id : null;
					if (!spentTime.issueName){
						spentTime.issueName = issue.subject;
					}

					spentTime.issueId = issue.id;
					spentTime.issueName = issue.subject;
					spentTime.trackerName = issue.tracker.name;
					
					if($rootScope.task == issue.tracker.name ||
						$rootScope.change == issue.tracker.name ||
						$rootScope.bug == issue.tracker.name){
						ksLink = getKsLink(issue.custom_fields);
					}

					if ($rootScope.research == issue.tracker.name){
						ksLink = $rootScope.ksLinkResearch;
					}

					spentTime.child[0].issueName = spentTime.child[0].issueName ? spentTime.child[0].issueName : issue.subject;
					spentTime.child[0].trackerName = spentTime.child[0].trackerName ? spentTime.child[0].trackerName : issue.tracker.name;
					spentTime.child[0].ksLink = spentTime.child[0].ksLink ? spentTime.child[0].ksLink : ksLink;

					if (parentId && ksLink && ksLink.indexOf($rootScope.ksLinkPrefix) < 0){
						return loadIssue(parentId);
					}

					if (parentId && $rootScope.codingPhase == issue.tracker.name){
						return loadIssue(parentId);
					}
					
					spentTime.ksLink = ksLink;
					d.resolve(spentTime);
				});
			})(timeEntry.issue.id);
			return d.promise;
		}

		function getKsLink(custom_fields){
			var ksLink = null;
			angular.forEach(custom_fields, function(field, i){
				if ($rootScope.ksLinkField == field.name){
					ksLink = field.value;
				}
			});
			return ksLink;
		}

		return homeService;
	}

})(angular.module('redmineLogtime'))