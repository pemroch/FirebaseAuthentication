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
        vm.disableSubmit = true;
        vm.logginIn = true;
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
    
  }

})();