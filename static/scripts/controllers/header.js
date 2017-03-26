'use strict';

angular.module('groupdApp')
  .controller('HeaderCtrl',['AuthFactory','$scope','$window', '$location',
  function (AuthFactory, $scope, $window, $location) {
    $scope.show = false;

    $scope.logout = function(){
        AuthFactory.auth.deleteAuth();
        $window.location.reload();
        $location.path("/login");
    }

    if(!AuthFactory.auth.getAuth()){
        $scope.show = true;
    }else{
        $scope.username = JSON.parse(AuthFactory.auth.getAuth()).username;
        $scope.show = false;
    }
    
  }]);
