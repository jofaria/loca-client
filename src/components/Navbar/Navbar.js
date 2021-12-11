import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Get the value from the context
  const { isLoggedIn, owner, logOutUser } = useContext(AuthContext);
  console.log(owner);

  return (
    <nav className="Navbar">
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <button onClick={logOutUser}>Logout</button>
          <Link to="/register-store">
            <button>Register Store</button>
          </Link>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>

          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}

      <div className="profile-img-wrapper">
        {owner && (
          <Link to="/profile">
            <p>{owner.username}</p>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
