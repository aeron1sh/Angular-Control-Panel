'use strict';

angular.module('psBusTracker', []).factory('psBusTrackerService', [
    function () {

        var transitFirebaseRef = new Firebase("https://publicdata-transit.firebaseio.com/");

        var getGeoFireInstance = function () {
            return new GeoFire(transitFirebaseRef.child("_geofire"));
        };

        return {
            getGeoFireInstance: getGeoFireInstance,
            transitFirebaseRef: transitFirebaseRef
        };
    }
]);