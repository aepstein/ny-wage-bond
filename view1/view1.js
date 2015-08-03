'use strict';

angular.module('myApp.view1', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
.controller('View1Ctrl', ['$scope',function($scope) {
  $scope.calculate = function(newVals,oldVals,scope) {
    var fullTimeEmployees = parseInt( newVals[0] );
    var partTimeHours = parseInt( newVals[1] );
    if ( typeof fullTimeEmployees==='number' && (fullTimeEmployees%1)===0 ) {
      $scope.fullTimeEmployeesValid = true;
    }
    else {
      $scope.fullTimeEmployeesValid = false;
    }
    if ( typeof partTimeHours==='number' && (partTimeHours%1)===0 ) {
      $scope.partTimeHoursValid = true;
    }
    else {
      $scope.partTimeHoursValid = false;
    }
    if ( $scope.fullTimeEmployeesValid && $scope.partTimeHoursValid &&
    ( fullTimeEmployees > 0 || partTimeHours > 0 ) ) {
      $scope.fullTimeEquivalents = fullTimeEmployees + Math.floor( partTimeHours/40 );
      if ( $scope.fullTimeEquivalents < 2 ) {
        $scope.requiredBond = 0;
      }
      else if ( $scope.fullTimeEquivalents < 6 ) {
        $scope.requiredBond = 25000;
      }
      else if ( $scope.fullTimeEquivalents < 11 ) {
        $scope.requiredBond = 40000;
      }
      else if ( $scope.fullTimeEquivalents < 26 ) {
        $scope.requiredBond = 75000;
      }
      else {
        $scope.requiredBond = 125000;
      }
      $scope.validForm = true;
    }
    else {
      $scope.validForm = false;
      $scope.fullTimeEquivalents = null;
      $scope.requiredBond = null;
    }
  };
  $scope.$watchGroup( ['fullTimeEmployees', 'partTimeHours'], $scope.calculate );
}]);
