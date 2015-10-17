'use strict';

angular.module('app').controller('rtaSelectMetricController',
    ['$scope', 'psWebMetricsService',
    function ($scope, psWebMetricsService) {
        $scope.metrics = psWebMetricsService.getMetricsArray();
        $scope.metric = $scope.metrics[0];
        for (var i = 0; i < $scope.metrics.length; i++) {
            if ($scope.metrics[i] == $scope.item.widgetSettings.metric)
                $scope.metric = $scope.metrics[i];
        }

        $scope.saveSettings = function () {
            $scope.item.widgetSettings.metric = $scope.metric;
            $scope.$parent.metric = $scope.metric;
            $scope.setTitle(psWebMetricsService.getTitleForMetric($scope.metric));
            $scope.$close();
        };

    }
    ]);