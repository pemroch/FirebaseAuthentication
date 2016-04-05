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
        var authData = $rootScope.firebaseRef.getAuth();
        if ( authData ) {
          $http.post( '/api/adminReady', { data: authData.uid } )
            .success( function( result ) {
            $rootScope.uid = result.uid;
            $rootScope.company = result.company;            
            deferred.resolve();
          })
            .error( function( err ) {
            deferred.reject();
          });          
          return deferred.promise;
        }
      }
      
    }
  
})();