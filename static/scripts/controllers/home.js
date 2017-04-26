'use strict';

angular.module('groupdApp')
  .controller('HomeCtrl',['UserFactory', 'ProjectFactory','$scope', 
  function (UserFactory, ProjectFactory, $scope) {
    $scope.searchOn = false;
    $scope.searchWord;
    $scope.searchResultsProjects = [];
    $scope.searchResultsUsers = [];

    ProjectFactory.project.getProjects().then(function(d){
      $scope.projects = [];
      for(var n in d){
        $scope.projects.push(d[n]);
        
      }
      if($scope.projects.length == 0){
        $scope.noProjects = true;
      }
      $scope.projects.reverse();
    })

    $scope.search = function(){
      $scope.searchResultsProjects = [];
      $scope.searchResultsUsers = [];
      alreadyThere = false;


      for(var i in $scope.projects)
      {
        if($scope.searchWord == $scope.projects[i].projectName)
        {
          $scope.searchResultsProjects.push($scope.projects[i]);
        }
      }

      UserFactory.user.getUsers().then(function(d){
        var alreadyThere = false;

        for(var i in d){
          if($scope.searchWord.toLowerCase() == d[i].username.toLowerCase() || $scope.searchWord.toLowerCase() == d[i].firstName.toLowerCase() || $scope.searchWord.toLowerCase() == d[i].surname.toLowerCase() || $scope.searchWord.toLowerCase() == d[i].occupation.toLowerCase())
          {
            $scope.searchResultsUsers.push(d[i]);
          }
        }

        for(var i in d)
        {
          for(var j in d[i].skills)
          {
            if($scope.searchWord.toLowerCase() == d[i].skills[j].toLowerCase()){
              for(var p in $scope.searchResultsUsers)
              {
                if(d[i] == $scope.searchResultsUsers[p])
                {
                  var alreadyThere = true;
                }
              }
              if(alreadyThere == false)
              {
                $scope.searchResultsUsers.push(d[i]);
              }
            }
          }
        }
      })

      for(var i in $scope.projects)
      {
        for(var j in $scope.projects[i].tags)
        {
          if($scope.searchWord.toLowerCase() == $scope.projects[i].tags[j].toLowerCase()){
            for(var p in $scope.searchResultsProjects)
            {
              if($scope.projects[i] == $scope.searchResultsProjects[p])
              {
                var alreadyThere = true;
              }
            }
            
            if(alreadyThere == false)
            {
              $scope.searchResultsProjects.push($scope.projects[i]);
            }
          }
        }
      }
      $scope.searchOn = true;
    }

    $scope.projects = [{}];
  }]);
