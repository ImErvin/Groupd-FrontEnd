'use strict';

// Controller for login page
angular.module('groupdApp')
    .controller('LoginCtrl', ['UserFactory', '$scope', '$window',
        function(UserFactory, $scope, $window) {
            $scope.user = {
                username: "",
                password: ""
            }

            $scope.message = "Enter required (*) fields.";

            // Function to login
            $scope.userLogin = function() {
                // Convert the users input to lowercase
                $scope.user.username = $scope.user.username.toLowerCase();
                // Attempt to login with their username and password
                UserFactory.user.login($scope.user).then(function(message) {
                    $scope.message = message;
                    if (message == "Logged In") {
                        // If they're successfull the page will reload and bring you to the authenticated landing page
                        $window.location.reload();
                    }
                });
            }

        }
    ]);