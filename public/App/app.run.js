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
    // Global objects used throughout the application.
    $rootScope.uid = '';
    $rootScope.company = '';
    $rootScope.firebaseRef = new Firebase( /* your firebase url */ );
    $rootScope.firebaseAuth = $firebaseAuth( $rootScope.firebaseRef );
    $rootScope.$on( "$stateChangeError", function( event, toState, toParams, fromState, fromParams, error ) {
      if (error === "AUTH_REQUIRED") {
        // stateChanged error used to redirect a user to the login screen if the user is no logged in.
        $state.go( 'login' );
      }    
    });
  }
  
})();
