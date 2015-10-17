'use strict';

angular.module('psCharts').directive('psGauge', [
    'psWebMetricsService',
    function (psWebMetricsService) {
        return {

            templateUrl: '/ext-modules/psCharts/psGaugeTemplate.html',
            link: function (scope, el, attrs) {

                scope.options = {
                    redFrom: 90, redTo: 100,
                    yellowFrom: 75, yellowTo: 90,
                    minorTicks: 5
                };

                var widget = el.closest('.gridster-item');
                scope.options.width = widget.width();
                scope.options.height = widget.height();

                widget.resize(function () {
                    scope.options.width = widget.width();
                    scope.options.height = widget.height();
                });

                //scope.title = psWebMetricsService.getTitleForMetric(scope.metric);
                scope.initialized = false;

                scope.setTitle = function (title) {
                    scope.title = title;
                };

                scope.$on('psWebMetricsService-received-data-event', function (evt, data) {
                    if (!scope.initialized) {
                        scope.data = google.visualization.arrayToDataTable([
                                    ['Label', 'Value'],
                                    [scope.title, 0]
                        ]);
                        scope.chart = new google.visualization.Gauge(el[0]);
                        scope.initialized = true;
                    }

                    scope.data.setValue(0, 0, scope.title);
                    scope.data.setValue(0, 1, Math.round(data[scope.metric]));
                    scope.chart.draw(scope.data, scope.options);

                });
            }
        };
    }
]);

