import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useState, useEffect } from "react";
import storeService from "../../services/store.services";
import { Link } from "react-router-dom";

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
    <div className="map-component">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={REACT_APP_MAPBOX}
        mapStyle="mapbox://styles/mapbox/dark-v10"
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
                  <img src="/images/pin-white.png" alt="store-location-pin" />
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
              <Link to={selectedStore._id}>
                <h3>{selectedStore.storeName}</h3>
                <p>{selectedStore.description}</p>
                <p>Address: {selectedStore.location.formattedAddress}</p>
              </Link>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default MapComponent;
