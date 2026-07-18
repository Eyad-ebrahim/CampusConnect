import "./Register.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Register() {

    const navigate = useNavigate();

    const { register } = useAuth();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    function handleSubmit(e) {

        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {

            setError("Please fill in all fields.");

            return;
        }

        if (password !== confirmPassword) {

            setError("Passwords do not match.");

            return;
        }

        const success = register(name, email, password);

        if (!success) {

            setError("Email already exists.");

            return;
        }

        navigate("/");
    }

    return (

        <div className="register-page">

            <form
                className="register-card"
                onSubmit={handleSubmit}
            >

                <h1>Create Account</h1>

                <p>Join CampusConnect today</p>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                <label>Name</label>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />

                <label>Email</label>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <label>Password</label>

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <label>Confirm Password</label>

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                />

                <button type="submit">
                    Register
                </button>

                <span>

                    Already have an account?

                    <Link to="/login">
                        Login
                    </Link>

                </span>

            </form>

        </div>

    );

}

export default Register;