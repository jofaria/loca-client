import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import axios from "axios";

const API_URL = "http://localhost:5005";

// const stores = [
//   {
//     _id: 1,
//     name: "CRU Creative",
//     description: "First store with location for testing",
//     // The `location` field must have the following structure:
//     location: {
//       type: {
//         type: "Rua do Rosário 211, 4050-524 Porto",
//       },
//       coordinates: [41.15035248865254, -8.621038344369948],
//     },
//   },
//   {
//     _id: 2,
//     name: "Mão esquerda",
//     description: "First store with location for testing",
//     // The `location` field must have the following structure:
//     location: {
//       type: {
//         type: "Rua da Alegria nº5, 4000-041 Porto",
//       },
//       coordinates: [41.1467755449724, -8.603872037766731],
//     },
//   },
// ];

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
        const response = await axios.get(API_URL + "/api/stores");
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
        mapboxApiAccessToken="pk.eyJ1Ijoiam9pcm9uIiwiYSI6ImNrd3hxa3QzNDBoN2Iyd2xhd2RucWtrMDIifQ.FYSiJr_ITdnOWap1Jv8upQ"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={handleViewportChange}
      >
        {stores &&
          stores.map((store) => {
            return (
              <Marker
                key={store._id}
                className="marker"
                latitude={store.location.coordinates[0]}
                longitude={store.location.coordinates[1]}
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
            latitude={selectedStore.location.coordinates[0]}
            longitude={selectedStore.location.coordinates[1]}
            onClose={() => setSelectedStore(null)}
          >
            <div>
              <h3>{selectedStore.storeName}</h3>
              <p>{selectedStore.description}</p>
              <p>Address: {selectedStore.location.address}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default MapComponent;
