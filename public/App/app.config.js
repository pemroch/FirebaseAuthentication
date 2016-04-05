( function() {
  
  'use strict';
  
  angular.module( 'app.config', [] )
    .config( Config )

    Config.$inject = [ 
      '$stateProvider', 
      '$urlRouterProvider' 
    ];

    function Config( $stateProvider, $urlRouterProvider ) { 

      $stateProvider
      
      //Create Account UI
      
        .state( 'createAccount', {
        url: '/createAccount',
        templateUrl: 'App/UI/CreateAccount/createAccount.html',
        controller: 'CreateAccount as createAccount'
      })
      
      //Login UI
      
        .state( 'login', {
        url: '/login',
        templateUrl: 'App/UI/Login/login.html',
        controller: 'Login as login'      
      })
      
      //Admin UI
      
        .state( 'admin', {
        url: '/admin',
        templateUrl: 'App/UI/Admin/admin.html',
        controller: 'Admin as admin',
        resolve: {
          'ready': [ "AdminReadyService", function( AdminReadyService ) {
            return AdminReadyService();
          }],
          'reqAuth': [ "$rootScope", function( $rootScope ) {
            return $rootScope.firebaseAuth.$requireAuth();
          }]
        }
      })
      
      $urlRouterProvider.otherwise( '/login' );
    
    }
    
})();