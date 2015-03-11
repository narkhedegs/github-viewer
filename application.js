(function(){
	var application = angular.module("githubViewer", ["ngRoute"]);

	application.config(function($routeProvider){
		$routeProvider
			.when("/home", {
				templateUrl: "get-user.html",
				controller: "UsersController"
			})
			.when("/about", {
				templateUrl: "about.html"
			})
			.when("/contact", {
				templateUrl: "contact.html"
			})
			.otherwise({
				redirectTo: "/home"
			});
	});
}());