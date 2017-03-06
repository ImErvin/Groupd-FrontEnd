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
      .when('/pages/:username', {
        templateUrl: 'static/views/userpage.html',
        controller: 'UserPageCtrl',
        controllerAs: 'userpage'
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

.run(['$rootScope', '$location', 'AuthFactory','$cookies', 
function($rootScope, $location, AuthFactory, $cookies){
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currRoute){
    if(nextRoute.$$route.originalPath == "/welcome" && $cookies.get('userCookie')){
          $location.path('/home');
        }
    
    if(nextRoute.$$route.originalPath == "/login" && $cookies.get('userCookie')){
          $location.path('/home');
        }

    if(nextRoute.$$route.authenticated){
      var authenticated = AuthFactory.auth.getAuth();
      //console.log(authenticated);
      if(!authenticated){
        $location.path("/login");
      }
    }
  })
}]);