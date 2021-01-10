dashboardApp.directive( 'erpClick', function ( $location ) {
  return function ( scope, element, attrs ) {
    var path;

    attrs.$observe( 'erpClick', function (val) {
      path = val;
    });

    element.bind( 'click', function () {
      scope.$apply( function () {
        $location.path( path );
      });
    });
  };
});


dashboardApp.directive('gtnLoading',   ['$http', '$window' ,function ($http, $window)
{
    return {
        restrict: 'A',
        link: function (scope, elm, attrs)
        {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (v)
            {
                if(v){
                	//console.log(elm);
                	if(elm.attr('data-load') == "true"){
                		elm.show();
                	}                    
                }else{
                	//console.log(elm);
                    elm.hide();
                    //alert(elm.attr('data-scroll'));
                    if(elm.attr('data-scroll') == "true"){
                    	//angular.element('html,body').animate({ scrollTop: 0 }, 250);
                    }else{
                    	angular.element('#preloader').attr('data-scroll', "true");
                    }
                    angular.element('#preloader').attr('data-load', "true");
                }
            });
        }
    };
}]);

/**
 * This directive is used for file upload in GTN.
 */
dashboardApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
           var model = $parse(attrs.fileModel);
           var modelSetter = model.assign;
           
           element.bind('change', function(){
              scope.$apply(function(){
                 modelSetter(scope, element[0].files[0]);
              });
           });
        }
     };
}]);

/**
* This directive is used to track unsaved changes in form name as exportForm
*/
dashboardApp.directive('confirmOnExit', function() {
    return {
        link: function($scope, elem, attrs) {
            window.onbeforeunload = function(){
                if ($scope.exportForm.$dirty) {
                    return "There are unsaved changes, do you want to stay on the page?";
                }
            }
            $scope.$on('$locationChangeStart', function(event, next, current) {
                if ($scope.exportForm.$dirty) {
                    if(!confirm("You have unsaved changes, do you want to navigate to other page?")) {
                        event.preventDefault();
                    }
                }
            });
        }
    };
});


function blockScroll(){
	angular.element('#preloader').attr('data-scroll', "false");
}
function blockLoader(){
	angular.element('#preloader').attr('data-load', "false");
}
function unblockLoader(){
	angular.element('#preloader').attr('data-scroll', "true");
}
function scroll(){
	angular.element('html,body').animate({ scrollTop: 0 }, 250);
}