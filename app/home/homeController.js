(function (app) {
	'use strict';

	app.controller('homeController', homeController);
	homeController.$inject = ['$rootScope', '$scope', '$routeParams', '$timeout', '$interval', 'homeService'];
	
	function homeController($rootScope, $scope, $routeParams, $timeout, $interval, homeService) {
		$scope.openLogtime = openLogtime;
		$scope.mouseenter = mouseenter;
		$scope.mouseleave = mouseleave;
		$scope.token = {value: ''};

		if ($routeParams.isSu == '0'){
			$scope.isSu = false;
		}else if ($routeParams.isSu == '1'){
			$scope.isSu = true;
		}

		function mouseenter(devId){
			$('.dev' + devId).css('font-weight', 'bold');
		}

		function mouseleave(devId){
			$('.dev' + devId).css('font-weight', '');
		}

		function loadTimeEntries(){
			homeService.getTimeEntries($routeParams.spentOn, $rootScope.userMap).then(function (timeEntries){
				$scope.timeByUser = countHoursByUser(timeEntries);
				
				if (timeEntries.length == 0){
					commonUtils.unblockUI();
				}

				$scope.timeEntries = timeEntries;
			});
		}

		function countHoursByUser(timeEntries) {
			var hourByUser = [];
			angular.forEach(timeEntries, function(timeEntry, i){
				if (!hourByUser[timeEntry.devId]){
					hourByUser[timeEntry.devId] = {
						devId: timeEntry.devId,
						name: $rootScope.userMap[timeEntry.devId].name,
						hours: timeEntry.hours
					};
				}else{
					hourByUser[timeEntry.devId].hours += timeEntry.hours;
				}
			});

			angular.forEach($rootScope.userMap, function(nameobj, devId){
				if (!hourByUser[devId]){
					hourByUser[devId] = {
						devId: devId,
						name: $rootScope.userMap[devId].name,
						hours: 0
					};
				}
			});
			return Object.keys(hourByUser).map(function (key) {return hourByUser[key]});
		}

		var i = 0;
		function openLogtime(){
			postData($scope.timeEntries[i++]);
			if (i > $scope.timeEntries.length - 1) {
				i = 0;
				return;
			}
			$timeout(function(){
				openLogtime();
			}, 500);
		}

		function postData(timeEntry){
			if (timeEntry.devId == 60) return;
			var sfId = timeEntry.ksLink.replace('https://ap.salesforce.com/', '');
			$('form[id^="a02"]').remove();
			var sfLogtimeForm = $('<form>', {'method': 'post', 'action': 'https://ap.salesforce.com/a10/e', 'target': '_blank'}).hide();
			sfLogtimeForm.append($('<input>', {'type': 'hidden', 'name': '00N10000002GBR4', 'value': getLogType(timeEntry)}));
			sfLogtimeForm.append($('<input>', {'type': 'hidden', 'name': 'CF00N10000004mZwa_lkid', 'value': sfId}));
			sfLogtimeForm.append($('<input>', {'type': 'hidden', 'name': 'CF00N10000004mZwa', 'value': 'KSLogTimeTool'}));
			sfLogtimeForm.append($('<input>', {'type': 'hidden', 'name': '00N10000004mZwf', 'value': $rootScope.userMap[timeEntry.devId].namejp}));
			sfLogtimeForm.append($('<input>', {'type': 'hidden', 'name': '00N10000002GBSH', 'value': timeEntry.hours}));
			sfLogtimeForm.append($('<input>', {'type': 'hidden', 'name': '00N10000002GBS7', 'value': timeEntry.date.replace(/-/g, '/')}));
			
			if ($scope.token.value != ''){
				sfLogtimeForm.append($('<input>', {'type': 'hidden', 'name': '_CONFIRMATIONTOKEN', 'value': $scope.token.value}));
				sfLogtimeForm.append($('<input>', {'type': 'hidden', 'name': 'save'}));
			}
			
			if (isChange(timeEntry)){
				sfLogtimeForm.append($('<input>', {'type': 'checkbox', 'name': '00N10000002ntXW', 'checked': 'checked'}));
			}

			sfLogtimeForm.appendTo('body').submit();
		}

		function getLogType(timeEntry){
			if (timeEntry.child.length > 1){
				return 'その他(Other)';
			}
			if (timeEntry.child[0].trackerName == 'CodingPhase'){
				if (timeEntry.child[0].issueName.indexOf('Unit Testing') > 0){
					return '単体テスト実施 (UT Evidence)';
				}
				if (timeEntry.child[0].issueName.indexOf('Source Review') > 0){
					return 'ソースレビュー (Source Review)';
				}
				if (timeEntry.child[0].issueName.indexOf('Evidence Review') > 0){
					return '単体テスト結果レビュー (UT Evidence Review)';
				}
				return '開発 (Source Coding)';
			}

			if (timeEntry.child[0].trackerName == 'Change' || timeEntry.child[0].trackerName == 'Bug'){
				return '開発 (Source Coding)';
			}
			if (timeEntry.child[0].trackerName == 'Task' || timeEntry.child[0].trackerName == '★★Research&Training★★'){
				return 'その他(Other)';
			}
		}

		function isChange(timeEntry){
			var isCh = false;
			angular.forEach(timeEntry.child, function(child, i){
				if (child.trackerName == 'Change'){
					isCh = true;
				}
			});
			return isCh;
		}

		commonUtils.blockUI();
		loadTimeEntries();

		// Put in interval, first trigger after 5 minutes 
		$interval(function(){
			commonUtils.blockUI();
			loadTimeEntries();
		}.bind(this), 5 * 60 * 1000);
	}
})(angular.module('redmineLogtime'));