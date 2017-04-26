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
      .when('/project/create', {
        templateUrl: 'static/views/createproject.html',
        controller: 'CreateProjectCtrl',
        controllerAs: 'createproject',
        authenticated: true
      })
      .when('/project/:projectId', {
        templateUrl: 'static/views/projectpage.html',
        controller: 'ProjectPageCtrl',
        controllerAs: 'projectpage'
      })
      .when('/project/:projectId/edit', {
        templateUrl: 'static/views/projectpageedit.html',
        controller: 'ProjectPageEditCtrl',
        controllerAs: 'projectpageedit',
        authenticated: true
      })
      .when('/pages/:username', {
        templateUrl: 'static/views/userpage.html',
        controller: 'UserPageCtrl',
        controllerAs: 'userpage'
      })
      .when('/pages/:username/edit', {
        templateUrl: 'static/views/userpageedit.html',
        controller: 'UserPageEditCtrl',
        controllerAs: 'userpageedit',
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

.run(['$rootScope', '$location', 'AuthFactory', 
function($rootScope, $location, AuthFactory){
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currRoute){
    if(nextRoute.$$route.originalPath == "/welcome" && AuthFactory.auth.getAuth() ||
       nextRoute.$$route.originalPath == "/login" && AuthFactory.auth.getAuth() ||
       nextRoute.$$route.originalPath == "/signup" && AuthFactory.auth.getAuth()){
          $location.path('/home');
      }

    if(nextRoute.$$route.authenticated){
      if(!AuthFactory.auth.getAuth()){
         $location.path("/login");
      }
    }
  })
}]);