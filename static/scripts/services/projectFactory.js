angular.module('groupdApp')
.factory('ProjectFactory' ,['APIFactory', 
function(APIFactory){
    var project = {};

    project.getProjects = function(){
        return APIFactory.project.getProjects().then(function(d){
            return d.data;
        })
    }

    project.getProject = function(){
        return APIFactory.project.getProject().then(function(d){
            return d.data;
        })
    }

    project.postProject = function(project){
        return APIFactory.project.postProject(project).then(function(d){
            return d.data;
        })
    }
    return {
        project: project
    }
}]);