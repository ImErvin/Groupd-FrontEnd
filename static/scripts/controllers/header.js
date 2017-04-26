'use strict';

angular.module('groupdApp')
  .controller('HeaderCtrl',['UserFactory','AuthFactory','$scope','$window', '$location',
  function (UserFactory, AuthFactory, $scope, $window, $location) {
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

    $scope.bookmarkProject = function(projectId){
        UserFactory.user.getUser($scope.username).then(function(d){
            d.bookmarks.push(projectId);
            UserFactory.user.putUser($scope.username).then(function(d){
                console.log(d);
            })
        });
    }
    
  }]);
