(function(){
	var UsersController = function($scope, $http){
		$scope.username = null;
		$scope.error = null;
		$scope.user = null;

		$scope.getUser = function(username){
			$http.get('https://api.github.com/users/' + username)
				.success(function(data){
					$scope.user = data;
					$scope.username = null;
					$scope.error = null;
				})
				.error(function(){
					$scope.error = 'Could not get user.';
					$scope.user = null;
				});
		};
	};

	angular.module('githubViewer', []).controller('UsersController', ['$scope', '$http', UsersController]);
}());