( function () {
  
  'use strict';

  angular.module( 'FirebaseAuth', [
    'firebase',
    'ui.router', 
    'ngMaterial',
    'app.config',
    'app.run', 
    'focus.directive',
    'app.controllers',
    'app.services'
  ]);

})();