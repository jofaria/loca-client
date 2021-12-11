import React, { useRef, useEffect, useState } from "react";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9pcm9uIiwiYSI6ImNrd3hxa3QzNDBoN2Iyd2xhd2RucWtrMDIifQ.FYSiJr_ITdnOWap1Jv8upQ";

function Mapbox() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-8.6291);
  const [lat, setLat] = useState(41.1579);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default Mapbox;
