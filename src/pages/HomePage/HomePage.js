import MapComponent from "../../components/Mapbox/MapComponent";
import StoreComponent from "../../components/StoreComponent/StoreComponent";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function HomePage() {
  return (
    <div>
      <div className="main-header">
        <div>
          <h1>
            Find local{" "}
            <span style={{ backgroundColor: "ghostwhite" }}>sustainable</span>{" "}
            fashion stores near you.
          </h1>{" "}
          <Link to="/register-store">
            <Button variant="primary" id="btn-register-store">
              REGISTER STORE
            </Button>
          </Link>
        </div>
        <img
          style={{ height: "50vh" }}
          src="/images/person-sweater-cropped-no-bg.png"
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
