'use strict';

angular.module('app').directive('rtaTweetWidget', [
    function () {
        return {
            // inherited scope from psWidgetBody
            templateUrl: 'app/widgets/rtaTweetTemplate.html',
            link: function (scope, el, attrs) {

                scope.error = false;

                scope.setFilter = function (filter) {
                    scope.$broadcast('twitter-filter-changed', filter);
                };
            }
        };
    }
]);
