import "./PostDetail.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

function PostDetail() {
  const { id } = useParams();
  const { currentUser } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPost();
  }, [id]);

  async function loadPost() {
    try {
      const res = await api.get(`/posts/${id}`);

      setPost(res.data.post);
      setComments(res.data.comments);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddComment() {
    if (!newComment.trim()) return;

    try {
      await api.post(`/posts/${id}/comments`, {
        body: newComment,
      });

      setNewComment("");
      loadPost();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add comment.");
    }
  }

  async function handleDeleteComment(commentId) {
    try {
      await api.delete(`/comments/${commentId}`);
      loadPost();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete comment.");
    }
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!post) {
    return <h2>Post not found.</h2>;
  }

  return (
    <div className="post-detail-page">
      <div className="post-detail-card">
        <span className="community-name">
          {post.community_name}
        </span>

        <h1>{post.title}</h1>

        <div className="post-author">
          👤 {post.username}
        </div>

        <p className="post-content">
          {post.body}
        </p>
      </div>

      <div className="comments-section">
        <h2>Comments</h2>

        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.comment_id}
              className="comment-card"
            >
              <strong>{comment.username}</strong>

              <p>{comment.body}</p>

              {currentUser &&
                currentUser.username === comment.username && (
                  <button
                    className="delete-comment-btn"
                    onClick={() =>
                      handleDeleteComment(comment.comment_id)
                    }
                  >
                    Delete
                  </button>
                )}
            </div>
          ))
        ) : (
          <p className="no-comments">
            No comments yet. Be the first to comment!
          </p>
        )}

        <div className="add-comment">
          <h3>Add a Comment</h3>

          <textarea
            rows="3"
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) =>
              setNewComment(e.target.value)
            }
          />

          <button onClick={handleAddComment}>
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;