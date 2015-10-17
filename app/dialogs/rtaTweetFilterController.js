'use strict';

angular.module('app').controller('rtaTweetFilterController',
    ['$scope',
    function ($scope) {

        $scope.filter = $scope.item.widgetSettings.filter;

        $scope.saveSettings = function () {
            $scope.item.widgetSettings.filter = $scope.filter;
            $scope.setFilter($scope.filter);
            $scope.$close();
        };
    }
]);