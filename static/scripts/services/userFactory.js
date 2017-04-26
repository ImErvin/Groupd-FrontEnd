
// Purpose of this factory is to not have a direct link between controllers and APIfactory.
// Instead this factory will take care of all user related API requests.

angular.module('groupdApp')
    .factory('UserFactory', ['APIFactory', 'AuthFactory',
        function(APIFactory, AuthFactory) {
            var user = {};

            // Randomly generated token for authentication key. Adapted : http://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
            function generateToken() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < 15; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            }

            // Retrieve all users.
            user.getUsers = function() {
                return APIFactory.user.getUsers().then(function(d) {
                    if (!d) {} else {
                        return d.data;
                    }
                });
            }

            // Retrieve one user and add them to a cookie.
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

            // Create a user.
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

            // Retrieve one user.
            user.getUser = function(username) {
                return APIFactory.user.getUser(username).then(function(d) {
                    if (d.data.message == "404") {} else {
                        return d.data;
                    }
                });
            }

            // Update a user.
            user.putUser = function(user) {
                return APIFactory.user.putUser(user).then(function(d) {
                    if (d.data.message == "404") {} else {
                        return d.data;
                    }
                });
            }

            // Delete a user.
            user.deleteUser = function(username) {
                return APIFactory.user.deleteUser(username).then(function(d) {
                    if (d.data.message == "404") {} else {
                        return d.data;
                    }
                });
            }

            return {
                user: user
            }
        }
    ]);