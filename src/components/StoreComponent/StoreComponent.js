import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import storeService from "../../services/store.services";
import { Card, Button } from "react-bootstrap";

function StoreComponent() {
  const [stores, setStores] = useState(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await storeService.getAll();
        const allStores = response.data;
        setStores(allStores);
      };
      fetchData();
    } catch (error) {}
  }, []);
  return (
    <div>
      {stores && (
        <div>
          <h2>DISCOVER STORES</h2>
          <div className="stores-container">
            {stores.map((store) => {
              return (
                <Link
                  to={store._id}
                  key={store._id}
                  className="store-component"
                >
                  <Card style={{ width: "18rem", height: "auto" }}>
                    <Card.Img variant="top store-logo" src={store.logo} />
                    <Card.Body>
                      <Card.Title>{store.storeName}</Card.Title>
                      <Card.Text>{store.description}</Card.Text>
                    </Card.Body>
                  </Card>

                  {/* <div>
                  <img className="store-logo" src={store.logo} alt="logo" />
                  <p>{store.storeName}</p>
                </div> */}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default StoreComponent;
