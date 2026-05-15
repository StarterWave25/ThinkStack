import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetMeQuery, useLogoutMutation, authAPI } from "../services/authAPI";
import './styles/Navbar.css'

function Navbar() {

  const [logoutUser] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data,
  } = useGetMeQuery();

  const isLoggedIn = !!data;

  async function handleLogout() {
    try {
      const response = await logoutUser().unwrap();
      if (response.OK) {
        dispatch(authAPI.util.resetApiState());
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