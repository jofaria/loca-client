import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <p> © Made by Joana Faria</p>
      <Link to="https://linkedin.com/in/joanaadaodefaria">LinkedIn</Link>
      <Link to="https://github.com/jofaria">Github</Link>
    </div>
  );
}

export default Footer;
