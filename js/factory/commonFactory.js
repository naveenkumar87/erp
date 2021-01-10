dashboardApp.factory('commonFactory', ['$http', '$location', '$resource', function($http, $location, $resource) {
	var factory = {};
	
	factory.postReq = function(entity, url){
		return $http({
		    url: url,
		    responseType:"json",
		    method: "POST",
		    data: entity,
		    headers: {
		        "Content-Type": "application/json"
		    }
		});
	};
	
	factory.deletEntity = function(entityCode, url){
		var url = url + "?id=" + entityCode;
		return $http({
		    url: url,
		    responseType:"json",
		    method: "DELETE",
		    headers: {
		        "Content-Type": "application/json"
		    }
		});
	}
	
	factory.deleteEntityObj = function(obj, url){
		return $http({
		    url: url,
		    responseType:"json",
		    method: "DELETE",
		    data: obj,
		    headers: {
		        "Content-Type": "application/json"
		    }
		});
	}
	
	
	factory.findEntity = function(entityCode, url){
		var url = url + "?id=" + entityCode;
		return $http({
		    url: url,
		    responseType:"json",
		    method: "GET",
		    headers: {
		        "Content-Type": "application/json"
		    }
		});
	}
	
	factory.findEntityObj = function(obj, url){
		return $http({
		    url: url,
		    responseType:"json",
		    method: "POST",
		    data: obj,
		    headers: {
		        "Content-Type": "application/json"
		    }
		});
	}
	
	
	factory.getUserThemeClass = function(){
		return $http({
		    url: 'getUserThemeClass',
		    responseType:"json",
		    method: "GET"
		}).then(function(response){
			return response;
		}, function(error){
			console.log(error);
			return error;
		});
	}
	
	factory.updateUserThemeClass = function(gtnClass){
		return $http({
		    url: 'updateUserThemeClass?gtnClass='+gtnClass,
		    responseType:"json",
		    method: "POST"
		}).then(function(response){
			return response;
		}, function(error){
			console.log(error);
			return error;
		});
	}
	
	
	factory.checkCodeAvail = function(code, url){
		return $http({
		    url: url+'?dcode='+code,
		    responseType:"json",
		    method: "GET",
		    headers: {
		        "Content-Type": "application/json"
		    }
		});
		
		/*$.ajax({
			  url: url,
			  type: 'GET',
			  cache: false,
			  success: function(html){
			    alert(html);
			  }
			});*/
	};
	
	return factory;
}]);