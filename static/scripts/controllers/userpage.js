'use strict';

angular.module('groupdApp')
  .controller('UserPageCtrl',['UserPageFactory','$scope','$routeParams', '$cookies',
  function (UserPageFactory, $scope, $routeParams, $cookies) {
    $scope.currentUser = false;
    $scope.userFound = false;

    UserPageFactory.user.getUser($routeParams.username).then(function(d){
        if(!d){
            $scope.errorMessage = "User with username: '"+$routeParams.username+"' was not found.";
        }else{
            $scope.user = d;
            $scope.userFound = true;
            if($cookies.get('userCookie')){
                if($scope.user.username === JSON.parse($cookies.get('userCookie')).username){
                    $scope.currentUser = true;
                    console.log("settrue");
                }
            }
        }
    });
    
  }]);
