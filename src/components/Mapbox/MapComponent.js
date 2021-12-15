import ReactMapGL, {
  Marker,
  Popup,
  FlyToInterpolator,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useState, useEffect } from "react";
import storeService from "../../services/store.services";

// had this.

// added the following 6 lines.

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
mapboxgl.workerClass = MapboxWorker;

const REACT_APP_MAPBOX = process.env.REACT_APP_MAPBOX_TOKEN;

function MapComponent() {
  const defaultMap = {
    latitude: 41.1579,
    longitude: -8.6291,
    width: "100vw",
    height: "50vh",
    zoom: 11,
  };
  const handleViewportChange = (newViewport) => {
    setViewport(newViewport);
  };
  const [stores, setStores] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [viewport, setViewport] = useState(defaultMap);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await storeService.getAll();

        const storesData = response.data;
        setStores(storesData);
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={REACT_APP_MAPBOX}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={handleViewportChange}
      >
        {stores &&
          stores.map((store) => {
            return (
              <Marker
                key={store._id}
                className="marker"
                latitude={store.location.coordinates[1]}
                longitude={store.location.coordinates[0]}
                offsetTop={-30}
                offsetLeft={-15}
              >
                <div
                  className="custom-pin"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedStore(store);
                  }}
                >
                  <img src="/images/pin.png" alt="store-location-pin" />
                </div>
              </Marker>
            );
          })}

        {selectedStore && (
          <Popup
            latitude={selectedStore.location.coordinates[1]}
            longitude={selectedStore.location.coordinates[0]}
            onClose={() => setSelectedStore(null)}
          >
            <div>
              <h3>{selectedStore.storeName}</h3>
              <p>{selectedStore.description}</p>
              <p>Address: {selectedStore.location.formattedAddress}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default MapComponent;
