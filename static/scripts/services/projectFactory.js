angular.module('groupdApp')
    .factory('ProjectFactory', ['APIFactory',
        function(APIFactory) {
            var project = {};

            project.getProjects = function() {
                return APIFactory.project.getProjects().then(function(d) {
                    console.log(d.data[0]);
                    return d.data;
                })
            }

            project.getProject = function(projectId) {
                return APIFactory.project.getProject(projectId).then(function(d) {
                    return d.data;
                })
            }

            project.postProject = function(project) {
                return APIFactory.project.postProject(project).then(function(d) {
                    return d.data;
                })
            }

            project.putProject = function(project) {
                return APIFactory.project.putProject(project).then(function(d) {
                    return d.data;
                })
            }

            project.deleteProject = function(project) {
                return APIFactory.project.deleteProject(project).then(function(d) {
                    return d.data;
                })
            }
            return {
                project: project
            }
        }
    ]);