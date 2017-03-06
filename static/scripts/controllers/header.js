'use strict';

angular.module('groupdApp')
  .controller('HeaderCtrl',['$scope','$cookies','$window', 
  function ($scope, $cookies, $window) {
    $scope.show = false;

    $scope.logout = function(){
        $cookies.put('userCookie', null);
        $window.location.reload();
    }


    if($cookies.get('userCookie') == "null" || !$cookies.get('userCookie')){
        $scope.show = true;
    }else{
        $scope.username = JSON.parse($cookies.get('userCookie')).username;
        $scope.show = false;
    }
    
  }]);
