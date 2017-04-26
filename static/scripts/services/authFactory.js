angular.module('groupdApp')
    .factory('AuthFactory', ['$cookies',
        function($cookies) {
            var auth = {};

            auth.setAuth = function(authToken, username) {
                var date = new Date();
                var cookie = {
                    username: username,
                    authToken: authToken
                }
                date.setTime(date.getTime() + (60 * 60 * 1000));
                $cookies.put('userCookie', JSON.stringify(cookie), {
                    'expires': date
                });
                auth.token = authToken;
            }

            auth.getAuth = function() {
                console.log($cookies.get('userCookie'));

                return $cookies.get('userCookie');
            }

            auth.deleteAuth = function() {
                $cookies.remove('userCookie');
            }

            return {
                auth: auth
            }
        }
    ]);