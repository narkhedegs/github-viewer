describe("github service", function(){
	var github,
		$httpBackend;

	beforeEach(module("githubViewer"));

	beforeEach(inject(function($injector){
		github = $injector.get("github");

		$httpBackend = $injector.get("$httpBackend");

		$httpBackend.when("GET", "https://api.github.com/users/narkhedegs").respond({
			login: "narkhedegs"
		});

		$httpBackend.when("GET", "https://api.github.com/users/narkhedegs/repos").respond([
			{
				name: "github-viewer"
			}
		]);
	}));

	afterEach(function(){
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it("should exist", function(){
		expect(github).toBeDefined();
	});

	it("should have a method to get user information", function(){
		expect(github.getUser).toBeDefined();
	});

	it("should have a method to get repositories for a user", function(){
		expect(github.getRepositoriesForUser).toBeDefined();
	});

	describe("when getting user", function(){

		it("should call correct github api", function(){
			$httpBackend.expectGET("https://api.github.com/users/narkhedegs");
			github.getUser("narkhedegs");
			$httpBackend.flush();
		});

		describe("if successful", function(){

			it("returned object should be truthy", function(){
				github.getUser("narkhedegs").then(function(data){
					expect(data).toBeTruthy();
				});

				$httpBackend.flush();
			});

			it("should populate the returned object correctly", function(){
				github.getUser("narkhedegs").then(function(data){
					expect(data.login).toEqual("narkhedegs");
				});

				$httpBackend.flush();
			});

		});

	});

	describe("when getting repositories for user", function(){

		it("should call correct github api", function(){
			$httpBackend.expectGET("https://api.github.com/users/narkhedegs/repos");
			github.getRepositoriesForUser("narkhedegs");
			$httpBackend.flush();
		});

		describe("if successful", function(){

			it("returned object should be truthy", function(){
				github.getRepositoriesForUser("narkhedegs").then(function(data){
					expect(data).toBeTruthy();
				});

				$httpBackend.flush();
			});

			it("should populate the returned object correctly", function(){
				github.getRepositoriesForUser("narkhedegs").then(function(data){
					expect(data.length).toEqual(1);
					expect(data[0].name).toEqual("github-viewer");
				});

				$httpBackend.flush();
			});

		});

	});
});