import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";

function AddressSearch() {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoiam9pcm9uIiwiYSI6ImNrd3hxa3QzNDBoN2Iyd2xhd2RucWtrMDIifQ.FYSiJr_ITdnOWap1Jv8upQ";

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    types: "country,region,place,postcode,locality,neighborhood",
  });

  geocoder.addTo("#geocoder");

  // Get the geocoder results container.
  const results = document.getElementById("result");

  // Add geocoder result to container.
  geocoder.on("result", (e) => {
    results.innerText = JSON.stringify(e.result, null, 2);
  });

  // Clear results container when search is cleared.
  geocoder.on("clear", () => {
    results.innerText = "";
  });

  return (
    <div>
      <div id="geocoder"></div>
      <pre id="result"></pre>
    </div>
  );
}

export default AddressSearch;
