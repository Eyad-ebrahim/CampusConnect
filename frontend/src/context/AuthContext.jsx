import { createContext, useContext, useState, useEffect } from "react";
import usersData from "../data/users";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem("users");

        return savedUsers
            ? JSON.parse(savedUsers)
            : usersData;
    });

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {

        const savedUser = localStorage.getItem("currentUser");

        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
        }

    }, []);

    useEffect(() => {

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

    }, [users]);

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

    function toggleCommunity(communityId) {

        if (!currentUser) return;

        const joined =
            currentUser.joinedCommunities.includes(communityId);

        const updatedUser = {
            ...currentUser,
            joinedCommunities: joined
                ? currentUser.joinedCommunities.filter(
                      (id) => id !== communityId
                  )
                : [
                      ...currentUser.joinedCommunities,
                      communityId,
                  ],
        };

        const updatedUsers = users.map((user) =>
            user.id === updatedUser.id
                ? updatedUser
                : user
        );

        setUsers(updatedUsers);

        setCurrentUser(updatedUser);

        localStorage.setItem(
            "currentUser",
            JSON.stringify(updatedUser)
        );
    }

    return (

        <AuthContext.Provider
            value={{
                users,
                currentUser,
                login,
                logout,
                register,
                toggleCommunity,
            }}
        >

            {children}

        </AuthContext.Provider>

    );
}

export function useAuth() {

    return useContext(AuthContext);

}