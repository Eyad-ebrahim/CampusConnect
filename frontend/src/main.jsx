import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CommunityProvider } from "./context/CommunityContext";
import { PostProvider } from "./context/PostContext";
import { AuthProvider } from "./context/AuthContext";
import { CommentProvider } from "./context/CommentContext";
import { InteractionProvider } from "./context/InteractionContext";

createRoot(document.getElementById("root")).render(
<AuthProvider>
    <CommunityProvider>
        <PostProvider>
            <CommentProvider>
                <InteractionProvider>
                    <App />
                </InteractionProvider>
            </CommentProvider>
        </PostProvider>
    </CommunityProvider>
</AuthProvider>
);