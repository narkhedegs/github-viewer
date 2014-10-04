(function(){
	var github = function($http){
		
		var getUser = function(username){
			return $http.get("https://api.github.com/users/" + username)
						.then(function(response){
							return response.data;
						});
		};

		var getRepositoriesForUser = function(username){
			return $http.get("https://api.github.com/users/" + username + "/repos")
						.then(function(response){
							return response.data;
						});
		};

		return {
			getUser: getUser,
			getRepositoriesForUser: getRepositoriesForUser
		};
	};

	angular.module("githubViewer").factory("github", ["$http", github]);
}());