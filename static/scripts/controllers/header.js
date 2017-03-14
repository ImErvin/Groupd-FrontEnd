'use strict';

angular.module('groupdApp')
  .controller('HeaderCtrl',['$scope','$cookies','$window', 
  function ($scope, $cookies, $window) {
    $scope.show = false;

    $scope.logout = function(){
        $cookies.remove('userCookie');
        $window.location.reload();
        $location.path("/login");
    }

    if($cookies.get('userCookie') == "null" || !$cookies.get('userCookie')){
        $scope.show = true;
    }else{
        $scope.username = JSON.parse($cookies.get('userCookie')).username;
        $scope.show = false;
    }
    
  }]);
