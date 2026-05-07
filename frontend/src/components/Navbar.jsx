import { NavLink, useNavigate } from "react-router-dom";
import { useGetMeQuery, useLogoutMutation } from "../services/authAPI";

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
    } catch(e) {
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
            <button onClick={handleLogout}>Logout</button>
        }
      </ul>
    </nav>
  )
}

export default Navbar