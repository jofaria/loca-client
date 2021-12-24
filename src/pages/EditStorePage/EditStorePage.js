import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import imageService from "../../services/image.service";
import storeService from "../../services/store.services";

function EditStorePage(props) {
  const { owner } = useContext(AuthContext);

  const { storeId } = useParams();
  const [thisStore, setThisStore] = useState(null);

  const navigate = useNavigate();
  const [storeName, setStoreName] = useState("");
  const [logoURL, setLogoURL] = useState("");
  const [coverImgURL, setCoverImgURL] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await storeService.getOne(storeId);
        const retrievedStore = response.data;
        setThisStore(retrievedStore);
        setStoreName(retrievedStore.storeName);
        setLogoURL(retrievedStore.logo);
        setCoverImgURL(retrievedStore.coverImg);
        setDescription(retrievedStore.description);
        setAddress(retrievedStore.address);
        setWebsite(retrievedStore.website);
        setInstagram(retrievedStore.instagram);
      } catch (error) {}
    };
    fetchData();
  }, []);

  // ? HANDLE FUNCTIONS

  const handleStoreName = (e) => setStoreName(e.target.value);
  // const handleCoverImg = (e) => setCoverImg(); // .files
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

    console.log("address before sending", address);
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
      await storeService.updateOne(storeId, updateStore);
      console.log("address after sending", address);
      setStoreName("");
      setLogoURL("");
      setAddress("");
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
    <div className="storeForms">
      <h1>Edit Store</h1>

      <form onSubmit={handleStoreSubmit}>
        {thisStore && (
          <>
            <label>Store Name:</label>
            <input
              type="text"
              defaultValue={thisStore.storeName}
              onChange={handleStoreName}
            />

            <label>Logo:</label>
            <input
              className="input-file"
              type="file"
              onChange={handleImageUpload}
            />

            <label>Description:</label>
            <input
              type="text"
              defaultValue={thisStore.description}
              onChange={handleDescription}
            />

            <label>Address:</label>
            <input
              type="text"
              name="address"
              defaultValue={thisStore.address}
              onChange={handleAddress}
            />

            <label>Website:</label>
            <input
              type="text"
              name="website"
              defaultValue={thisStore.website}
              onChange={handleWebsite}
            />
            <label>Instagram:</label>
            <input
              type="text"
              name="instagram"
              defaultValue={thisStore.instagram}
              onChange={handleInstagram}
            />
            <button className="my-btn-white" type="submit">
              EDIT STORE
            </button>
          </>
        )}
      </form>
      <img
        src={"/images/person-sweater-cropped-no-bg.png"}
        alt="woman-with-jacket"
      />
      <button className="delete-btn" onClick={handleDeleteStore}>
        DELETE STORE
      </button>
    </div>
  );
}

export default EditStorePage;
