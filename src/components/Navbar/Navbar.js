import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function MyNavbar() {
  const { isLoggedIn, owner } = useContext(AuthContext);

  return (
    <div>
      <nav className="Navbar">
        <Link to="/">
          <h1 className="loca-logo">LOCA</h1>
        </Link>

        <Link to="/register-store">
          <button>Register Store</button>
        </Link>

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

        <div>
          {owner && (
            <div>
              <Link to="/profile">
                <p className="profile-link">Profile</p>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default MyNavbar;
