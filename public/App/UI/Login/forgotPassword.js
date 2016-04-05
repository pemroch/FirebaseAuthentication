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
        var ref = $rootScope.firebaseAuth;
        ref.$resetPassword({
          email: vm.email
        }).then( function() {
          vm.success = true;
        }).catch( function( error ) {
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