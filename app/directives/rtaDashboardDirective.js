'use strict';

angular.module('app').directive('rtaDashboard', ['$localStorage',
    function ($localStorage) {
        return {
            scope: {
            },
            template: '<ps-dashboard></ps-dashboard>',
            link: function (scope) {

                scope.gridsterOpts = {
                    columns: 12,
                    margins: [20, 20],
                    outerMargin: false,
                    pushing: true,
                    floating: true,
                    swapping: true
                };

                scope.widgetDefinitions = [
                    {
                        title: 'Gauge',
                        settings: {
                            sizeX: 3,
                            sizeY: 3,
                            minSizeX: 2,
                            minSizeY: 2,
                            template: '<rta-gauge-widget></rta-gauge-widget>',
                            widgetSettings: {
                                metric: 'cpuPct',
                                templateUrl: 'app/dialogs/rtaSelectMetricTemplate.html',
                                controller: 'rtaSelectMetricController'
                            }
                        }
                    },
                    {
                        title: 'Line Chart',
                        settings: {
                            sizeX: 3,
                            sizeY: 3,
                            minSizeX: 2,
                            minSizeY: 2,
                            template: '<rta-line-chart-widget></rta-line-chart-widget>',
                            widgetSettings: {
                                metric: 'cpuPct',
                                templateUrl: 'app/dialogs/rtaSelectMetricTemplate.html',
                                controller: 'rtaSelectMetricController'
                            }
                        }
                    },
                    {
                        title: 'Candlestick Chart',
                        settings: {
                            sizeX: 3,
                            sizeY: 3,
                            minSizeX: 2,
                            minSizeY: 2,
                            template: '<rta-candlestick-widget></rta-candlestick-widget>',
                            widgetSettings: {
                                metric: 'cpuPct',
                                templateUrl: 'app/dialogs/rtaSelectMetricTemplate.html',
                                controller: 'rtaSelectMetricController'
                            }
                        }
                    },
                    {
                        title: 'Security Monitor Widget',
                        settings: {
                            sizeX: 5,
                            sizeY: 6,
                            minSizeX: 5,
                            minSizeY: 6,
                            draggable: {
                                handle: '.ps-drag-handle'
                            },
                            template: '<rta-security-monitor-widget></rta-security-monitor-widget>',
                            widgetSettings: {
                                filter: 'All',
                                templateUrl: '',
                                controller: ''
                            }
                        }
                    },
                    {
                        title: 'Bus Tracker Widget',
                        settings: {
                            sizeX: 5,
                            sizeY: 5,
                            minSizeX: 5,
                            minSizeY: 5,
                            template: '<rta-bus-tracker-widget></rta-bus-tracker-widget>',
                            widgetSettings: {
                                lat: '37.785326',
                                long: '-122.405696',
                                templateUrl: 'app/dialogs/rtaSelectGPSTemplate.html',
                                controller: 'rtaSelectGPSController'
                            }
                        }
                    },
                    {
                        title: 'Tweet Widget',
                        settings: {
                            sizeX: 5,
                            sizeY: 5,
                            minSizeX: 5,
                            minSizeY: 5,
                            template: '<rta-tweet-widget></rta-tweet-widget>',
                            widgetSettings: {
                                filter: 'the',
                                templateUrl: 'app/dialogs/rtaTweetFilterTemplate.html',
                                controller: 'rtaTweetFilterController'
                            }
                        }
                    }
                ];

                scope.widgets = $localStorage.widgets ||
                    [

                    ];

                scope.$watch('widgets', function () {
                    $localStorage.widgets = scope.widgets;
                }, true);
            }
        }
    }]);