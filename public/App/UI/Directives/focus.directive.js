// Directive used to automatically focus on an input once the page is loaded.
( function() {
  
  'use strict';
  
  angular.module( 'focus.directive', [] )
  .directive( 'focus', focus ); 
  
  focus.$inject = [
    '$timeout'
    ];
  
  function focus( $timeout ) {
    return {
      restrict: 'A',
      link : function( $scope, $element ) {
        $timeout( function() {
          $element[ 0 ].focus();
        });
      }
    }
  };
  
})();
