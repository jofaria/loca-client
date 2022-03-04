// import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL;

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const { logInUser } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);

  const handleSignupSubmit = async (e) => {
    try {
      e.preventDefault();
      // Create an object representing the request body
      const requestBody = { email, password, username, phone };
      await authService.signup(requestBody);

      const loginInfo = { email, password };

      const response = await authService.login(loginInfo);

      const token = response.data.authToken;
      logInUser(token);

      navigate("/");
    } catch (error) {
      // If the request resolves with an error, set the error message in the state
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="authContainers">
      <div className="SignupPage">
        <h1>Sign Up</h1>

        <form onSubmit={handleSignupSubmit}>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleEmail}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />

          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
          />

          <label>Phone:</label>
          <input type="tel" name="phone" value={phone} onChange={handlePhone} />

          <button className="my-btn-white" type="submit">
            Sign Up
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>
          Already have account? <Link to={"/login"}> Login</Link>
        </p>
      </div>
      <img src={"/images/form-bg.png"} alt="woman-with-jacket" />
    </div>
  );
}

export default SignupPage;
