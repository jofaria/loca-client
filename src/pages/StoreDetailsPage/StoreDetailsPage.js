import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import storeService from "../../services/store.services";

function StoreDetailsPage(props) {
  const [store, setStore] = useState(null);
  // const [loading, setLoading] = useState(true);
  const { storeId } = useParams();
  // const { owner } = useContext(AuthContext);

  useState(() => {
    const fetchData = async () => {
      try {
        const response = await storeService.getOne(storeId);
        const foundStore = response.data;
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
      {store && (
        <>
          <div ClassName="store-header">
            <img
              src={store.coverImg}
              alt="coverImg"
              className="store-coverImg"
            />
            <img className="store-logo" src={store.logo} alt="logo" />
            <h1>{store.storeName.toUpperCase()}</h1>
            <Link to={store.website}>
              <button> Website</button>
            </Link>
            <Link to={store.instagram}>
              <button> Instagram </button>
            </Link>
          </div>
          <p>
            <b>Address:</b> {store.address}
          </p>
          <p>{store.description}</p>

          {store.products.length !== 0 && (
            <>
              <h2>This is where the products will go</h2>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default StoreDetailsPage;
