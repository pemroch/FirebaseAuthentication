( function() {
  
  'use strict';
  
  angular.module( 'app.run', [] )
    .run( RunBlock )
  
  RunBlock.$inject = [ 
    '$firebaseAuth', 
    '$rootScope', 
    '$state'
  ];
  
  function RunBlock( $firebaseAuth, $rootScope, $state ) {  
    $rootScope.uid = '';
    $rootScope.company = '';
    $rootScope.firebaseRef = new Firebase( 'https://githubsamples.firebaseio.com/' );
    $rootScope.firebaseAuth = $firebaseAuth( $rootScope.firebaseRef );
    $rootScope.$on( "$stateChangeError", function( event, toState, toParams, fromState, fromParams, error ) {
      if (error === "AUTH_REQUIRED") {
        $state.go( 'login' );
      }    
    });
  }
  
})();