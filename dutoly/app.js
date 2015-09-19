var app = angular.module("myApp", []);

app.controller('MainController', ['$scope', '$http', function($scope, $http) {
    $scope.hi = 'hi';
    $scope.ticker;
    $scope.year;

    $scope.getFinancials = function() {
        $http.get('http://localhost:4000/10K/' + $scope.ticker + '/' + $scope.year).then(function(res) {
            $scope.data = res.data
            console.log(res.data['year1']);
        });
    };
}]);