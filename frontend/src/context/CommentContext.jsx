import { createContext, useContext, useEffect, useState } from "react";
import commentsData from "../data/comments";

const CommentContext = createContext();

export function CommentProvider({ children }) {

    const [comments, setComments] = useState(() => {
        const saved = localStorage.getItem("comments");

        return saved
            ? JSON.parse(saved)
            : commentsData;
    });

    useEffect(() => {
        localStorage.setItem(
            "comments",
            JSON.stringify(comments)
        );
    }, [comments]);

    function addComment(comment) {
        setComments((prev) => [...prev, comment]);
    }

    function deleteComment(commentId) {
        setComments((prev) =>
            prev.filter((comment) => comment.id !== commentId)
        );
    }

    return (
        <CommentContext.Provider
            value={{
                comments,
                addComment,
                deleteComment,
            }}
        >
            {children}
        </CommentContext.Provider>
    );
}

export function useComments() {
    return useContext(CommentContext);
}