angular.module('groupdApp')
    .factory('UserFactory', ['APIFactory', 'AuthFactory',
        function(APIFactory, AuthFactory) {
            var user = {};

            function generateToken() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < 15; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            }  

           user.getUsers = function(){
                return APIFactory.user.getUsers().then(function(d) {
                if (!d) {
                    console.log("woops");
                } else {
                    console.log(d.data);
                    return d.data;
                }
            });
           }
            // User.login function to contact the APIFactory for user details.
            user.login = function(user) {
                return APIFactory.user.getUser(user.username).then(function(d) {
                    if (d.data.username == user.username && d.data.password == user.password) {
                        AuthFactory.auth.setAuth(generateToken(), d.data.username);
                        return "Logged In";
                    } else {
                        return "Username or Password is incorrect. Try again.";
                    }
                });
            }

            // user.create function to contact the APIFactory to create a user.
            user.create = function(user) {
                return APIFactory.user.postUser(user).then(function(d) {
                    if (d.data.message == "Saved") {
                        AuthFactory.auth.setAuth(generateToken(), user.username);
                        return d;
                    } else {
                        return d;
                    }

                });
            }

            user.getUser = function(username) {
                return APIFactory.user.getUser(username).then(function(d) {
                    if (d.data.message == "404") {
                        console.log("404");
                    } else {
                        console.log(d.data);
                        return d.data;
                    }
                });
            }

            user.putUser = function(user) {
                return APIFactory.user.putUser(user).then(function(d) {
                    if (d.data.message == "404") {
                        console.log("404");
                    } else {
                        console.log(d.data);
                        return d.data;
                    }
                });
            }

            user.deleteUser = function(username) {
                return APIFactory.user.deleteUser(username).then(function(d) {
                    if (d.data.message == "404") {
                        console.log("404");
                    } else {
                        console.log(d.data);
                        return d.data;
                    }
                });
            }

            return {
                user: user
            }
        }
    ]);