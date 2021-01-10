var dashboardApp = angular.module('dashboardApp', ['ngRoute', 'ngMaterial', 'ui.bootstrap', 'ngResource']);

dashboardApp.controller('controller', ['$scope', '$templateRequest', '$compile', '$sce', '$mdDialog', 'commonService', 'commonFactory', '$route',
                                       		function($scope, $templateRequest, $compile, $sce, $mdDialog, commonService, commonFactory, $route){
	
	$scope.errors = [];
	$scope.warnings = [];
	$scope.infos = [];
	
	$scope.init = function(){
		$scope.user = {};
		$scope.user.manager="";
		$scope.user.erpclass = 'blue';
	};
	
	$scope.route = function(path){
    	$location.path(path);
	};
	
	$scope.$on('$routeChangeStart', function(scope, next, current){
		//alert('start');
	});
	$scope.counter = 1;
	$scope.$on('$routeChangeSuccess', function(scope, next, current){
		//alert(angular.element('.btn-row').html());
		console.log($scope.counter++);
		$scope.clearMessages();
		//$scope.addTemplate('error.html');
	});
	
	$scope.addTemplate = function(url){
		$templateRequest($sce.getTrustedResourceUrl(url)).then(function(template) {
	        // template is the HTML template as a string

	        // Let's put it into an HTML element and parse any directives and expressions
	        // in the code. (Note: This is just an example, modifying the DOM from within
	        // a controller is considered bad style.)
			
			var template1 = angular.element(template);
			var linkFn = $compile(template1);
			var element = linkFn($scope);
			$('.btn-row').after(element);

	        //$compile($('.btn-row').after(template1))($scope);
	    }, function() {
	        console.log('error occured while loading template...');
	    });
	}
	
	
	$scope.mdConfirm = function(ev){

		var confirm = $mdDialog.confirm()
            .title('Delete')
            .textContent('Are you sure you want to delete?')
            .ariaLabel('')
            .targetEvent(ev)
            .ok('OK')
            .cancel('Cancel');
		
		return confirm;
	}
	
	
	$scope.deleteEntity = function(obj, url, ev){
			
		  $scope.clearMessages();			
		  var confirm = $scope.mdConfirm(ev);

          $mdDialog.show(confirm).then(function() {
       	   
        	  commonFactory.deleteEntityObj(obj, url)
					.then(function (result){
		 				console.log(result);
		 				
		 				if(result.data.success == true){
		 					$route.reload();
		 				}else{
		 					$scope.errors.push({form:'', field: '', msg: result.data.message});
		 				}
		 				
					
		       },function (error){
			    	   console.log(error);
			    	   if(error.data == null){
			    		   $scope.errors.push({form:'', field: '', msg: 'Internal Server Error.'});
			    	   }else{
			    		   $scope.errors.push({form:'', field: '', msg: error.data.message});
			    	   }
		    	   
		     });
        	  
        	  
        	    /*var promise = exportOperationFactory.removeShipment(shipment);
	 			//blockScroll();
	 			
	 			promise.then(function(response){
	 				if(response.status == 200){
	 					
	 					$scope.searchShipment();
	 					
	 					//var index = $scope.shipments.indexOf(shipment);
			 			//$scope.shipments.splice(index, 1);
	 				}else{
	 					$scope.errors.push({form:'', field: '', msg: response.statusText});
	 					commonService.processMsg($scope.errors, 'error');
	 				}	 				
	 				//unblockLoader();
	 			 });	*/
       	   
          	}, function() {
          		
          });
		}
	
	$scope.clearMessages = function(){
		$scope.errors = [];
		$scope.warnings = [];
		$scope.infos = [];
	}
	
}]);


dashboardApp.config(function($routeProvider, $locationProvider, $qProvider, $mdIconProvider) {
    $mdIconProvider
      .defaultIconSet('img/icons/sets/core-icons.svg', 24);
    
    /*$locationProvider.hashPrefix('');
	$qProvider.errorOnUnhandledRejections(false);*/
    //$locationProvider.hashPrefix('');
	//TexERP
    //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');
    
    $routeProvider.
	    /*when('/', {
			templateUrl: 'TexERP/partials/dashboard.html',
			controller: 'controller'
		}).*/
	    when('/TexERP', {
			templateUrl: 'partials/admin/welcome.html'
		}).
		when('/users', {
			templateUrl: 'partials/admin/users.html',
			controller: 'adminController'
		}).
		when('/addUser', {
			templateUrl: 'partials/admin/addUser.html',
			controller: 'adminController'
		}).
		when('/department', {
			templateUrl: 'partials/admin/department.html',
			controller: 'adminController'
		}).
		when('/addDepartment', {
			templateUrl: 'partials/admin/addDepartment.html',
			controller: 'adminController'
		}).
		when('/resultDepartments', {
			templateUrl: 'partials/admin/resultDepartment.html',
			controller: 'adminController'
		});
    
    
    	/*.
		otherwise({
			redirectTo: '/'
		});*/
    
});

dashboardApp.controller('menuCtrl', function menuCtrl($scope, $location, $mdDialog) {
    this.settings = {
    	      printLayout: true,
    	      showRuler: true,
    	      showSpellingSuggestions: true,
    	      presentationMode: 'edit'
    	    };

    this.sampleAction = function(name, ev) {
      $mdDialog.show($mdDialog.alert()
        .title(name)
        .textContent('You triggered the "' + name + '" action')
        .ok('Great')
        .targetEvent(ev)
      );
    };
    
    $scope.route = function(path){
    	$location.path(path);
	};
});
