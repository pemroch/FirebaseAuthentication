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
        // Disables the submit button while the user is being logged in.
        vm.disableSubmit = true;
        // Displays the progress cirlce while the user is logged in.
        vm.logginIn = true;
        $http.post( '/api/createAccount', { email: vm.email, password: vm.password, company: vm.company } )
          .success( function( result ) {
          // A request to the server ( server.js ) to create a user with these credentials
          // The server creates the user then uses the company name to set a value to a user specific UID
          if( result.success ) {
            // if successful the login function is called to use these credentials to login the user
            login();
          } else {
            // if unsuccessful, the disable button is un-disabled, and the progress cirlce is hidden.
            vm.disableSubmit = false;
            vm.logginIn = false;
            // if unsuccessful, vm.error will be set to the error message returned from the server.
            vm.error: result.error;
          }
        })        
      }
    }
    function login() {
      $rootScope.firebaseAuth.$authWithPassword({
        email: vm.email,
        password: vm.password
      }).then( function( authData ) {
        // Credentials are used to login the user. The admin state will wait for the user is logged in
        // to get information about the user then use this information to get the user specific data from the server.
        $state.go( 'admin' );
      }).catch( function( error ) {
        // if unsuccessful, the submit button is un-disabled and the progress circle is hidden.
        vm.disableSubmit = false;
        vm.logginIn = false;        
        // if unsuccessful, vm.error is set to the error message returned from firebase.
        vm.error = error.message;
      });
    }
    
  }
  
})();
