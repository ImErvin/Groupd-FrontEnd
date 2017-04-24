angular.module('groupdApp')
.factory('SearchFactory' ,['APIFactory', 
function(APIFactory){
    var search = {};

    return {
        search: search
    }
}]);