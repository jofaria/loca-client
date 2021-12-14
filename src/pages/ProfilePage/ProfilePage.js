import React, { useState, useContext, useEffect } from "react";
// import { Multiselect } from "multiselect-react-dropdown";
import { AuthContext } from "../../context/auth.context";
import ownerService from "../../services/owner.service";

function ProfilePage() {
  const { owner } = useContext(AuthContext);
  const [currentOwner, setCurrentOwner] = useState(null);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const response = await ownerService.getOne(owner._id);
        const foundOwner = response.data;
        setCurrentOwner(foundOwner);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOwner();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      {currentOwner && (
        <div>
          <p>{currentOwner.username}</p>

          {currentOwner.store.map((eachStore) => {
            return <p>{eachStore.storeName}</p>;
          })}
        </div>
      )}

      {/* {currentOwner.store && <p>{currentOwner.store.storeName}</p>} */}
    </div>
  );
}

export default ProfilePage;
