import { Link } from "react-router-dom";
import "../pages/Page.css";

function Navbar() {
  return (
    <div className="navbar">
      <h2>📂 PDR</h2>
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/documents">Documents</Link>
        <Link to="/search">Search</Link>
      </div>
    </div>
  );
}

export default Navbar;
