import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul className="navigation-links">
        <li className="navigate-link">
          <NavLink to="/login">Login</NavLink>
        </li>
        <li className="navigate-link">
          <NavLink to="/">Register</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar