import React, { useRef, useEffect, useState } from "react";
import MapComponent from "../../components/Mapbox/MapComponent";

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <MapComponent />
      <p> The rest of the stuff</p>
    </div>
  );
}

export default HomePage;
