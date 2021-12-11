import { Map } from "mapbox-gl";
import React, { useRef, useEffect, useState } from "react";
import Mapbox from "../../components/Mapbox/Mapbox";

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Mapbox />
    </div>
  );
}

export default HomePage;
