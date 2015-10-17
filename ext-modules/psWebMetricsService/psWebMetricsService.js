'use strict';

angular.module('psWebMetricsService', []).factory('psWebMetricsService', [
    '$rootScope',
    function ($rootScope) {

        // Declare a proxy to reference the hub.
        $.connection.hub.url = 'http://localhost:65470/signalr';
        var hub = $.connection.metricHub;

        hub.client.broadcastMessage = function (time, bandwidthPct, cpuPct,
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
        
        $.connection.hub.start()
            .done()
            .fail(function (data) {
                alert(data);
            }
        );

        $.connection.hub.disconnected(function () {
            console.log('disconnected signalr');
            $rootScope.$broadcast('psWebMetricsService-disconnected-event',
                {
                });
        });

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

