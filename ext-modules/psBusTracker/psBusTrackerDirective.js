'use strict';

angular.module('psBusTracker').directive('psBusTracker', [
    'psBusTrackerService',
    function (psBusTrackerService) {
        return {

            link: function (scope, el, attrs) {

                var map;

                var center = [parseFloat(scope.lat), parseFloat(scope.long)];

                var radiusInKm = 0.5;

                var geoFire = psBusTrackerService.getGeoFireInstance();

                var vehiclesInQuery = {};

                var geoQuery = geoFire.query({
                    center: center,
                    radius: radiusInKm
                });

                /* Adds new vehicle markers to the map when they enter the query */
                geoQuery.on("key_entered", function (vehicleId, vehicleLocation) {

                    var vehicleId = vehicleId.split(":")[1];
                    vehiclesInQuery[vehicleId] = true;
                    psBusTrackerService.transitFirebaseRef.child("sf-muni/vehicles").child(vehicleId).once("value", function (dataSnapshot) {
                        var vehicle = dataSnapshot.val();
                        if (vehicle !== null && vehiclesInQuery[vehicleId] === true) {

                            vehiclesInQuery[vehicleId] = vehicle;

                            vehicle.marker = createVehicleMarker(vehicle, getVehicleColor(vehicle));
                        }
                    });
                });

                /* Moves vehicles markers on the map when their location within the query changes */
                geoQuery.on("key_moved", function (vehicleId, vehicleLocation) {
                    vehicleId = vehicleId.split(":")[1];
                    var vehicle = vehiclesInQuery[vehicleId];
                    if (typeof vehicle !== "undefined" && typeof vehicle.marker !== "undefined") {
                        vehicle.marker.animatedMoveTo(vehicleLocation);
                    }
                });

                /* Removes vehicle markers from the map when they exit the query */
                geoQuery.on("key_exited", function (vehicleId, vehicleLocation) {

                    vehicleId = vehicleId.split(":")[1];
                    var vehicle = vehiclesInQuery[vehicleId];
                    if (vehicle !== true) {
                        vehicle.marker.setMap(null);
                    }
                    delete vehiclesInQuery[vehicleId];
                });


                /*  GOOGLE MAPS  */
                function initializeMap() {
                    var loc = new google.maps.LatLng(center[0], center[1]);

                    map = new google.maps.Map(el[0], {
                        center: loc,
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        mapTypeControlOptions: {
                            position: google.maps.ControlPosition.TOP_CENTER
                        },
                        draggable: false,
                        panControl: false
                    });


                    //var circle = new google.maps.Circle({
                    //    strokeColor: "#6D3099",
                    //    strokeOpacity: 0.7,
                    //    strokeWeight: 1,
                    //    fillColor: "#B650FF",
                    //    fillOpacity: 0.35,
                    //    map: map,
                    //    center: loc,
                    //    radius: ((radiusInKm) * 1000),
                    //    draggable: false
                    //});

                    //var updateCriteria = _.debounce(function () {
                    //    var latLng = circle.getCenter();
                    //    geoQuery.updateCriteria({
                    //        center: [latLng.lat(), latLng.lng()],
                    //        radius: radiusInKm
                    //    });
                    //}, 10);
                    //google.maps.event.addListener(circle, "drag", updateCriteria);
                }

                scope.options = {};

                // locate the widget showing this gauge
                var widget = el.closest('.gridster-item');
                scope.options.width = widget.width();
                scope.options.height = widget.height();

                // monitor the widget's size
                widget.resize(function () {
                    if (!map) return;
                    scope.options.width = widget.width();
                    scope.options.height = widget.height();
                    google.maps.event.trigger(map, "resize");
                });

                var savedLat = scope.lat;
                var savedLong = scope.long;
                setInterval(function () {
                    if (savedLat != scope.lat || savedLong != scope.long) {
                        map.setCenter(new google.maps.LatLng(scope.lat, scope.long));
                        center = [parseFloat(scope.lat), parseFloat(scope.long)];
                        geoQuery.updateCriteria({
                            center: center,
                            radius: radiusInKm
                        });

                        savedLat = scope.lat;
                        savedLong = scope.long;
                    }
                }, 100);

                //el.mousemove(function (event) {
                //    event.preventDefault();
                //    event.stopPropagation();
                //});


                /* Adds a marker for the inputted vehicle to the map */
                function createVehicleMarker(vehicle, vehicleColor) {
                    var marker = new google.maps.Marker({
                        icon: "https://chart.googleapis.com/chart?chst=d_bubble_icon_text_small&chld=" + vehicle.vtype + "|bbT|" + vehicle.routeTag + "|" + vehicleColor + "|eee",
                        position: new google.maps.LatLng(vehicle.lat, vehicle.lon),
                        optimized: true,
                        map: map
                    });

                    return marker;
                }

                function getVehicleColor(vehicle) {
                    return ((vehicle.dirTag && vehicle.dirTag.indexOf("OB") > -1) ? "50B1FF" : "FF6450");
                }

                function coordinatesAreEquivalent(coord1, coord2) {
                    return (Math.abs(coord1 - coord2) < 0.000001);
                }

                google.maps.Marker.prototype.animatedMoveTo = function (newLocation) {
                    var toLat = newLocation[0];
                    var toLng = newLocation[1];

                    var fromLat = this.getPosition().lat();
                    var fromLng = this.getPosition().lng();

                    if (!coordinatesAreEquivalent(fromLat, toLat) || !coordinatesAreEquivalent(fromLng, toLng)) {
                        var percent = 0;
                        var latDistance = toLat - fromLat;
                        var lngDistance = toLng - fromLng;
                        var interval = window.setInterval(function () {
                            percent += 0.01;
                            var curLat = fromLat + (percent * latDistance);
                            var curLng = fromLng + (percent * lngDistance);
                            var pos = new google.maps.LatLng(curLat, curLng);
                            this.setPosition(pos);
                            if (percent >= 1) {
                                window.clearInterval(interval);
                            }
                        }.bind(this), 50);
                    }
                };

                setTimeout(function () {
                    initializeMap();
                }, 20);
            }
        };
    }]);