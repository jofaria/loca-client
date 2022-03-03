import { useState } from "react";
import { useParams } from "react-router-dom";
import storeService from "../../services/store.services";

function StoreDetailsPage(props) {
  const [store, setStore] = useState(null);
  const { storeId } = useParams();

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
            <img className="store-logo" alt="logo" src={store.logo} />
            <h1>{store.storeName.toUpperCase()}</h1>
            {store.website && (
              <a href={store.website} target="_blank" rel="noreferrer">
                <button> Website </button>
              </a>
            )}
            {store.instagram && (
              <a href={store.instagram} target="_blank" rel="noreferrer">
                <button> Instagram </button>
              </a>
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
