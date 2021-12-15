import MapComponent from "../../components/Mapbox/MapComponent";
import StoreComponent from "../../components/StoreComponent/StoreComponent";

function HomePage() {
  return (
    <div>
      <div className="main-header">
        <h1>Find local sustainable fashion stores near you.</h1>
      </div>
      <MapComponent />
      <StoreComponent />
    </div>
  );
}

export default HomePage;
