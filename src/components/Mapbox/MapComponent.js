import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";

const stores = [
  {
    _id: 1,
    name: "CRU Creative",
    description: "First store with location for testing",
    // The `location` field must have the following structure:
    location: {
      type: {
        type: "Rua do Rosário 211, 4050-524 Porto",
      },
      coordinates: [41.15035248865254, -8.621038344369948],
    },
  },
  {
    _id: 2,
    name: "Mão esquerda",
    description: "First store with location for testing",
    // The `location` field must have the following structure:
    location: {
      type: {
        type: "Rua da Alegria nº5, 4000-041 Porto",
      },
      coordinates: [41.1467755449724, -8.603872037766731],
    },
  },
];

function MapComponent() {
  const defaultMap = {
    latitude: 41.1579,
    longitude: -8.6291,
    width: "100vw",
    height: "50vh",
    zoom: 11,
  };

  const [selectedStore, setSelectedStore] = useState(null);

  const handleViewportChange = (newViewport) => {
    setViewport(newViewport);
  };

  const [viewport, setViewport] = useState(defaultMap);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1Ijoiam9pcm9uIiwiYSI6ImNrd3hxa3QzNDBoN2Iyd2xhd2RucWtrMDIifQ.FYSiJr_ITdnOWap1Jv8upQ"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={handleViewportChange}
      >
        {stores.map((store) => {
          return (
            <Marker
              key={store._id}
              latitude={store.location.coordinates[0]}
              longitude={store.location.coordinates[1]}
            >
              <button
                className="pin-button"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedStore(store);
                }}
              >
                <img src="/images/pin.png" alt="store-location-pin" />
              </button>
            </Marker>
          );
        })}

        {selectedStore && (
          <Popup
            latitude={selectedStore.location.coordinates[0]}
            longitude={selectedStore.location.coordinates[1]}
          >
            <div>
              <p>{selectedStore.name}</p>
              <p>{selectedStore.description}</p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default MapComponent;
