angular.module('$utilityElements', [])
.directive('loader',['$timeout','$rootScope', function($timeout, $rootScope) {
    return {
      restrict: 'A',
      template: '<div id="oneloader" class="hiddenload">loading...</div>',
      replace: true,
      compile: function (scope, element, attrs) {
        $timeout(function(){
          $rootScope
              .$on('$stateChangeStart',
                  function(event, toState, toParams, fromState, fromParams){
                      $("#oneloader").removeClass("hiddenload");
              });

          $rootScope
              .$on('$stateChangeSuccess',
                  function(event, toState, toParams, fromState, fromParams){
            	  	
                      //add a little delay
                      $timeout(function(){
                        $("#oneloader").addClass("hiddenload");
                      },500)
              });
        }, 0);
      }
    }
  }]);