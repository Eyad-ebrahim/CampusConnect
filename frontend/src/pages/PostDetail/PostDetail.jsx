import "./PostDetail.css";

import { useParams } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { usePosts } from "../../context/PostContext";
import { useComments } from "../../context/CommentContext";
import { useCommunities } from "../../context/CommunityContext";

function PostDetail() {
  const { id } = useParams();

  const { currentUser, users } = useAuth();
  const { posts } = usePosts();
  const { communities } = useCommunities();
  const {
    comments,
    addComment,
    deleteComment,
  } = useComments();

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

  const postComments = comments.filter(
    (comment) => comment.postId === post.id
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

    addComment(comment);

    setNewComment("");
  }

  function handleDeleteComment(commentId) {
    deleteComment(commentId);
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

        {postComments.length > 0 ? (
          postComments.map((comment) => {
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