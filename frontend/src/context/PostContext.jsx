import { createContext, useContext, useEffect, useState } from "react";
import postsData from "../data/posts";

const PostContext = createContext();

export function PostProvider({ children }) {

    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem("posts");

        return saved
            ? JSON.parse(saved)
            : postsData;
    });

    useEffect(() => {

        localStorage.setItem(
            "posts",
            JSON.stringify(posts)
        );

    }, [posts]);

    function addPost(post) {

        setPosts((prev) => [
            ...prev,
            post,
        ]);
    }

    function deletePost(postId) {

        setPosts((prev) =>
            prev.filter((post) => post.id !== postId)
        );
    }

    return (
        <PostContext.Provider
            value={{
                posts,
                addPost,
                deletePost,
            }}
        >
            {children}
        </PostContext.Provider>
    );
}

export function usePosts() {
    return useContext(PostContext);
}