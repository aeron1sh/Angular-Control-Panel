﻿'use strict';

angular.module('app').directive('rtaLineChartWidget', ['psWebMetricsService',
    function (psWebMetricsService) {
        return {
            // inherited scope from psWidgetBody
            templateUrl: 'app/widgets/rtaLineChartTemplate.html',
            link: function (scope, el, attrs) {

                scope.metric = scope.item.widgetSettings.metric;
                scope.title = psWebMetricsService.getTitleForMetric(scope.metric);
                scope.error = false;

                scope.setTitle = function (title) {
                    scope.title = title;
                };

                scope.$on('psWebMetricsService-disconnected-event', function (evt, data) {
                    scope.$apply(function () {
                        scope.error = true;
                    });
                });
            }
        };
    }
]);
