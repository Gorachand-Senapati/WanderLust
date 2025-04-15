
  // TO MAKE THE MAP APPEAR YOU MUST
  // ADD YOUR ACCESS TOKEN FROM
  // https://account.mapbox.com
  // let mapToken = "<%= process.env.MAP_TOKEN %>"

  mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });
    
    console.log(coordinates);

        // Create a default Marker and add it to the map.
        const marker1 = new mapboxgl.Marker({color: "red"})
        .setLngLat(coordinates) //here listing.geometry latitud and longitude
        .setPopup(new mapboxgl.Popup({offset:25})
        .setHTML("<h4>You will be living here</h4>")
    )
        .addTo(map);

  