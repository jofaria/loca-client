import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import ownerService from "../../services/owner.service";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

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
        <div className="profile-container">
          <div className="profile-header">
            <h2> Welcome, {currentOwner.username}</h2>

            <button onClick={logOutUser}>Logout</button>
          </div>

          {currentOwner.store.length === 0 && (
            <h2> You don't have any registered stores.</h2>
          )}

          {currentOwner.store.length !== 0 && <h2> Manage your stores</h2>}

          {currentOwner.store.map((eachStore) => {
            return (
              <div key={eachStore._id}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={eachStore.logo}
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50%",
                    }}
                  />

                  <Card.Header as="h5">{eachStore.storeName}</Card.Header>
                  <Card.Body>
                    <Card.Title>{eachStore.address}</Card.Title>
                    <Card.Text>{eachStore.description}</Card.Text>
                    <Link to={"/edit/" + eachStore._id}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
