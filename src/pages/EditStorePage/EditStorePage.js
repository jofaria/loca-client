// import axios from "axios";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
// import { Link } from "react-router-dom";
import imageService from "../../services/image.service";
import storeService from "../../services/store.services";

function EditStorePage(props) {
  const { owner } = useContext(AuthContext);
  // const [store, setStore] = useState(null);

  const { storeId } = useParams();
  console.log(storeId);

  const navigate = useNavigate();
  const [storeName, setStoreName] = useState("");
  const [logoURL, setLogoURL] = useState("");
  const [coverImgURL, setCoverImgURL] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");

  // ? HANDLE FUNCTIONS

  const handleStoreName = (e) => setStoreName(e.target.value);
  // const handleCoverImg = (e) => setCoverImg(); // .files
  const handleAddress = (e) => setAddress(e.target.value);
  // const handleLatitude = (e) => setLatitude(e.target.value);
  // const handleLongitude = (e) => setLongitude(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleWebsite = (e) => setWebsite(e.target.value);
  const handleInstagram = (e) => setInstagram(e.target.value);

  const handleImageUpload = async (e) => {
    try {
      const uploadData = new FormData();

      uploadData.append("logo", e.target.files[0]);

      const response = await imageService.uploadImage(uploadData);
      console.log("response :>> ", response);
      setLogoURL(response.data.secure_url);
    } catch (error) {}
  };

  // ? HANDLE SUBMIT

  const handleStoreSubmit = async (e) => {
    e.preventDefault();

    if (address === "") {
      alert("Please fill in all the fields");
    }
    const updateStore = {
      storeName,
      storeOwner: owner._id,
      logoURL,
      address,
      coverImgURL,
      description,
      website,
      instagram,
    };

    try {
      const response = await storeService.updateOne(storeId, updateStore);

      console.log("after update store submit :>> ", response.data);
      // const authToken = localStorage.getItem("authToken");

      // const response = await axios.post(`${API_URL}/api/stores`, newStore, {
      //   headers: { Authorization: `Bearer ${authToken}` },
      // });
      const updatedStore = response.data;
      //const storeId = updatedStore._id;

      setStoreName("");
      setLogoURL("");
      setAddress("");
      // setLatitude(0);
      // setLongitude(0);
      setCoverImgURL("");
      setDescription("");
      setWebsite("");
      setInstagram("");

      navigate("/" + storeId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteStore = async (e) => {
    try {
      await storeService.deleteOne(storeId);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="EditStorePage">
      <h1>Edit Store</h1>

      <form onSubmit={handleStoreSubmit}>
        <label>Store Name:</label>
        <input type="text" value={storeName} onChange={handleStoreName} />

        <label>Logo:</label>
        <input type="file" onChange={handleImageUpload} />

        <label>Description:</label>
        <input type="text" value={description} onChange={handleDescription} />

        {/* <label>Location:</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={handleLocation}
        /> */}

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={address}
          onChange={handleAddress}
        />
        {/* <label>Latitude:</label>
        <input
          type="number"
          name="latitude"
          value={latitude}
          onChange={handleLatitude}
        />
        <label>Longitude:</label>
        <input
          type="number"
          name="longitude"
          value={longitude}
          onChange={handleLongitude}
        /> */}
        <label>Website:</label>
        <input
          type="text"
          name="website"
          value={website}
          onChange={handleWebsite}
        />
        <label>Instagram:</label>
        <input
          type="text"
          name="instagram"
          value={instagram}
          onChange={handleInstagram}
        />
        <button type="submit">Edit Store</button>
      </form>

      <button onClick={handleDeleteStore}> Delete Store </button>
    </div>
  );
}

export default EditStorePage;
