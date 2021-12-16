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
            <h1 className="loca-logo">LOCA</h1>
          </Link>
        </div>
        {!isLoggedIn && (
          <div>
            <Link to="/signup">
              <Button className="my-btn-white">SIGN UP</Button>
            </Link>

            <Link to="/login">
              <Button className="my-btn-black">LOGIN</Button>
            </Link>
          </div>
        )}

        {owner && (
          <div>
            <Link to="/profile">
              <Button className="profile-link">PROFILE</Button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default MyNavbar;
