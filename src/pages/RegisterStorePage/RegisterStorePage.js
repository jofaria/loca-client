import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import imageService from "../../services/image.service";
import storeService from "../../services/store.services";

function RegisterStorePage(props) {
  const { owner } = useContext(AuthContext);

  const navigate = useNavigate();
  const [storeName, setStoreName] = useState("");
  const [logoURL, setLogoURL] = useState("");
  const [coverImgURL, setCoverImgURL] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  // ? HANDLE FUNCTIONS

  const handleStoreName = (e) => setStoreName(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleWebsite = (e) => setWebsite(e.target.value);
  const handleInstagram = (e) => setInstagram(e.target.value);

  const handleImageUpload = async (e) => {
    try {
      const uploadData = new FormData();

      uploadData.append("logo", e.target.files[0]);

      const response = await imageService.uploadImage(uploadData);
      setLogoURL(response.data.secure_url);
    } catch (error) {}
  };

  if (logoURL === "") {
    setLogoURL("/images/logo-removebg-preview.png");
  }

  // ? HANDLE SUBMIT

  const handleStoreSubmit = async (e) => {
    e.preventDefault();

    if (address === "") {
      alert("Please fill in all the fields");
    }

    const newStore = {
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
      const response = await storeService.createOne(newStore);

      const createdStore = response.data;
      const storeId = createdStore._id;

      setStoreName("");
      setLogoURL("");
      setAddress("");
      setCoverImgURL("");
      setDescription("");
      setWebsite("");
      setInstagram("");

      navigate("/" + storeId);
    } catch (error) {
      setErrorMessage("Please enter valid fields.");
    }
  };

  return (
    <div className="storeForms">
      <h1>Register Store</h1>

      <form onSubmit={handleStoreSubmit}>
        <label>Store Name:</label>
        <input type="text" value={storeName} onChange={handleStoreName} />

        <label>Logo:</label>
        <input
          className="input-file"
          type="file"
          onChange={handleImageUpload}
        />

        <label>Description:</label>
        <input type="text" value={description} onChange={handleDescription} />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={address}
          onChange={handleAddress}
        />

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
        <button className="my-btn-white" type="submit">
          SUBMIT
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <img
        src={"/images/person-sweater-cropped-no-bg.png"}
        alt="woman-with-jacket"
      />
    </div>
  );
}

export default RegisterStorePage;
