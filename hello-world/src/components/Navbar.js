import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../store/authSlice";



function Navbar() {
    const user = useSelector((store) => store.auth.user);
    const dispatch = useDispatch(); // Corrected function name capitalization
    const navigate = useNavigate(); // Added `=` operator

    function logout() {
        if (user) {
            axios.post(
                'https://demo-blog.mashupstack.com/api/logout',
                {},
                {
                    headers: { Authorization: "Bearer " + user.token }, // Added space after "Bearer"
                }
            ).then(() => {
                dispatch(removeUser());
                navigate('/login');
            }).catch((error) => {
                console.error("Logout failed:", error); // Added error handling
            });
        }
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="navbar-brand">
                <h4>Todo List</h4>
            </div>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div
                className="collapse navbar-collapse"
                id="navbarNav"
                style={{ float: "left" }}
            >
                <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
                    <li className="nav-item">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                "nav-link" + (isActive ? " active" : "")
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/aboutus"
                            className={({ isActive }) =>
                                "nav-link" + (isActive ? " active" : "")
                            }
                        >
                            About Us
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/crud"
                            className={({ isActive }) =>
                                "nav-link" + (isActive ? " active" : "")
                            }
                        >
                            Crud
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/blog/posts"
                            className={({ isActive }) =>
                                "nav-link" + (isActive ? " active" : "")
                            }
                        >
                            Blog
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/register"
                            className={({ isActive }) =>
                                "nav-link" + (isActive ? " active" : "")
                            }
                        >
                            Register
                        </NavLink>
                    </li>
                    {user ? (
                        <li className="nav-item">
                            <span
                                className="nav-link"
                                style={{ cursor: "pointer" }}
                                onClick={logout} // Added logout function call
                            >
                                Logout
                            </span>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    "nav-link" + (isActive ? " active" : "")
                                }
                            >
                                Login
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
