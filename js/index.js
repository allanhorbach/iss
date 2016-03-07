	 var issFlightPath = [],
	 		flightPath, $pos = $(".pos");

	 function moveISS() {
	 		$.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function(data) {
	 				var lat = data['iss_position']['latitude'];
	 				var lon = data['iss_position']['longitude'];
	 				var rawLatLng = {
	 						lat: lat,
	 						lng: lon
	 				};
	 				myLatLng = new google.maps.LatLng(rawLatLng);
	 				issFlightPath.push(rawLatLng);

	 				map.panTo(myLatLng, animate = true);

	 				flightPath = new google.maps.Polyline({
	 						path: issFlightPath,
	 						geodesic: true,
	 						strokeColor: '#FFff00',
	 						strokeOpacity: 1,
	 						strokeWeight: 10
	 				});
	 				flightPath.setMap(map);
	 				$pos.html("<code>lat:" + rawLatLng.lat + ",<br>lng:" + rawLatLng.lng + "</code>");
	 		});

	 		setTimeout(moveISS, 2000);
	 }

	 var lat = -34;
	 var lng = 150;
	 var map;

	 function initializeMap() {
	 		var mapOptions = {
	 				zoom: 6,
	 				center: new google.maps.LatLng(lat, lng),
	 				mapTypeId: google.maps.MapTypeId.ROADMAP
	 		};
	 		map = new google.maps.Map(document.getElementById('map-canvas'),
	 				mapOptions);

	 		moveISS();

	 }
	 google.maps.event.addDomListener(window, 'load', initializeMap);