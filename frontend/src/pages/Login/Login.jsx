import "./Login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    function handleSubmit(e) {

        e.preventDefault();

        if (!email || !password) {

            setError("Please fill in all fields.");

            return;
        }

        const success = login(email, password);

        if (!success) {

            setError("Invalid email or password.");

            return;
        }

        navigate("/");
    }

    return (

        <div className="login-page">

            <form
                className="login-card"
                onSubmit={handleSubmit}
            >

                <h1>Welcome Back</h1>

                <p>
                    Login to CampusConnect
                </p>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                <label>Email</label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <label>Password</label>

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>

                <span>

                    Don't have an account?

                    <Link to="/register">
                        Register
                    </Link>

                </span>

            </form>

        </div>

    );
}

export default Login;