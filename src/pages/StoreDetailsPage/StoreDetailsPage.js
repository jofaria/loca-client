import { AuthContext } from "../../context/auth.context";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

function StoreDetailsPage(props) {
  const [store, setStore] = useState(null);
  // const [loading, setLoading] = useState(true);
  const { storeId } = useParams();
  // const { owner } = useContext(AuthContext);

  useState(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/stores/${storeId}`);
        const foundStore = response.data;
        console.log(foundStore);
        setStore(foundStore);
        //setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>This is my store</h1>
      {store && (
        <>
          <h1>{store.storeName}</h1>
          <p>{store.description}</p>
          <img src={store.logo} alt="logo" />
          <img src={store.coverImg} alt="coverImg" />
          <Link to={store.website}>
            <button> Website</button>
          </Link>
          <Link to={store.instagram}>
            <button> Instagram</button>
          </Link>

          {store.products && (
            <>
              <h2>This is where the products will go</h2>
            </>
          )}

          {/* <Link>
            <button>Edit this store</button>
          </Link> */}
        </>
      )}
    </div>
  );
}

export default StoreDetailsPage;
