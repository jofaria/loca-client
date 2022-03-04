import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import storeService from "../../services/store.services";
import { Card } from "react-bootstrap";

function StoreComponent() {
  const [stores, setStores] = useState(null);
  const [char, setChar] = useState("");
  const [filteredStores, setFilteredStores] = useState(stores);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await storeService.getAll();
        const allStores = response.data;
        setStores(allStores);
        setFilteredStores(allStores);
      };
      fetchData();
    } catch (error) {}
  }, []);

  const handleSearch = (event) => {
    const chars = event.target.value;
    setChar(chars);
    if (chars !== "") {
      const storesFiltered = stores.filter((eachStore) => {
        return eachStore.address.toLowerCase().includes(chars.toLowerCase());
      });
      setFilteredStores(storesFiltered);
    } else {
      setFilteredStores(stores);
    }
  };

  return (
    <div>
      {filteredStores && (
        <div className="discover-stores">
          <h2>DISCOVER STORES</h2>

          <input
            id="search-bar"
            value={char}
            type="text"
            onChange={handleSearch}
            placeholder="Search by location"
          />
          <div className="stores-container">
            {filteredStores.map((store) => {
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
