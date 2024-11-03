import { Link, Outlet } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <header>
        <div className="nav_div">
          <p>DEV@Deakin</p>
          <input type="search" placeholder="Search..." />
          <div className="nav_but">
            
            <Link to="/login">
            <button>Login</button>
            </Link>
          </div>
        </div>
      </header>
        <Outlet/>
    </div>
  );
}

export default NavBar;