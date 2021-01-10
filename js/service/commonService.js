//'use strict';
dashboardApp.service('commonService', ['$http', '$window', '$document', '$uibModal', 'commonFactory',  
                                       	function ($http, $window, $document, $uibModal, commonFactory) {
    var response = {};
    var shipment = {};
    var service = this;
    
    this.getResponse = function(){
    	return response;
    }
    
    this.setResponse = function(value){
    	response = value;
    }
        
    this.processMsg = function(arr, type){
    	angular.element('.invalid-ele').removeClass('invalid-ele');
    	if(arr.length > 0){
    		//if(!service.isEmpty(arr[0].form))
    			//angular.element(arr[0].form+" input", arr[0].form+" select", arr[0].form+" textarea").removeClass('invalid-ele');
    		
    		angular.forEach(arr, function(index, value){
    			if(!service.isEmpty(index.field))
    				angular.element(index.field).addClass('invalid-ele');
    		});
    		$('html,body').animate({ scrollTop: 0 }, 'slow');
    	}
    }
    
    this.isEmpty = function(val){
		if(val==null || val == '' || val == undefined){
			return true;
		}else{
			return false;
		}
	}
    
    this.processNgError = function(errorObj, arr, formName, field, customFieldName){
    	if(errorObj.hasOwnProperty('min')){
    		arr.push({form:formName, field: field, msg: "Please enter valid "+customFieldName+"."});
    	}
    	if(errorObj.hasOwnProperty('number')){
    		arr.push({form:formName, field: field, msg: "Please enter valid "+customFieldName+"."});
    	}
    	if(errorObj.hasOwnProperty('email')){
    		arr.push({form:formName, field: field, msg: "Please enter valid "+customFieldName+"."});
    	}
    	if(errorObj.hasOwnProperty('required')){
    		arr.push({form:formName, field: field, msg: service.ucfirst(customFieldName)+" is required."});
    	}
    	return arr;
    }
    
    this.processNgForm = function(formName, fields, scope){
    	var error = false;
    	scope.errors.length = 0;
    	
    	if(fields.length > 0){
			angular.forEach(fields, function(value, key){
		      if(!scope[formName][value.name].$valid){
		    	  	var errorObj = scope[formName][value.name].$error;
	 				service.processNgError(errorObj, scope.errors, formName, '[name='+value.name+']', value.msg);
	 				error = true;
		      }
		   });
    	}
    	
    	service.processMsg(scope.errors, 'error');
    	
    	return error;
    }
    
    this.validateEmail = function(email){
    	if(service.isEmpty(email)){
    		return false;
    	}else {
    		var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    		var valid = pattern.test(email);
    		return valid;
    	}
    }
    
    this.ucfirst = function(str) {
        var firstLetter = str.slice(0,1);
        return firstLetter.toUpperCase() + str.substring(1);
    }
    
    /**
     * Default UI modal configuration
     */
    var defaults = {
		  animation: true,
	      ariaLabelledBy: 'modal-title',
	      ariaDescribedBy: 'modal-body',
	      templateUrl: 'views/defaultModalContent.html',
	      windowTemplateUrl: 'views/defaultModalContent.html',
	      controller: 'ModalInstanceCtrl',
	      backdrop: true,
	      bindToController: false,
	      keyboard: true,
	      openedClass: 'modal-open',
	      size: 'lg',
	      resolve: {
	    	  
	      }
    }
    
    this.gtnModal = function(config){
    	var modalConfig = service.popupConfig(config);
    	return $uibModal.open(modalConfig);
    	//return uibModalInstance;
    }
    
    this.popupConfig = function(config){
    	var defaultProp = angular.copy(defaults);
    	$.each(config, function(k, v){
    		if(defaultProp.hasOwnProperty(k)){
    			defaultProp[k] = v;
    		}else{
    			defaultProp[k] = v;
    		}
    	});
    	return defaultProp;
    }
    
    
    /****** Search exporter popup start ******/
    
    this.searchExporterPopup = function(type, data){

		var config = {
			  controller: 'exportOperationCtlr',
		      templateUrl: 'views/export/searchExporterPopup.html',
		      windowTemplateUrl: 'views/export/searchExporterPopup.html'
		}
		
		config.resolve = {
			items: function(){
				shipment: data
			}
		}
		
		var uibModalInstance = this.gtnModal(config);
		
		var response = {
				instance: uibModalInstance,
				shipment: data,
				type: type
		}
		this.setResponse(response);	
	}
    
    
    this.searchConsigneePopup = function(type, data){

		var config = {
			  controller: 'exportOperationCtlr',
		      templateUrl: 'views/export/searchConsigneePopup.html',
		      windowTemplateUrl: 'views/export/searchConsigneePopup.html'
		}
		
		config.resolve = {
			items: function(){
				shipment: data
			}
		}
		
		var uibModalInstance = this.gtnModal(config);
		
		var response = {
				instance: uibModalInstance,
				shipment: data,
				type: type
		}
		this.setResponse(response);
	}
    
    
    this.searchProductsPopup = function(type, data){
		var config = {
			  controller: 'controller',
		      templateUrl: 'views/masters/searchProductsPopup.html',
		      windowTemplateUrl: 'views/masters/searchProductsPopup.html'
		}
		
		config.resolve = {
			items: function(){
				shipment: data
			}
		}
		
		var uibModalInstance = this.gtnModal(config);
		
		var response = {
				instance: uibModalInstance,
				shipment: data,
				type: type
		}
		this.setResponse(response);	
	}
    
    this.upperCase = function(str){
    	str = str.toLowerCase();
    	return capitalizeFirstLetter(str);
    }
    
    /****** Search exporter popup end ******/
    
    
    
    /************ Master start ************/
    
    this.populateSbu = function(scope, setFlag, userObj, userField){
    	commonFactory.getSbuList()
			.then(function(result){
				if(result.data.success == false){
					scope.errors.push({form:'', field: '', msg: result.data.message});
					this.processMsg(scope.errors, 'error');
					//alert(result.data.message);
					scope.sbuList = [];
				}else{ 					
					//alert(result.data.data.sbuList);
					scope.sbuList = result.data.data.sbuList;
					if(setFlag){
						scope[userObj][userField] = result.data.data.sbu;
					}
				} 
			});
    }
    
    /*********** Master end *************/
    
    /*return {
        getResponse: function () {
            return response;
        },
        setResponse: function(value) {
        	response = value;
        }
    };*/
    
    this.findSortIndex = function(arr){
    	var obj = null;
    	$.each(arr, function(i, v){
    		if(v.sort!=false){
    			obj = {
		    				index: i,
		    				ad: v.sort
		    			};
    		}
    	});
    	return obj;
    }
    
}]);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function adjustColumns(widthArr, container){

	if(container){
		var myVar1 = setInterval(function(){
			//console.log($('.theadTrRow th').length);
			if($(container+' '+'.theadTrRow th').length > 1){
				
				$.each(widthArr, function(i, v){
					$(container+' '+'.theadTrRow th:eq('+v.index+')').width(v.width);	
				});
				
				clearInterval(myVar1);
			  }
		 	}, 
		 10);
	}
	else{
		var myVar2 = setInterval(function(){
			//console.log($('.theadTrRow th').length);
			if($('.theadTrRow th').length > 1){
				
				$.each(widthArr, function(i, v){
					$('.theadTrRow th:eq('+v.index+')').width(v.width);	
				});
				
				clearInterval(myVar2);
			}
		   }, 
		 10);
	}
	
}