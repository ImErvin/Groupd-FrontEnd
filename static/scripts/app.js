'use strict';

// Angular application named 'groupdApp', uses ngCookies for local storage and ngRoute
// to handle routing.
angular.module('groupdApp', ['ngCookies', 'ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            // Welcome route, this is the landing page for unauthenticated in users
            .when('/welcome', {
                templateUrl: 'static/views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main',
            })
            // Home route, this is the landing page of authenticated users
            .when('/home', {
                templateUrl: 'static/views/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'home',
                authenticated: true
            })
            // Create project route, this is the route to create a project
            .when('/project/create', {
                templateUrl: 'static/views/createproject.html',
                controller: 'CreateProjectCtrl',
                controllerAs: 'createproject',
                authenticated: true
            })
            // Project route, this route will display the project with route parameter :projectId
            .when('/project/:projectId', {
                templateUrl: 'static/views/projectpage.html',
                controller: 'ProjectPageCtrl',
                controllerAs: 'projectpage'
            })
            // Edit project route, this will allow users to edit project with route parameter :projectId
            .when('/project/:projectId/edit', {
                templateUrl: 'static/views/projectpageedit.html',
                controller: 'ProjectPageEditCtrl',
                controllerAs: 'projectpageedit',
                authenticated: true
            })
            // User page route, this route will display the user with route parameter :username
            .when('/pages/:username', {
                templateUrl: 'static/views/userpage.html',
                controller: 'UserPageCtrl',
                controllerAs: 'userpage'
            })
            // Edit user route, this route will allow users to edit their details
            .when('/pages/:username/edit', {
                templateUrl: 'static/views/userpageedit.html',
                controller: 'UserPageEditCtrl',
                controllerAs: 'userpageedit',
                authenticated: true
            })
            // Sign up route, to sign up
            .when('/signup', {
                templateUrl: 'static/views/signup.html',
                controller: 'SignupCtrl',
                controllerAs: 'signup'
            })
            // Sign in route, to sign in
            .when('/login', {
                templateUrl: 'static/views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            // Default is the unauthenticated route
            .otherwise({
                redirectTo: '/welcome'
            });
        
        // To get rid of ! in the url adapted from : https://scotch.io/tutorials/pretty-urls-in-angularjs-removing-the-hashtag
        $locationProvider.hashPrefix('');
    })

    .run(['$rootScope', '$location', 'AuthFactory',
        function($rootScope, $location, AuthFactory) {
            // If the user is authenticated, they cannot navigate to the unauthenticated landing page, instead
            // they're redirected to the authenticated landing page. [User experience]
            $rootScope.$on('$routeChangeStart', function(event, nextRoute, currRoute) {
                if (nextRoute.$$route.originalPath == "/welcome" && AuthFactory.auth.getAuth() ||
                    nextRoute.$$route.originalPath == "/login" && AuthFactory.auth.getAuth() ||
                    nextRoute.$$route.originalPath == "/signup" && AuthFactory.auth.getAuth()) {
                    $location.path('/home');
                }
                
                // If they're not authenticated and the route required authentication, send them to the login
                // screen. [Security] [User experience]
                if (nextRoute.$$route.authenticated) {
                    if (!AuthFactory.auth.getAuth()) {
                        $location.path("/login");
                    }
                }
            })
        }
    ]);