import { createContext, useContext, useState, useEffect } from "react";
import usersData from "../data/users";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [users, setUsers] = useState(usersData);

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {

        const savedUser = localStorage.getItem("currentUser");

        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
        }

    }, []);

    function login(email, password) {

        const user = users.find(
            (user) =>
                user.email === email &&
                user.password === password
        );

        if (!user) {
            return false;
        }

        setCurrentUser(user);

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        return true;
    }

    function logout() {

        setCurrentUser(null);

        localStorage.removeItem("currentUser");
    }

    function register(name, email, password) {

        const emailExists = users.some(
            (user) => user.email === email
        );

        if (emailExists) {
            return false;
        }

        const newUser = {
            id: users.length + 1,
            name,
            email,
            password,
            joinedCommunities: [],
        };

        const updatedUsers = [...users, newUser];

        setUsers(updatedUsers);

        setCurrentUser(newUser);

        localStorage.setItem(
            "currentUser",
            JSON.stringify(newUser)
        );

        return true;
    }

    return (

        <AuthContext.Provider
            value={{
                users,
                currentUser,
                login,
                logout,
                register,
            }}
        >

            {children}

        </AuthContext.Provider>

    );
}

export function useAuth() {

    return useContext(AuthContext);

}