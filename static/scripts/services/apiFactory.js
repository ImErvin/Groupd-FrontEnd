// Purpose of this factory is to keep all the http requests to the API in one place.
// This factory is never directly connected to a controller, instead other factories use
// this one to make calls and pass the data to the controllers.
// One benefit of this is, if any changes were to happen to routes, i'd simply change them here
// and controllers/factories are up to date with the change.

angular.module('groupdApp')
    .factory('APIFactory', ['$http', '$q',
        function($http, $q) {

            var user = {};
            var project = {};

            // Retrieve all users;
            user.getUsers = function() {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/api/users',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(function success(response) {

                    deferred.resolve(response)
                }).catch(function(error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            // Create a user;
            user.postUser = function(user) {
                var deferred = $q.defer();


                user = JSON.stringify(user);

                $http({
                    method: 'POST',
                    url: 'http://127.0.0.1:8080/api/users',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: user,
                }).then(function success(response) {

                    deferred.resolve(response)
                }).catch(function(error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            // Retrieve one user.
            user.getUser = function(username) {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/api/users/' + username,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(function success(response) {
                    deferred.resolve(response);
                }).catch(function(error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            // Update a user.
            user.putUser = function(user) {
                var deferred = $q.defer();

                if (typeof user === "object") {
                    user = JSON.stringify(user);
                }

                $http({
                    method: 'PUT',
                    url: 'http://127.0.0.1:8080/api/users/' + user.username,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: user,
                }).then(function success(response) {
                    deferred.resolve(response);
                }).catch(function(error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            // Delete a user. (Not implemented but planned for future development)
            project.deleteUser = function(user) {
                var deferred = $q.defer();

                if (typeof user === "object") {
                    project = JSON.stringify(user);
                }

                $http({
                    method: 'DELETE',
                    url: 'http://127.0.0.1:8080/api/projects/' + user.username,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: user,
                }).then(function success(response) {
                    deferred.resolve(response);
                }).catch(function(error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            // Retrieve one project
            project.getProject = function(projectId) {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/api/projects/' + projectId,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(function success(response) {
                    deferred.resolve(response);
                }).catch(function(error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            // Retrieve all projects;
            project.getProjects = function() {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: 'http://127.0.0.1:8080/api/projects/',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(function success(response) {
                    deferred.resolve(response);
                }).catch(function(error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            // Create a project
            project.postProject = function(project) {
                var deferred = $q.defer();

                if (typeof project === "object") {
                    project = JSON.stringify(project);
                }

                $http({
                    method: 'POST',
                    url: 'http://127.0.0.1:8080/api/projects/',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: project,
                }).then(function success(response) {
                    deferred.resolve(response);
                }).catch(function(error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            // Update a project.
            project.putProject = function(project) {
                var deferred = $q.defer();

                if (typeof project === "object") {
                    project = JSON.stringify(project);
                }

                $http({
                    method: 'PUT',
                    url: 'http://127.0.0.1:8080/api/projects/' + project.projectId,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: project,
                }).then(function success(response) {
                    deferred.resolve(response);
                }).catch(function(error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            // Delete a project.
            project.deleteProject = function(project) {
                var deferred = $q.defer();

                if (typeof project === "object") {
                    project = JSON.stringify(project);
                }

                $http({
                    method: 'DELETE',
                    url: 'http://127.0.0.1:8080/api/projects/' + project.projectId,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: project,
                }).then(function success(response) {
                    deferred.resolve(response);
                }).catch(function(error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            return {
                user: user,
                project: project
            }
        }
    ]);