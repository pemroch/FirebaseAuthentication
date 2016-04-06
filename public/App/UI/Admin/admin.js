( function () {
  
  'use strict';
  
  angular.module( 'admin.controller', [] )
    .controller( 'Admin', Admin );
  
  Admin.$inject = [
    '$rootScope',
    '$state'
  ];
  
  function Admin( $rootScope, $state ) {
    
    var vm = this;
    
    // Displays global object set from user specific values returned from the server.
    vm.company = $rootScope.company;
    vm.uid = $rootScope.uid    
    
    vm.logOut = logOut;
    
    function logOut() {
      // Returns the user to the login page
      $state.go( 'login' );
    }
    
  }

})();
