(function(){
	var NavigationController = function($scope, $location){
		$scope.shouldActivateMenuItem = function(menuItemName){
			return $location.path().substring(1) == menuItemName;
		};
	};

	angular.module("githubViewer").controller("NavigationController", ["$scope", "$location", NavigationController]);
}());