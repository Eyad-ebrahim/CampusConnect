import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { currentUser, logout } = useAuth();

    return (

        <nav className="navbar">

            <div className="logo">
                <Link to="/">
                    CampusConnect
                </Link>
            </div>

            <div className="nav-links">

                <Link to="/">
                    Communities
                </Link>

                <Link to="/recommendations">
                    Recommendations
                </Link>

                <Link to="/profile">
                    Profile
                </Link>

            </div>

            <div className="auth-links">

                {currentUser ? (

                    <>

                        <span className="welcome">
                            Hi, {currentUser.name}
                        </span>

                        <button
                            className="logout-btn"
                            onClick={logout}
                        >
                            Logout
                        </button>

                    </>

                ) : (

                    <>

                        <Link to="/login">
                            Login
                        </Link>

                        <Link
                            className="register-btn"
                            to="/register"
                        >
                            Register
                        </Link>

                    </>

                )}

            </div>

        </nav>

    );
}

export default Navbar;