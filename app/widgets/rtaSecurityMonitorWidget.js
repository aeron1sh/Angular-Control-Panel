'use strict';

angular.module('app').directive('rtaSecurityMonitorWidget', ['psSecurityMonitorService',
    function (psSecurityMonitorService) {
        return {
            // inherited scope from psWidgetBody
            templateUrl: 'app/widgets/rtaSecurityMonitorTemplate.html',
            link: function (scope, el, attrs) {

                scope.error = false;

                scope.setTitle = function (title) {
                    scope.title = title;
                };

            }
        };
    }
]);
