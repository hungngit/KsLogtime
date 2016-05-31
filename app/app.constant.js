(function (app) {
	'use strict';
	angular.module('app.constant', []).run(run);
	run.$inject = ['$rootScope'];

	function run($rootScope){
		$rootScope.headerConfig = {
			headers: {'X-Redmine-API-Key' : '58e93bc79d51bd7052a09ed5bc8597e851fb2e6d'}
		};
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