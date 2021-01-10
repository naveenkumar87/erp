dashboardApp.controller('adminController', ['$scope', '$location', '$http', 'commonService', 'commonFactory', '$route', 
      function($scope, $location, $http, commonService, commonFactory, $route) {
	
		/*$scope.errors = [];
		$scope.warnings = [];
		$scope.infos = [];*/
	 		
		$scope.initUserList = function(){
			$scope.user = {};
			$scope.pageTitle = "Search Users";
		};		
		$scope.initAddUser = function(){
			$scope.user = {};
			$scope.pageTitle = "Add User";
		}
		
		$scope.initDepartmentSearch = function(){
			$scope.department = {};
			$scope.pageTitle = "Search Department";
		}
		
		$scope.addDept = function(code){
			
			if(code){
				commonFactory.checkCodeAvail(code, 'findDepartment')
					.then(function (result){
		 				console.log(result);
		 				
		 				if(result.data.success == true){
		 					if(result.data.data == null){
		 						//$scope.dnotfound = true;
		 					}else{
		 						commonService.setResponse(result.data.data);
		 						$location.path('/addDepartment');
		 					}
		 				}else{
		 					$scope.errors.push({form:'', field: '', msg: result.data.message});
		 				}
		 			
			       },function (error){
			    	   $scope.errors.push({form:'', field: '', msg: error.data.message});
			    	   console.log(error);
			    	
			     });	
			}else{
				$location.path('/addDepartment');
				commonService.setResponse(null);
			}
			
		}
		
		$scope.initAddDepartment = function(){
			$scope.pageTitle = "Add Department";
			var dept = commonService.getResponse();
			if(dept == null){
				$scope.department = {};
				$scope.dnotfound = false;
			}else{
				$scope.department = dept;
				$scope.dnotfound = true;
			}
						
			
			$scope.dfound = false;
			$scope.loading = false;
			commonService.getResponse(null);
		}
		
		$scope.saveDepartment = function()
		{
			var validated = commonService.processNgForm('addDepartment', [{name:'dname', msg:'department name'}, {name:'dcode', msg:'department code'}] ,$scope);
			//commonService.processMsg($scope.errors, 'error');
			
			if(!validated){
				var isNew = false;
				if(!$scope.department.id){
					isNew = true;
				}
				if($scope.dnotfound){
					commonFactory.postReq($scope.department, 'saveDept')
		 				.then(function (result){
			 				console.log(result);
			 				
			 				if(result.data.success == true){
			 					if(isNew){
			 						$location.path('/department');
			 					}else{
			 						$scope.searchDepartment();
			 					}
			 					
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
				}else{
					$scope.errors.push({form:'', field: '', msg: 'Department code already present.'});
				}
				
 				// alert('submit');
			}else{				
				return;
			}
		}
		
		$scope.validateDepart = function(){
			var dcode = $scope.department.code;
			
			$scope.dnotfound = false;
			$scope.dfound = false;
			$scope.loading = true;
			
			if(dcode != undefined && dcode!=''){
				//commonFactory.checkCodeAvail(dcode, 'findDepartment');
				blockLoader();
				$scope.clearMessages();
				
				
				commonFactory.checkCodeAvail(dcode, 'findDepartment')
	 				.then(function (result){
		 				console.log(result);
		 				unblockLoader();
		 				$scope.loading = false;
		 				
		 				if(result.data.success == true){
		 					if(result.data.data == null){
		 						$scope.dnotfound = true;
		 					}else{
		 						$scope.dfound = true;
		 					}
		 				}else{
		 					$scope.errors.push({form:'', field: '', msg: result.data.message});
		 				}
		 				
		 				
			       },function (error){
			    	   $scope.loading = false;
			    	   $scope.errors.push({form:'', field: '', msg: error.data.message});
			    	   console.log(error);
			    	   unblockLoader();
			     });	
			}else{
				$scope.loading = false;
			}
		};
		
		$scope.searchDepartment = function(){
			commonService.setResponse($scope.department);
			$location.path('/resultDepartments');
		}
		
		$scope.initDepartmentList = function(){
			$scope.pageTitle = "Result Department";
			var searchObj = commonService.getResponse();
			if(!searchObj){
				searchObj = {};
			}
			commonFactory.postReq(searchObj, 'searchDept')
				.then(function (result){
	 				console.log(result);
	 				
	 				if(result.data.success == true){
	 					$scope.depts = result.data.data;
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
			commonService.setResponse(null);
		}
		
		$scope.deleteDept = function(dept){
			
			commonFactory.deleteEntityObj(dept, 'deleteDept')
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
			
		};
		
		/*$scope.route = function(path){
	    	$location.path(path);
		};*/
	
	
}]);