angular.module('groupdApp')
.controller('RouteAuthCtrl', ['$scope', 'session', '$location',
    function($scope, session, $location) {

        $scope.$on('$routeChangeStart', function(angularEvent, newUrl) {
            console.log("Yup");
            if (newUrl.requireAuth && !session.user) {
                // User isn’t authenticated
                $location.path("/login");
            }

        });
    }
]);