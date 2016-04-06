( function () {
  
  'use strict';

  angular.module( 'login.controller', [] )
    .controller( 'Login', Login );
  
  Login.$inject = [
    '$http',
    '$mdDialog',
    '$rootScope',
    '$state'
  ];
  
  function Login ( $http, $mdDialog, $rootScope, $state ) {
    var vm = this;
    
    vm.form;
    vm.error = '';
    vm.email = '';
    vm.password = '';    
    vm.disableSubmit = false;
    vm.logginIn = false;
    vm.submit = submit;
    vm.forgotPassword = forgotPassword;
    
    $rootScope.firebaseRef.unauth();
    
    function forgotPassword( $event ) {
      // Dialog to display and email input to request a password reset.
      $mdDialog.show({
        controller: 'ForgotPassword',
        templateUrl: 'App/UI/Login/forgotPassword.html',
        parent: angular.element( document.body ),
        targetEvent: $event,
        clickOutsideToClose: true,
        controllerAs: 'forgotPassword',
      })
    }
    function submit( $event ) {
      if( vm.form.$valid ) {
        // If the form is valid the submit button is disabled.
        vm.disableSubmit = true;
        // If the form is valid the progress circle is shown.
        vm.logginIn = true;
        $rootScope.firebaseAuth.$authWithPassword({
          email: vm.email,
          password: vm.password
        }).then( function( authData ) {
          // Credentials are used to login the user. The 'admin' state will wait for the user to be
          // logged in then use these credentials to get a user specific UID to request user specific information from the server.
          $state.go( 'admin' );
        }).catch( function( error ) {
          // If unsuccessful, the submit button is un-disabled and the progess cirlce is hidden.
          vm.disableSubmit = false;
          vm.logginIn = false;        
          // if unsuccessful, vm.error is set to an error message returned from firebase.
          vm.error = error.message;
        });
      } 
    }
    
  }

})();
