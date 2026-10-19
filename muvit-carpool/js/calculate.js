  function GetRoute() {

        directionsDisplay.setMap(map);

        source = document.getElementById("travelfrom").value;
        destination = document.getElementById("travelto").value;

        var waypoints = [];
        for (var i = 0; i < locations.length; i++) {
            var address = locations[i];
            if (address !== "") {
                waypoints.push({
                    location: address,
                    stopover: true
                });
            }
        }

        var request = {
            origin: source,
            destination: waypoints[0].location,
            waypoints: waypoints, //an array of waypoints
            optimizeWaypoints: true, //set to true if you want google to determine the shortest route or false to use the order specified.
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                var dvDistance = document.getElementById("dvDistance");
                var distance = 0;
                var minute = 0.00;
                response.routes[0].legs.forEach(function (item, index) {
                    if (index < response.routes[0].legs.length - 1) {
                        distance = distance + parseInt(item.distance.text);

                        minute = parseFloat(minute) + parseFloat(item.duration.value / 60);




                             tbl = document.getElementById("tblResults");

                                var row = tbl.insertRow(1);
                                var cell = row.insertCell(0);
                                cell.innerText = source;
                                var cell = row.insertCell(1);
                                cell.innerText = item.end_address;
                                var cell = row.insertCell(2);
                                cell.innerText = distance;
                                var cell = row.insertCell(3);
                                cell.innerText = minute.toFixed(2) + " min";


                    }
                });
                directionsDisplay.setDirections(response);
            }
            else {

            }
        })
    };