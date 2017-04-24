'use strict';

angular.module('groupdApp')
  .controller('UserPageCtrl',['UserFactory','AuthFactory','$scope','$routeParams',
  function (UserFactory,AuthFactory, $scope, $routeParams) {
    $scope.currentUser = false;
    $scope.userFound = false;

    UserFactory.user.getUser($routeParams.username).then(function(d){
        if(!d){
            $scope.errorMessage = "User with username: '"+$routeParams.username+"' was not found.";
        }else{
            $scope.user = d;
            $scope.userFound = true;
            if(AuthFactory.auth.getAuth()){
                if($scope.user.username === JSON.parse(AuthFactory.auth.getAuth()).username){
                    $scope.currentUser = true;
                }
            }
        }
    });
    
  }]);
