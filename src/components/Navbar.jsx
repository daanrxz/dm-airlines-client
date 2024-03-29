import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/auth.context";
import { useContext } from "react";
import "../components/Navbar.css"
function Navbar() {

  const { isLoggedIn, user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const logOutUser = () => {
    logOut();
    navigate('/');
  };

  if (!isLoggedIn) {
    return null;
  }
  
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src="https://i.ibb.co/RTQsqQw/logo-black.png" alt="Logo" className="logo-img" />
      </div>

      <div className="nav-buttons">
        <Link to="/" className="nav-link">
          <button className="bn13">Home</button>
        </Link>

        {/* New Button to Crew Members Page */}
        
        <Link to="/crews" className="nav-link">
          <button className="bn13">Crew</button>
        </Link>
        <Link to="/flights" className="nav-link">
          <button className="bn13">Flights</button>
        </Link>

      {/* LOGGED IN */}

        {isLoggedIn && (
          <>
            <button onClick={logOutUser} className="bn13">Logout</button>
            <span className="nav-user-name"><b><span className="user-blue">User:</span> </b>{user && user.name}</span>
          </>
        )}

      {/* NOT LOGGED IN */}

        {!isLoggedIn && (
          <>
            <Link to="/signup" className="nav-link">
              <button className="bn13">Sign Up</button>
            </Link>
            <Link to="/login" className="nav-link">
              <button className="bn13">Login</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
