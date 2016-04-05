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
    
    vm.company = $rootScope.company;
    vm.uid = $rootScope.uid    
    vm.logOut = logOut;
    
    function logOut() {
      $state.go( 'login' );
    }
    
  }

})();