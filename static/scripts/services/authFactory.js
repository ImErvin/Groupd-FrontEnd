angular.module('groupdApp')
.factory('AuthFactory' ,['$cookies',
function($cookies){
    var auth = {};

    auth.setAuth = function(authToken, user){
        var date = new Date();
        date.setTime(date.getTime() + (60 * 60 * 1000));
        $cookies.put('userCookie', JSON.stringify(user), {'expires':date});
        auth.token = authToken;
    }

    auth.getAuth = function(){
        console.log($cookies.get('userCookie'));
        if($cookies.get('userCookie') == "null"){
            return auth.token = false;
        }else if($cookies.get('userCookie')){
            return auth.token = true;
        }else{
            return auth.token;            
        }
    }

    return{
        auth : auth
    } 
}]);