var app = angular.module("myApp", []);

app.controller('MainController', ['$scope', '$http', function($scope, $http) {
    $scope.hi = 'hi';
    $http.get('http://localhost:4000').then(function(res) {
        console.log(res);
    });
}]);