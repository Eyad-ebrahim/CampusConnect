import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CommunityDirectory from "./pages/CommunityDirectory/CommunityDirectory";
import CommunityPage from "./pages/CommunityPage/CommunityPage";
import CreatePost from "./pages/CreatePost/CreatePost";
import PostDetail from "./pages/PostDetail/PostDetail";
import Profile from "./pages/Profile/Profile";
import Recommendations from "./pages/Recommendations/Recommendations";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<CommunityDirectory />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/community" element={<CommunityPage />} />

                <Route path="/create-post" element={<CreatePost />} />

                <Route path="/post" element={<PostDetail />} />

                <Route path="/profile" element={<Profile />} />

                <Route
                    path="/recommendations"
                    element={<Recommendations />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;