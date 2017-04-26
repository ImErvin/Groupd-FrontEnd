'use strict';

//Header controller
angular.module('groupdApp')
  .controller('HeaderCtrl',['AuthFactory','$scope','$window', '$location',
  function (AuthFactory, $scope, $window, $location) {
    $scope.show = false;

    //When someone logs out, reload the page to update the header
    $scope.logout = function(){
        AuthFactory.auth.deleteAuth();
        $window.location.reload();
        $location.path("/login");
    }

    // Determine which buttons to show depending on the cookie
    if(!AuthFactory.auth.getAuth()){
        $scope.show = true;
    }else{
        $scope.username = JSON.parse(AuthFactory.auth.getAuth()).username;
        $scope.show = false;
    }
    
  }]);
