var app = angular.module("myApp", []);

app.controller('MainController', ['$scope', '$http', function($scope, $http) {
    $scope.hi = 'hi';
    $scope.ticker;
    $scope.year;

    $scope.getFinancials = function() {
        $http.get('http://localhost:4000/10K/' + $scope.ticker + '/' + $scope.year).then(function(res) {
            _.forEach(res.data, function(d) {
                console.log(d);
                d.EBI = d.ebit - (d.incomebeforetaxes - d.netincome);
                d.DnA = d.cfdepreciationamortization;
                d.CAPEX = -1*d.capitalexpenditures;
                d.changeinWCap = d.totalcurrentassets - d.totalcurrentliabilities;
                d.FCF = parseInt(d.EBI) + parseInt(d.DnA) - parseInt(d.CAPEX) - parseInt(d.changeinWCap);
            });
            $scope.data = res.data;
        });
    };
}]);