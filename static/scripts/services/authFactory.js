angular.module('groupdApp')
.factory('AuthFactory' ,['$cookies',
function($cookies){
    var auth = {};

    auth.setAuth = function(authToken, username){
        var date = new Date();
        date.setTime(date.getTime() + (60 * 60 * 1000));
        $cookies.put('userCookie', JSON.stringify(username), authToken, {'expires':date});
        auth.token = authToken;
    }

    auth.getAuth = function(){
        console.log($cookies.get('userCookie'));
        
        return $cookies.get('userCookie');
    }

    return{
        auth : auth
    } 
}]);