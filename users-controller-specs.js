describe('users controller', function(){
	var $httpBackend,
		$scope;

	beforeEach(module('githubViewer'));

	beforeEach(inject(function($injector){
		$httpBackend = $injector.get('$httpBackend');
		
		$httpBackend.when('GET', 'https://api.github.com/users/narkhedegs').respond({
			login: 'narkhedegs'
		});

		$httpBackend.when('GET', 'https://api.github.com/users/non existent user').respond(404, '');

		var $rootScope = $injector.get('$rootScope');
		$scope = $rootScope.$new();

		var $controller = $injector.get('$controller');
		var controller = $controller('UsersController', {
			'$scope': $scope
		});
	}));

	afterEach(function(){
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should have a property to store user information', function(){
		expect($scope.user).toBeDefined();
	});

	it('should have a property to store username', function(){
		expect($scope.username).toBeDefined();
	});

	it('should have a property to store error', function(){
		expect($scope.error).toBeDefined();
	});

	it('should have a method to get user information', function(){
		expect($scope.getUser).toBeDefined();
	});

	describe('when getting user', function(){

		it('should call correct github api', function(){
			$httpBackend.expectGET('https://api.github.com/users/narkhedegs');
			$scope.getUser('narkhedegs');
			$httpBackend.flush();
		});

		describe('if successful', function(){

			it('user should be truthy', function(){
				$scope.getUser('narkhedegs');
				$httpBackend.flush();

				expect($scope.user).toBeTruthy();
			});

			it('user should be populated correctly', function(){
				$scope.getUser('narkhedegs');
				$httpBackend.flush();

				expect($scope.user.login).toBe('narkhedegs');
			});

			it('error should be falsy', function(){
				$scope.error = 'Some error!';
				$scope.getUser('narkhedegs');
				$httpBackend.flush();

				expect($scope.error).toBeFalsy();
			});

			it('username should be emptied', function(){
				var username = 'narkhedegs';
				$scope.username = username;
				$scope.getUser(username);
				$httpBackend.flush();

				expect($scope.username).toBeFalsy();
			});

		});

		describe('if failure', function(){

			it('user should be falsy', function(){
				$scope.user = { login: 'narkhedegs' }
				$scope.getUser('non existent user');
				$httpBackend.flush();

				expect($scope.user).toBeFalsy();
			});

			it('error should be truthy', function(){
				$scope.getUser('non existent user');
				$httpBackend.flush();

				expect($scope.error).toBeTruthy();
			});

			it('username should not be emptied', function(){
				var username = 'non existent user';
				$scope.username = username;
				$scope.getUser(username);
				$httpBackend.flush();

				expect($scope.username).toBe(username);
			});

		});

	});

});