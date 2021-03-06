import "./App.css";
import { Routes, Route } from "react-router-dom";
import MyNavbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import RegisterStorePage from "./pages/RegisterStorePage/RegisterStorePage";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import StoreDetailsPage from "./pages/StoreDetailsPage/StoreDetailsPage";
import EditStorePage from "./pages/EditStorePage/EditStorePage";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/register-store"
          element={
            <IsPrivate>
              <RegisterStorePage />
            </IsPrivate>
          }
        />
        <Route path="/:storeId" element={<StoreDetailsPage />} />
        <Route path="/edit/:storeId" element={<EditStorePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
