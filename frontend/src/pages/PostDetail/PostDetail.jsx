import "./PostDetail.css";

import { useParams } from "react-router-dom";
import { useState } from "react";

import posts from "../../data/posts";
import commentsData from "../../data/comments";
import users from "../../data/users";
import communities from "../../data/communities";
import { useAuth } from "../../context/AuthContext";

function PostDetail() {
  const { id } = useParams();
  const { currentUser } = useAuth();

  const post = posts.find(
    (post) => post.id === Number(id)
  );

  if (!post) {
    return <h2>Post not found.</h2>;
  }

  const author = users.find(
    (user) => user.id === post.userId
  );

  const community = communities.find(
    (community) => community.id === post.communityId
  );

  const [comments, setComments] = useState(
    commentsData.filter(
      (comment) => comment.postId === post.id
    )
  );

  const [newComment, setNewComment] = useState("");

  function handleAddComment() {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      postId: post.id,
      userId: currentUser.id,
      content: newComment,
    };

    setComments([...comments, comment]);
    setNewComment("");
  }

  function handleDeleteComment(commentId) {
    setComments(
      comments.filter(
        (comment) => comment.id !== commentId
      )
    );
  }

  return (
    <div className="post-detail-page">
      <div className="post-detail-card">
        <span className="community-name">
          {community?.name}
        </span>

        <h1>{post.title}</h1>

        <div className="post-author">
          👤 {author?.name || "Unknown User"}
        </div>

        <p className="post-content">
          {post.content}
        </p>

        <div className="post-likes">
          👍 {post.likes} Likes
        </div>
      </div>

      <div className="comments-section">
        <h2>Comments</h2>

        {comments.length > 0 ? (
          comments.map((comment) => {
            const commentAuthor = users.find(
              (user) => user.id === comment.userId
            );

            return (
              <div
                key={comment.id}
                className="comment-card"
              >
                <strong>
                  {commentAuthor?.name || "Unknown User"}
                </strong>

                <p>{comment.content}</p>

                {currentUser &&
                  comment.userId === currentUser.id && (
                    <button
                      className="delete-comment-btn"
                      onClick={() =>
                        handleDeleteComment(comment.id)
                      }
                    >
                      Delete
                    </button>
                  )}
              </div>
            );
          })
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