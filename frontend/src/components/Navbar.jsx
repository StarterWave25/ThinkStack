import { NavLink, useNavigate } from "react-router-dom";

import { useGetMeQuery, useLogoutMutation } from "../services/authAPI";
import './styles/Navbar.css'

function Navbar() {

  const [logoutUser] = useLogoutMutation();
  const navigate = useNavigate();

  const {
    data,
  } = useGetMeQuery();

  const isLoggedIn = !!data;

  async function handleLogout() {
    try {
      const data = await logoutUser().unwrap();
      console.log(data);
      if (data.Ok) {
        navigate('/login');
      }
    } catch (e) {
      console.log("Error Logoutting user!", e);
      alert('Error in Logout');
    }
  }

  return (
    <nav>
      <ul className="navigation-links">
        {
          !isLoggedIn ?
            <>
              <li className="navigate-link">
                <NavLink to="/login">Login</NavLink>
              </li>
              <li className="navigate-link">
                <NavLink to="/">Register</NavLink>
              </li>
            </> :
            <>
              <li className="navigate-link">
                <NavLink to="/problems">Problems</NavLink>
              </li>
              <li className="navigate-link">
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <button
                onClick={handleLogout}
                className="logout-button"
              >
                Logout
              </button>
            </>
        }
      </ul>
    </nav>
  )
}

export default Navbar