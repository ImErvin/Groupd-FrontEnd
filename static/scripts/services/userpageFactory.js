angular.module('groupdApp')
.factory('UserPageFactory' ,['APIFactory','AuthFactory', 
function(APIFactory, AuthFactory){
    var user = {};

    // User.login function to contact the APIFactory for user details.
    user.getUser = function(username){
        return APIFactory.user.getUser(username).then(function(d){
            if(d.data.message == "404"){
                console.log("404");
            }else{
                console.log(d.data);
                return d.data;
            }
        });
    }
    

    return {
        user: user
    }
}]);