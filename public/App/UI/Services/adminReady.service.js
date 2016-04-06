( function() {
  
  'use strict';

  angular.module( 'adminReady.service', [] )
    .factory( 'AdminReadyService', AdminReadyService ) 

    AdminReadyService.$inject = [ 
      '$http', 
      '$q', 
      '$rootScope'
    ];

    function AdminReadyService( $http, $q, $rootScope ) {

      return adminReadyService;

      function adminReadyService() { 
        var deferred = $q.defer();
        // Once logged in the user object is requested
        var authData = $rootScope.firebaseRef.getAuth();
        if ( authData ) {
          // If the user is logged in, the UID in the user object will be used 
          // to access user specific data from the server
          $http.post( '/api/adminReady', { data: authData.uid } )
            .success( function( result ) {
            // if successful global values are set from values returned from the server in server.js file
            // A global value for uid is set to the user's UID
            $rootScope.uid = authData.uid;
            // A global value for the company name is set to the company name set
            // when the user was created.
            $rootScope.company = result.company;            
            deferred.resolve();
          })
            .error( function( err ) {
            // If unsuccessful, the promise will be rejected and a stateChange will be handled
            // and the user will be redirected to the login page ( stateChange handled from /public/App/app.run.js )
            deferred.reject();
          });          
          return deferred.promise;
        }
      }
      
    }
  
})();
