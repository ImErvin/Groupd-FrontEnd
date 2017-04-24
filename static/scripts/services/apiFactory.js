angular.module('groupdApp')
.factory('APIFactory' ,['$http', '$q', 
function($http, $q){

    var user = {};
    var project = {};

    
    user.postUser = function(user){
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
            //console.log(response.data.text);

            deferred.resolve(response)
        }).catch(function(error){
            deferred.reject(error);
        });

        return deferred.promise;
    }

    user.getUser = function(username){
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: 'http://127.0.0.1:8080/api/users/'+username,
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(function success(response) {
            deferred.resolve(response);
        }).catch(function(error){
            deferred.reject(error);
        });

        return deferred.promise;
    }

    project.getProject = function(projectId){
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: 'http://127.0.0.1:8080/api/projects/'+projectId,
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(function success(response) {
            deferred.resolve(response);
        }).catch(function(error){
            deferred.reject(error);
        });

        return deferred.promise;
    }

    project.getProjects = function(){
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: 'http://127.0.0.1:8080/api/projects/',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(function success(response) {
            deferred.resolve(response);
        }).catch(function(error){
            deferred.reject(error);
        });

        return deferred.promise;
    }

    project.postProject = function(project){
        var deferred = $q.defer();

        if(typeof project === "object"){
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
        }).catch(function(error){
            deferred.reject(error);
        });

        return deferred.promise;
    }

    project.putProject = function(project){
        var deferred = $q.defer();

        if(typeof project === "object"){
            project = JSON.stringify(project);
        }
        
        $http({
            method: 'PUT',
            url: 'http://127.0.0.1:8080/api/projects/'+project.projectId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: project,
        }).then(function success(response) {
            deferred.resolve(response);
        }).catch(function(error){
            deferred.reject(error);
        });

        return deferred.promise;
    }

    project.deleteProject = function(project){
        var deferred = $q.defer();

        if(typeof project === "object"){
            project = JSON.stringify(project);
        }
        
        $http({
            method: 'DELETE',
            url: 'http://127.0.0.1:8080/api/projects/'+project.projectId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: project,
        }).then(function success(response) {
            deferred.resolve(response);
        }).catch(function(error){
            deferred.reject(error);
        });

        return deferred.promise;
    }

    return{
        user: user,
        project: project
    }
}]);