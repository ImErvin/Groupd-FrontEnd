// Purpose of this factory is to seperate controllers from APIFactory.
// Instead this factory will handle all of the project related API requests.

angular.module('groupdApp')
    .factory('ProjectFactory', ['APIFactory',
        function(APIFactory) {
            var project = {};

            // Retrieve all projects.
            project.getProjects = function() {
                return APIFactory.project.getProjects().then(function(d) {
                    return d.data;
                })
            }

            // Retrieve one project.
            project.getProject = function(projectId) {
                return APIFactory.project.getProject(projectId).then(function(d) {
                    return d.data;
                })
            }

            // Create a project.
            project.postProject = function(project) {
                return APIFactory.project.postProject(project).then(function(d) {
                    return d.data;
                })
            }

            // Update a project.
            project.putProject = function(project) {
                return APIFactory.project.putProject(project).then(function(d) {
                    return d.data;
                })
            }

            // Delete a project.
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