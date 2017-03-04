angular.module('groupdApp')
.factory('AuthFactory' ,[function(){
    var auth = {};

    auth.setAuth = function(authToken){
        auth.token = authToken;
    }

    auth.getAuth = function(){
        return auth.token;
    }

    return auth;
}]);