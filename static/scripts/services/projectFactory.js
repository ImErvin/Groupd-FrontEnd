angular.module('groupdApp')
.factory('ProjectFactory' ,['APIFactory', 
function(APIFactory){
    var project = {};

    project.all = function(){
        return APIFactory.project.getProjects().then(function(d){
            return d.data;
        })
    }

    return {
        project: project
    }
}]);