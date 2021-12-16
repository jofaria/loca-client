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
        <div className="storeDetailsContainer">
          <div className="store-header">
            {/* <img
              src={store.coverImg}
              alt="coverImg"
              className="store-coverImg"
            /> */}
            <img className="store-logo" alt="logo" src={store.logo} />
            <h1>{store.storeName.toUpperCase()}</h1>
            {store.website && (
              <Link to={store.website}>
                <button> Website</button>
              </Link>
            )}
            {store.instagram && (
              <Link to={store.instagram}>
                <button> Instagram </button>
              </Link>
            )}

            <p>
              <b>Address:</b> {store.address}
            </p>
            <p>{store.description}</p>
            <img
              className="details-bg"
              src="/images/person-sweater-no-bg.png"
              alt="store-with-hangers"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default StoreDetailsPage;
