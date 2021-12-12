import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const API_URL = "http://localhost:5005";

function StoreComponent() {
  const [stores, setStores] = useState(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(API_URL + "/api/stores");
        const allStores = response.data;
        setStores(allStores);
      };
      fetchData();
    } catch (error) {}
  }, []);
  return (
    <div>
      {stores &&
        stores.map((store) => {
          return (
            <Link to={store._id} key={store._id}>
              <div>
                <p>{store.storeName}</p>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default StoreComponent;
