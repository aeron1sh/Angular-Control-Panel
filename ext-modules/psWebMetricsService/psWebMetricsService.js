'use strict';

angular.module('psWebMetricsService', []).factory('psWebMetricsService', [
    '$rootScope',
    function ($rootScope) {

        var bandwidthPct = 20.0;
        var cpuPct = 10.0;
        var salesAmt = 1000.0;
        var alphaSalesAmt = 700.0;
        var betaSalesAmt = 300.0;

        var broadcastMessage = function (time, bandwidthPct, cpuPct,
                                                    salesAmt, alphaSalesAmt, betaSalesAmt) {
            
            $rootScope.$broadcast('psWebMetricsService-received-data-event',
                {
                    'time': time,
                    'bandwidthPct': bandwidthPct,
                    'cpuPct': cpuPct,
                    'salesAmt': salesAmt,
                    'alphaSalesAmt': alphaSalesAmt,
                    'betaSalesAmt': betaSalesAmt,
                });
        };

        var getTitleForMetric = function (metric) {
            switch (metric) {
                case 'time':
                    return 'Time';
                case 'bandwidthPct':
                    return 'Band %';
                case 'cpuPct':
                    return 'CPU %';
                case 'salesAmt':
                    return 'Sales Amount';
                case 'alphaSalesAmt':
                    return 'Alpha Sales Amount';
                case 'betaSalesAmt':
                    return 'Beta Sales Amount';
            }
            return undefined;
        };

        var getMetricsArray = function () {
            return ['time', 'bandwidthPct', 'cpuPct', 'salesAmt',
                        'alphaSalesAmt', 'betaSalesAmt'];
        };

        return {
            getTitleForMetric: getTitleForMetric,
            getMetricsArray: getMetricsArray
        };
       
    }
]);

