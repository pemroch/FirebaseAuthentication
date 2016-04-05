( function () {
  
  'use strict';
  
  angular.module( 'createAccount.controller', [] )
    .controller( 'CreateAccount', CreateAccount );
  
  CreateAccount.$inject = [
    '$http',
    '$rootScope',
    '$state'
  ];
  
  function CreateAccount( $http, $rootScope, $state ) {
    
    var vm = this;
    
    vm.form;
    vm.company = '';
    vm.email = '';
    vm.password = '';
    vm.error = '';
    vm.disableSubmit = false;
    vm.logginIn = false;
    vm.submit = submit;
    
    $rootScope.firebaseRef.unauth();
    
    function submit() {
      if( vm.form.$valid ) {
        vm.disableSubmit = true;
        vm.logginIn = true;
        $http.post( '/api/createAccount', { email: vm.email, password: vm.password, company: vm.company } )
          .success( function( result ) {
          if( result.success ) {
            login();
          } else {
            vm.disableSubmit = false;
            vm.logginIn = false;            
            deferred.resolve({ error: result.error })
          }
        })        
      }
    }
    function login() {
      $rootScope.firebaseAuth.$authWithPassword({
        email: vm.email,
        password: vm.password
      }).then( function( authData ) {
        $state.go( 'admin' );
      }).catch( function( error ) {
        vm.disableSubmit = false;
        vm.logginIn = false;        
        vm.error = error.message;
      });
    }
    
  }
  
})();