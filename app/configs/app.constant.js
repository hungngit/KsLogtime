(function (app) {
	'use strict';
	angular.module('app.constant', []).run(run);
	run.$inject = ['$rootScope'];

	function run($rootScope){
		$rootScope.headerConfig = {
			headers: {'X-Redmine-API-Key' : '58e93bc79d51bd7052a09ed5bc8597e851fb2e6d'}
		};
		$rootScope.proxyUrl = '//nodejsproxy.herokuapp.com/proxy?url=';
		$rootScope.timeEntriesUrl = 'http://14.161.22.172:3000/time_entries.json?f[]=spent_on&op[spent_on]={0}{1}&f[]=&c[]=project&c[]=spent_on&c[]=user&c[]=activity&c[]=issue&c[]=comments&c[]=hours';
		$rootScope.issueUrl = 'http://14.161.22.172:3000/issues/{0}.json'
		$rootScope.userFilter = '&f[]=user_id&op[user_id]==';
		$rootScope.userFilterId = '&v[user_id][]=';
		$rootScope.defaultSpentOn = 't';
		$rootScope.spentOnOption1 = '=&v[spent_on][]=';

		$rootScope.task = 'Task';
		$rootScope.change = 'Change';
		$rootScope.bug = 'Bug';
		$rootScope.codingPhase = 'CodingPhase';
		$rootScope.research = '★★Research&Training★★';
		$rootScope.ksLinkField = 'KS_Link';

		$rootScope.ksLinkPrefix = 'https://ap.salesforce.com/a021';
		$rootScope.ksLinkResearch = 'https://ap.salesforce.com/a021000001824AJ';

		$rootScope.userMap = {
			12: {name: 'Thanh Hùng', namejp: '015フン'},
			23: {name: 'Vinh', namejp: '012ビン'},
			25: {name: 'Quân', namejp: '021ワン'},
			34: {name: 'Thường', namejp: '028トゥオン'},
			38: {name: 'Quốc Hùng', namejp: '031クオウ・フン'},
			54: {name: 'Lưu', namejp: '042ユー'},
			56: {name: 'Bảo', namejp: '041バオ'}
		};
	}
})();