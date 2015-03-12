(function(){
	var UsersController = function($scope, github){
		$scope.username = null;
		$scope.error = null;
		$scope.user = null;
		$scope.repositories = null;

		var onGetRepositoriesForUserSuccess = function(data){
			$scope.repositories = data;
		};

		var onGetUserSuccess = function(data){
			$scope.user = data;
			$scope.error = null;

			github.getRepositoriesForUser(data.login)
				  .then(onGetRepositoriesForUserSuccess, onError);
		};

		var onError = function(){
			$scope.error = "Could not get data.";
			$scope.user = null;
			$scope.repositories = null;
		};

		$scope.getUser = function(username){
			github.getUser(username)
				  .then(onGetUserSuccess, onError);
		};
	};

	angular.module("githubViewer").controller("UsersController", ["$scope", "github", UsersController]);
}());