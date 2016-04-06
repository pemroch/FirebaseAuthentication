( function() {
  
  'use strict';
  
  angular.module( 'login.forgotPassword', [] )
    .controller( 'ForgotPassword', ForgotPassword )
  
  ForgotPassword.$inject = [ 
    '$mdDialog',
    '$rootScope'
  ];
  
  function ForgotPassword( $mdDialog, $rootScope ) {
    
    var vm = this;
    
    vm.form;
    vm.error = '';
    vm.success = false;
    vm.submit = submit;
    vm.hide = hide;
    
    function hide() {
      $mdDialog.hide();
    }      
    function submit() {
      if( vm.form.$valid ) {
        var ref = $rootScope.firebaseAuth
        // Request a password reset from firebase using the user's email address.
        ref.$resetPassword({
          email: vm.email
        }).then( function() {
          // If successful, a success message is displayed to the user.
          vm.success = true;
        }).catch( function( error ) {
          // If unsuccessful, an error message is displayed to the user.
          switch ( error.code ) {
            case "INVALID_USER":
              vm.error = 'The specified user account does not exist.';
              break;
            default:
              vm.error = 'Error resetting password: ' + error;
          }   
        });        
      }
    }
    
  }
  
})();
