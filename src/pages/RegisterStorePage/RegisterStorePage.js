// import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
// import { Link } from "react-router-dom";
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
  // const [latitude, setLatitude] = useState(0);
  // const [longitude, setLongitude] = useState(0);
  // const [errorMessage, setErrorMessage] = useState(undefined);

  // ? Category options
  // const [categories, setCategories] = useState([]);
  // const [organicMaterials, setOrganicMaterials] = useState(false);
  // const [recycledMaterials, setRecycledMaterials] = useState(false);
  // const [madeLocally, setMadeLocally] = useState(false);
  // const [crueltyFree, setCrueltyFree] = useState(false);
  // const [ethicallyMade, setEthicallyMade] = useState(false);
  // const [vintageSecondHand, setVintageSecondHand] = useState(false);

  // ? HANDLE FUNCTIONS

  const handleStoreName = (e) => setStoreName(e.target.value);
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
  // const handleCoverImgUpload = async (e) => {
  //   try {
  //     const uploadData = new FormData();

  //     uploadData.append("coverImg", e.target.files[0]);

  //     const response = await imageService.uploadImage(uploadData);
  //     setCoverImgURL("this imaaaage");
  //   } catch (error) {}
  // };

  // ? OTHER handleLogo function

  // const handleCategories = (e) => {
  //   if (typeof e.target.value === "string") {
  //     setCategories([e.target.value]);
  //   } else {
  //     setCategories(e.target.value);
  //   }
  //   return;
  // };

  // const handleOrganicMaterials = (e) => setOrganicMaterials(e.target.checked);
  // const handleRecycledMaterials = (e) => setRecycledMaterials(e.target.checked);
  // const handleMadeLocally = (e) => setMadeLocally(e.target.checked);
  // const handleCrueltyFree = (e) => setCrueltyFree(e.target.checked);
  // const handleEthicallyMade = (e) => setEthicallyMade(e.target.checked);
  // const handleVintageSecondHand = (e) => setVintageSecondHand(e.target.checked);s

  // const handleCategory = (e) => setCategory(e.target.value);

  // const data = [
  //   { option: "Recycled materials", id: 1 },
  //   { option: "Organic materials", id: 2 },
  //   { option: "Made locally", id: 3 },
  //   { option: "Made ethically", id: 4 },
  //   { option: "Cruelty-free", id: 5 },
  //   { option: "Second-hand", id: 6 },
  // ];

  // const [options] = useState(data);

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

  return (
    <div className="RegisterStorePage">
      <h1>Register Store</h1>

      <form onSubmit={handleStoreSubmit}>
        <label>Store Name:</label>
        <input type="text" value={storeName} onChange={handleStoreName} />

        <label>Logo:</label>
        <input type="file" onChange={handleImageUpload} />

        {/* <label>Cover Image:</label>
        <input type="file" onChange={handleCoverImgUpload} /> */}

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
        <button type="submit">Register Store</button>
      </form>
    </div>
  );
}

export default RegisterStorePage;

// <div>
//   <p>Choose a category:</p>

//   <label for="organicMaterials">Choose categories</label>
//   <select multiple value={categories} onChange={handleCategories}>
//     <option></option>
//   </select>

//   <label for="organicMaterials">Organic materials</label>
//   <input
//     type="checkbox"
//     name="organicMaterials"
//     checked={organicMaterials}
//     onChange={handleCategories}
//   />
//   <label for="recycledMaterials">Recycled materials</label>
//   <input
//     type="checkbox"
//     name="recycledMaterials"
//     checked={recycledMaterials}
//     onChange={handleCategories}
//   />
//   <label for="madeLocally">Made locally</label>
//   <input
//     type="checkbox"
//     name="madeLocally"
//     checked={madeLocally}
//     onChange={handleCategories}
//   />
//   <label for="ethicallyMade">Made ethically</label>
//   <input
//     type="checkbox"
//     name="ethicallyMade"
//     checked={ethicallyMade}
//     onChange={handleCategories}
//   />
//   <label for="crueltyFree">Cruelty-free</label>
//   <input
//     type="checkbox"
//     name="crueltyFree"
//     checked={crueltyFree}
//     onChange={handleCrueltyFree}
//   />
//   <label for="vintageSecondHand">Vintage / Second-hand</label>
//   <input
//     type="checkbox"
//     name="vintageSecondHand"
//     checked={vintageSecondHand}
//     onChange={handleVintageSecondHand}
//   />
// </div>;

// const categories = {
//   organicMaterials,
//   recycledMaterials,
//   madeLocally,
//   crueltyFree,
//   ethicallyMade,
//   vintageSecondHand,
// };

// const dataToSend = {
//   categories,
// };

// {
//   /* <div>
//           <p>Choose a category:</p>

//           <label for="organicMaterials">Choose categories</label>
//           <select multiple value={categories} onChange={handleCategories}>
//             <option></option>
//           </select>

//           <label for="organicMaterials">Organic materials</label>
//           <input
//             type="checkbox"
//             name="organicMaterials"
//             checked={organicMaterials}
//             onChange={handleCategories}
//           />
//           <label for="recycledMaterials">Recycled materials</label>
//           <input
//             type="checkbox"
//             name="recycledMaterials"
//             checked={recycledMaterials}
//             onChange={handleCategories}
//           />
//           <label for="madeLocally">Made locally</label>
//           <input
//             type="checkbox"
//             name="madeLocally"
//             checked={madeLocally}
//             onChange={handleCategories}
//           />
//           <label for="ethicallyMade">Made ethically</label>
//           <input
//             type="checkbox"
//             name="ethicallyMade"
//             checked={ethicallyMade}
//             onChange={handleCategories}
//           />
//           <label for="crueltyFree">Cruelty-free</label>
//           <input
//             type="checkbox"
//             name="crueltyFree"
//             checked={crueltyFree}
//             onChange={handleCrueltyFree}
//           />
//           <label for="vintageSecondHand">Vintage / Second-hand</label>
//           <input
//             type="checkbox"
//             name="vintageSecondHand"
//             checked={vintageSecondHand}
//             onChange={handleVintageSecondHand}
//           />
//         </div> */
// }
