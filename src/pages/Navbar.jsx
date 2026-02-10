import { useNavigate } from "react-router-dom";
import "./Navbar.css"
function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h3>📁 DocAI</h3>
      <button onClick={logout} style={{background:"#f59e0b"}}>Logout</button>
    </div>
  );
}

export default Navbar;
