angular.module('groupdApp')
.factory('UserFactory' ,['APIFactory','AuthFactory', 
function(APIFactory, AuthFactory){
    var user = {};

    function generateToken(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 15; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    
    // User.login function to contact the APIFactory for user details.
    user.login = function(user){
        return APIFactory.user.getUser(user.username).then(function(d){
            if(d.data.username == user.username && d.data.password == user.password){
                AuthFactory.auth.setAuth(generateToken(), d.data.username);
                return "Logged In";
            }else{
                return "Username or Password is incorrect. Try again.";
            }
        });
    }
    
    // user.create function to contact the APIFactory to create a user.
    user.create = function(user){
        return APIFactory.user.postUser(user).then(function(d){
            if(d.status == 200){
                console.log("200");
                AuthFactory.auth.setAuth(generateToken(), user.username);
                return d;
            }

        });
    }

    return {
        user: user
    }
}]);