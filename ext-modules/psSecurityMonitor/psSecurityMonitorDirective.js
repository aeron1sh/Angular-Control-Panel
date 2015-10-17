'use strict';

angular.module('psSecurityMonitor').directive('psSecurityMonitor', [
    'psSecurityMonitorService',
    function (psSecurityMonitorService) {
        return {

            templateUrl: 'ext-modules/psSecurityMonitor/psSecurityMonitorTemplate.html',
            link: function (scope, el, attrs) {

                scope.setTitle = function (title) {
                    scope.title = title;
                };

                scope.filter = 'All';
                scope.messages = [];
                scope.autoscroll = true;
                scope.$on('psSecurityMonitorService-received-data-event', function (evt, data) {

                    if (scope.filter == 'All' ||
                        scope.filter == data.event) {

                        scope.$apply(function () {
                            if (data.event == 'Sign On')
                                data.colorClass = 'non-error';
                            scope.messages.push(data);

                        });
                    }

                    if (scope.autoscroll)
                        el.find('div')[0].scrollTop = el.find('div')[0].scrollHeight;

                });

                // set autoscroll
                el.find('div').scroll(function (event, data) {
                    if (this.scrollTop < this.scrollHeight - $(this).height())
                        scope.autoscroll = false;
                    else
                        scope.autoscroll = true;
                });

                if (scope.item.widgetSettings.filter)
                    scope.filter = scope.item.widgetSettings.filter;

                scope.filterChanged = function () {
                    scope.item.widgetSettings.filter = scope.filter;
                }

            }
        };
    }
]);

