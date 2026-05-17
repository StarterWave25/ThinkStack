import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetMeQuery, useLogoutMutation, authAPI } from "../services/authAPI";
import './styles/Navbar.css'

function Navbar() {
  const [logoutUser] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useGetMeQuery();
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

  // Icons
  const Icons = {
    Home: () => (
      <svg className="nav-icon" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
    ),
    Problems: () => (
      <svg className="nav-icon" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
    ),
    Profile: () => (
      <svg className="nav-icon" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
    ),
    Login: () => (
      <svg className="nav-icon" viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
    ),
    Register: () => (
      <svg className="nav-icon" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
    ),
    Logout: () => (
      <svg className="nav-icon" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
    )
  };

  return (
    <div className="navbar-container">
      <nav className="navbar-glass">
        <Link to={isLoggedIn ? "/home" : "/login"} className="navbar-logo">
          ThinkStack
        </Link>
        
        <ul className="navigation-links">
          {!isLoggedIn ? (
            <>
              <li className="navigate-link">
                <NavLink to="/login">
                  <Icons.Login />
                  <span className="nav-text">Login</span>
                </NavLink>
              </li>
              <li className="navigate-link">
                <NavLink to="/">
                  <Icons.Register />
                  <span className="nav-text">Register</span>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="navigate-link">
                <NavLink to="/home">
                  <Icons.Home />
                  <span className="nav-text">Home</span>
                </NavLink>
              </li>
              <li className="navigate-link">
                <NavLink to="/problems">
                  <Icons.Problems />
                  <span className="nav-text">Problems</span>
                </NavLink>
              </li>
              <li className="navigate-link">
                <NavLink to="/profile">
                  <Icons.Profile />
                  <span className="nav-text">Profile</span>
                </NavLink>
              </li>
              <button onClick={handleLogout} className="logout-nav-button">
                <Icons.Logout />
                <span className="nav-text">Logout</span>
              </button>
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
