import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Button } from "react-bootstrap";

function MyNavbar() {
  const { isLoggedIn, owner } = useContext(AuthContext);

  return (
    <div>
      <nav className="Navbar">
        <div>
          <Link to="/">
            <h1 className="loca-logo">L O C A</h1>
          </Link>
        </div>
        {!isLoggedIn && (
          <div>
            <Link to="/signup">
              <Button id="btn-signup">SIGN UP</Button>
            </Link>

            <Link to="/login">
              <Button id="btn-login">LOGIN</Button>
            </Link>
          </div>
        )}

        {owner && (
          <div>
            <Link to="/profile">
              <Button className="profile-link">Profile</Button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default MyNavbar;
