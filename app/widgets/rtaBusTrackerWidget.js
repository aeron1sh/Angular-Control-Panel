'use strict';

angular.module('app').directive('rtaBusTrackerWidget', [
    function () {
        return {
            // inherited scope from psWidgetBody
            templateUrl: 'app/widgets/rtaBusTrackerTemplate.html',
            link: function (scope, el, attrs) {

                scope.lat = scope.item.widgetSettings.lat;
                scope.long = scope.item.widgetSettings.long;
                scope.error = false;

                scope.setLatLong = function (lat, long) {
                    scope.lat = lat;
                    scope.long = long;
                };

            }
        };
    }
]);
