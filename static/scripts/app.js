'use strict';

angular.module('groupdApp',['ngAnimate','ngCookies','ngMessages','ngResource','ngRoute','ngSanitize'])
.config(function($routeProvider, $locationProvider){
    $routeProvider
      .when('/welcome', {
        templateUrl: 'static/views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
      })
      .when('/home', {
        templateUrl: 'static/views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home',
        authenticated: true
      })
      .when('/signup', {
        templateUrl: 'static/views/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      })
      .when('/login', {
        templateUrl: 'static/views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: '/welcome'
      });

      $locationProvider.hashPrefix('');
})

.run(['$rootScope', '$location', 'AuthFactory', function($rootScope, $location, AuthFactory){
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currRoute){
    if(nextRoute.$$route.authenticated){
      var authenticated = AuthFactory.auth.getAuth();
      if(!authenticated){
        $location.path("/login");
      }
    }
  })
}]);