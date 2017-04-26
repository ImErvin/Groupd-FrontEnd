// Purpose of this factory is to reuse ngCookies without having to inject it into every controller.
// Instead this factory will handle the cookie.

angular.module('groupdApp')
    .factory('AuthFactory', ['$cookies',
        function($cookies) {
            var auth = {};

            // Create cookie with username and token.
            auth.setAuth = function(authToken, username) {
                var date = new Date();
                var cookie = {
                    username: username,
                    authToken: authToken
                }
                // 30 minute expiration.
                date.setTime(date.getTime() + (60 * 60 * 1000));
                $cookies.put('userCookie', JSON.stringify(cookie), {
                    'expires': date
                });
                auth.token = authToken;
            }

            // Retrieve cookie.
            auth.getAuth = function() {
                return $cookies.get('userCookie');
            }

            // Delete cookie.
            auth.deleteAuth = function() {
                $cookies.remove('userCookie');
            }

            return {
                auth: auth
            }
        }
    ]);