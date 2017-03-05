angular.module('groupdApp')
.factory('UserFactory' ,['APIFactory','AuthFactory', 
function(APIFactory, AuthFactory){
    var user = {};

    // User.login function to contact the APIFactory for user details.
    user.login = function(username, password){
        return APIFactory.user.loginUser(username).then(function(d){
            if(d.data.username == username && d.data.password == password){
                AuthFactory.auth.setAuth(true);
                return "Logged In";
            }else{
                return "Username or Password is incorrect. Try again.";
            }
        });
    }
    
    // user.create function to contact the APIFactory to create a user.
    user.create = function(user){
        return APIFactory.user.createUser(user).then(function(d){
            if(d.status == 200){
                console.log("200");
                return d;
            }

        });
    }

    return {
        user: user
    }
}]);