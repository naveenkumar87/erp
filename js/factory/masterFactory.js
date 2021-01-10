dashboardApp.factory('masterFactory', ['$http', function($http){
	
	var factory = {};
	
	factory.saveEntity = function(entity, url){
		return $http({
		    url: url,
		    responseType:"json",
		    method: "POST",
		    data: entity,
		    headers: {
		        "Content-Type": "application/json"
		    }
		}).then(function(response){
			return response;
		}, function(error){
			console.log(error);
			return error;
		});
	}
	
	factory.searchRecords = function(entity, url){
		return $http({
		    url: url,
		    responseType:"json",
		    method: "POST",
		    data: entity,
		    headers: {
		        "Content-Type": "application/json"
		    }
		}).then(function(response){
			return response;
		}, function(error){
			console.log(error);
			return error;
		});
	}
	
	factory.searchRecordsCount = function(entity, url){
		return $http({
		    url: url,
		    responseType:"json",
		    method: "POST",
		    data: entity,
		    headers: {
		        "Content-Type": "application/json"
		    }
		}).then(function(response){
			return response;
		}, function(error){
			console.log(error);
			return error;
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
		}).then(function(response){
			return response;
		}, function(error){
			console.log(error);
			return error;
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
		}).then(function(response){
			return response;
		}, function(error){
			console.log(error);
			return error;
		});
	}
	
	factory.deletEntity = function(entityCode, url){
		var url = url + "?id=" + entityCode;
		return $http({
		    url: url,
		    responseType:"json",
		    method: "DELETE",
		    headers: {
		        "Content-Type": "application/json"
		    }
		}).then(function(response){
			return response;
		}, function(error){
			console.log(error);
			return error;
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
		}).then(function(response){
			return response;
		}, function(error){
			console.log(error);
			return error;
		});
	}
	
	factory.findExporter = function(expCode){
		return $http({
		    url: 'findExporter?expCode='+expCode,
		    responseType:"json",
		    method: "GET",
		    headers: {
		        "Content-Type": "application/json"
		    }
		}).then(function(response){
			return response;
		}, function(error){
			console.log(error);
			return error;
		});
	}
	
	factory.deleteExporter = function(expCode){
		return $http({
		    url: 'deleteExporter?expCode='+expCode,
		    responseType:"json",
		    method: "DELETE",
		    headers: {
		        "Content-Type": "application/json"
		    }
		}).then(function(response){
			return response;
		}, function(error){
			console.log(error);
			return error;
		});
	}
	
	factory.getDplAudit = function(tableKey, type){
		return $http({
		    url: 'getDplAudit?tableKey='+tableKey+'&type='+type,
		    responseType:"json",
		    method: "GET",
		    headers: {
		        "Content-Type": "application/json"
		    }
		}).then(function(response){
			return response;
		}, function(error){
			console.log(error);
			return error;
		});
	}
	
	factory.getDplAuditReason = function(statusCode){
		return $http({
		    url: 'getDplAuditReason?statusCode='+statusCode,
		    responseType:"json",
		    method: "GET",
		    headers: {
		        "Content-Type": "application/json"
		    }
		}).then(function(response){
			return response;
		}, function(error){
			console.log(error);
			return error;
		});
	}
	
	factory.updateDplAuditStatus = function(dplAuditReasonView){
		return $http({
		    url: 'updateDplAuditStatus',
		    responseType:"json",
		    method: "POST",
		    data: dplAuditReasonView,
		    headers: {
		        "Content-Type": "application/json"
		    }
		}).then(function(response){
			return response;
		}, function(error){
			console.log(error);
			return error;
		});
	}
	
	factory.getDplAuditReasonHistory = function(tableKey, type){
		return $http({
		    url: 'getDplAuditReasonHistory?tableKey='+tableKey+'&type='+type,
		    responseType:"json",
		    method: "GET",
		    headers: {
		        "Content-Type": "application/json"
		    }
		}).then(function(response){
			return response;
		}, function(error){
			console.log(error);
			return error;
		});
	}
	
	factory.getProductManufacture = function(partNo){
		return $http({
			url: 'getProductManufacture?id='+partNo,
			responseType: 'json',
			method: 'GET',
		}).then(function(response){
			return response;
		}, function(error){
			console.log(error);
			return error
		});
	}
	
	return factory;
}]);