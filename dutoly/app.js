var app = angular.module("myApp", []);

app.controller('MainController', ['$scope', '$http', function($scope, $http) {
    $scope.hi = 'hi';
    $scope.ticker;
    $scope.year;
    $scope.data;

    $scope.getFinancials = function() {
        $http.get('http://localhost:4000/10K/' + $scope.ticker + '/' + $scope.year).then(function(res) {
            console.log($scope.ticker + ' ' + $scope.year);
            $scope.data = res;
        });
    };
}]);