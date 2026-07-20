import "./PostDetail.css";

import { useParams } from "react-router-dom";

import posts from "../../data/posts";
import comments from "../../data/comments";
import users from "../../data/users";
import communities from "../../data/communities";

function PostDetail() {
  const { id } = useParams();

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
              </div>
            );
          })
        ) : (
          <p className="no-comments">
            No comments yet. Be the first to comment!
          </p>
        )}

      </div>
    </div>
  );
}

export default PostDetail;