describe("users controller", function(){
	var $scope,
		github,
		$q;

	beforeEach(module("githubViewer"));

	beforeEach(inject(function($injector){		
		github = $injector.get("github");

		var $rootScope = $injector.get("$rootScope");
		$scope = $rootScope.$new();

		var $controller = $injector.get("$controller");
		var controller = $controller("UsersController", {
			"$scope": $scope,
			"github": github
		});

		$q = $injector.get("$q");
	}));

	it("should have a property to store user information", function(){
		expect($scope.user).toBeDefined();
	});

	it("should have a property to store username", function(){
		expect($scope.username).toBeDefined();
	});

	it("should have a property to store error", function(){
		expect($scope.error).toBeDefined();
	});

	it("should have a property to store repositories", function(){
		expect($scope.repositories).toBeDefined();
	});

	it("should have a method to get user information", function(){
		expect($scope.getUser).toBeDefined();
	});

	describe("when getting user", function(){
		var getUserDeferred,
			getRepositoriesForUserDeferred;

		beforeEach(function(){
			getUserDeferred = $q.defer();
			spyOn(github, "getUser").and.returnValue(getUserDeferred.promise);

			getRepositoriesForUserDeferred = $q.defer();
			spyOn(github, "getRepositoriesForUser").and.returnValue(getRepositoriesForUserDeferred.promise);
		});

		it("should call getUser method of github service", function(){
			$scope.getUser("narkhedegs");
			expect(github.getUser).toHaveBeenCalled();
		});

		it("should call getUser method of github service with correct arguments", function(){
			var username = "narkhedegs";
			$scope.getUser(username);
			expect(github.getUser).toHaveBeenCalledWith(username);
		});

		describe("if successful", function(){

			beforeEach(function(){
				getUserDeferred.resolve({ 
					login: "narkhedegs" 
				});
			});

			it("user should be truthy", function(){
				$scope.getUser("narkhedegs");
				$scope.$apply();
				expect($scope.user).toBeTruthy();
			});

			it("user should be populated correctly", function(){
				$scope.getUser("narkhedegs");
				$scope.$apply();
				expect($scope.user.login).toBe("narkhedegs");
			});

			it("error should be falsy", function(){
				$scope.error = "Some error!";
				$scope.getUser("narkhedegs");
				$scope.$apply();
				expect($scope.error).toBeFalsy();
			});

			it("should call getRepositoriesForUser method of github service", function(){
				$scope.getUser("narkhedegs");
				$scope.$apply();
				expect(github.getRepositoriesForUser).toHaveBeenCalled();
			});

			it("should call getRepositoriesForUser method of github service with correct arguments", function(){
				var username = "narkhedegs";
				$scope.getUser(username);
				$scope.$apply();
				expect(github.getRepositoriesForUser).toHaveBeenCalledWith(username);
			});

			describe("if successful in getting repositories for user", function(){

				beforeEach(function(){
					getRepositoriesForUserDeferred.resolve([
						{
							name: "github-viewer"
						}
					]);
				});

				it("repositories should be truthy", function(){
					$scope.getUser("narkhedegs");
					$scope.$apply();
					expect($scope.repositories).toBeTruthy();
				});

				it("should populate the repositories correctly", function(){
					$scope.getUser("narkhedegs");
					$scope.$apply();
					expect($scope.repositories.length).toEqual(1);
					expect($scope.repositories[0].name).toEqual("github-viewer");
				});

			});

			describe("if failed in getting repositories for user", function(){

				beforeEach(function(){
					getRepositoriesForUserDeferred.reject();
				});

				it("repositories should be falsy", function(){
					$scope.repositories = [];
					$scope.getUser("narkhedegs");
					$scope.$apply();
					expect($scope.repositories).toBeFalsy();
				});

			});

		});

		describe("if failure", function(){

			beforeEach(function(){
				getUserDeferred.reject();
			});

			it("user should be falsy", function(){
				$scope.user = { login: "narkhedegs" }
				$scope.getUser("non existent user");
				$scope.$apply();
				expect($scope.user).toBeFalsy();
			});

			it("error should be truthy", function(){
				$scope.getUser("non existent user");
				$scope.$apply();
				expect($scope.error).toBeTruthy();
			});

		});

	});

});