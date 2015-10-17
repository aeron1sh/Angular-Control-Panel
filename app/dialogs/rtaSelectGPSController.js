'use strict';

angular.module('app').controller('rtaSelectGPSController',
    ['$scope',
    function ($scope) {

        $scope.lat = $scope.item.widgetSettings.lat;
        $scope.long = $scope.item.widgetSettings.long;

        $scope.saveSettings = function () {
            $scope.item.widgetSettings.lat = $scope.lat;
            $scope.item.widgetSettings.long = $scope.long;
            $scope.setLatLong($scope.lat, $scope.long);
            $scope.$close();
        };

    }
    ]);