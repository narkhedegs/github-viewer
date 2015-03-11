describe("navigation controller", function(){
	var $scope,
		$location;

	beforeEach(module("githubViewer"));

	beforeEach(inject(function($injector){
		var $rootScope = $injector.get("$rootScope");
		$scope = $rootScope.$new();

		$location = $injector.get("$location");

		var $controller = $injector.get("$controller");
		var controller = $controller("NavigationController", {
			"$scope": $scope,
			"$location": $location
		});
	}));

	it("should have a method to activate menu item", function(){
		expect($scope.shouldActivateMenuItem).toBeDefined();
	});

	describe("when deciding to activate a menu item", function(){

		it("should activate a menu item if menu item name matches the location hash", function(){
			spyOn($location, "path").and.returnValue("/home");

			var menuItemName = "home";
			var result = $scope.shouldActivateMenuItem(menuItemName);
			expect(result).toBeTruthy();
		});

		it("should not activate a menu item if menu item name doesn't match the location hash", function(){
			spyOn($location, "path").and.returnValue("/contact");

			var menuItemName = "home";
			var result = $scope.shouldActivateMenuItem(menuItemName);
			expect(result).toBeFalsy();
		});

	});
});