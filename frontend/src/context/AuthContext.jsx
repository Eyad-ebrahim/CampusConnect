import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("currentUser");

        if (token && user) {
            setCurrentUser(JSON.parse(user));
        }

        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const data = await loginUser(email, password);

            localStorage.setItem("token", data.token);
            localStorage.setItem(
                "currentUser",
                JSON.stringify(data.user)
            );

            setCurrentUser(data.user);

            return {
                success: true,
                message: data.message,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Login failed.",
            };
        }
    };

    const register = async (username, email, password) => {
        try {
            await registerUser(username, email, password);

            // Automatically log in after successful registration
            return await login(email, password);
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Registration failed.",
            };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                login,
                register,
                logout,
                loading,
                isAuthenticated: !!currentUser,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}