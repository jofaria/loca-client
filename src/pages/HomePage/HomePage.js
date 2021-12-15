import MapComponent from "../../components/Mapbox/MapComponent";
import StoreComponent from "../../components/StoreComponent/StoreComponent";

function HomePage() {
  return (
    <div>
      <div className="main-header">
        <h1>
          Find local{" "}
          <span style={{ "background-color": "ghostwhite" }}>
            {" "}
            sustainable{" "}
          </span>
          fashion stores near you.
        </h1>
        <img
          style={{ height: "50vh" }}
          src="/images/person-sweater-no-bg.png"
          alt="person-putting-on-sweater"
          className="hero-image"
        />
      </div>
      <MapComponent />
      <StoreComponent />
    </div>
  );
}

export default HomePage;
