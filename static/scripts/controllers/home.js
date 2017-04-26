'use strict';

angular.module('groupdApp')
    .controller('HomeCtrl', ['UserFactory', 'ProjectFactory', '$scope',
        function(UserFactory, ProjectFactory, $scope) {
            $scope.searchOn = false;
            $scope.searchWord;
            $scope.searchResultsProjects = []; // Empty array for search results
            $scope.searchResultsUsers = []; // Empty array for search results

            // Retrieve all the projects and add them to an array and display them reversed
            ProjectFactory.project.getProjects().then(function(d) {
                $scope.projects = [];
                for (var n in d) {
                    $scope.projects.push(d[n]);

                }
                if ($scope.projects.length == 0) {
                    $scope.noProjects = true;
                }
                $scope.projects.reverse();
            })

            // Search function
            $scope.search = function() {
                // Set results empty every time
                $scope.searchResultsProjects = [];
                $scope.searchResultsUsers = [];
                alreadyThere = false;

                // Loop over all the projects
                for (var i in $scope.projects) {
                    // If the search condition matches the project name, add it to the results
                    if ($scope.searchWord == $scope.projects[i].projectName) {
                        $scope.searchResultsProjects.push($scope.projects[i]);
                    }
                }

                // Retrieve all the users
                UserFactory.user.getUsers().then(function(d) {
                    var alreadyThere = false;
                    // Loop over all the users
                    for (var i in d) {
                        // If the search condition matches their username/firstName/surname/occupation, add it to the results
                        if ($scope.searchWord.toLowerCase() == d[i].username.toLowerCase() || $scope.searchWord.toLowerCase() == d[i].firstName.toLowerCase() || $scope.searchWord.toLowerCase() == d[i].surname.toLowerCase() || $scope.searchWord.toLowerCase() == d[i].occupation.toLowerCase()) {
                            $scope.searchResultsUsers.push(d[i]);
                        }
                    }

                    // loop over all the users
                    for (var i in d) {
                        // loop over the users skills
                        for (var j in d[i].skills) {
                            // if the search condition matches one of the skills
                            if ($scope.searchWord.toLowerCase() == d[i].skills[j].toLowerCase()) {
                                // Loop over the current results
                                for (var p in $scope.searchResultsUsers) {
                                    // If the index of users is the same as one of the searchresults, dont re add it
                                    if (d[i] == $scope.searchResultsUsers[p]) {
                                        var alreadyThere = true;
                                    }
                                }
                                // If it's not there, add it.
                                if (alreadyThere == false) {
                                    $scope.searchResultsUsers.push(d[i]);
                                }
                            }
                        }
                    }
                })

                // For every project
                for (var i in $scope.projects) {
                    // and every tag in that project
                    for (var j in $scope.projects[i].tags) {
                        // If the search condition matches a tag
                        if ($scope.searchWord.toLowerCase() == $scope.projects[i].tags[j].toLowerCase()) {
                            for (var p in $scope.searchResultsProjects) {
                                // and that project isn't already in the results
                                if ($scope.projects[i] == $scope.searchResultsProjects[p]) {
                                    var alreadyThere = true;
                                }
                            }

                            // add it
                            if (alreadyThere == false) {
                                $scope.searchResultsProjects.push($scope.projects[i]);
                            }
                        }
                    }
                }
                $scope.searchOn = true;
            }

            $scope.projects = [{}];
        }
    ]);