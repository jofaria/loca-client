import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import ownerService from "../../services/owner.service";
import { Link } from "react-router-dom";

function ProfilePage() {
  const { owner, logOutUser } = useContext(AuthContext);
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
  }, [owner]);

  return (
    <div>
      {currentOwner && (
        <div>
          <div>
            <h1> Welcome, {currentOwner.username}</h1>
            <>
              <button onClick={logOutUser}>Logout</button>
            </>
          </div>
          {currentOwner.store.length === 0 && (
            <h2> You don't have any registered stores.</h2>
          )}

          {currentOwner.store.length !== 0 && <h2> Manage your stores</h2>}

          {currentOwner.store.map((eachStore) => {
            return (
              <div key={eachStore._id}>
                <p>{eachStore.storeName}</p>
                <Link to={"/edit/" + eachStore._id}>
                  <button>Edit</button>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
