import "./CommunityPage.css";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import usersData from "../../data/users";
import { useCommunities } from "../../context/CommunityContext";
import { usePosts } from "../../context/PostContext";

function CommunityPage() {
  const { id } = useParams();
  const { currentUser, users } = useAuth();

const { communities } = useCommunities();

const community = communities.find(
    (community) => community.id === Number(id)
);

const { posts, addPost, deletePost } = usePosts();

const communityPosts = posts.filter(
    (post) => post.communityId === Number(id)
);
  

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleCreatePost() {
    if (!title.trim() || !content.trim()) return;

    const newPost = {
      id: Date.now(),
      communityId: Number(id),
      userId: currentUser.id,
      title,
      content,
      likes: 0,
    };

addPost(newPost);

    setTitle("");
    setContent("");
  }

  function handleDeletePost(postId) {
    deletePost(postId);
}

  if (!community) {
    return <h2>Community not found.</h2>;
  }

  return (
    <div className="community-page">
      <div className="community-header">
        <h1>{community.name}</h1>

        <p>{community.description}</p>

        <div className="community-meta">
          <span>👥 {community.members} members</span>
          <span>🏷 {community.category}</span>
        </div>
      </div>

      <div className="create-post-card">
        <h2>Create a Post</h2>

        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          rows="4"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={handleCreatePost}>
          Publish
        </button>
      </div>

      <h2 className="posts-title">Posts</h2>

      {communityPosts.length > 0 ? (
  communityPosts.map((post) => {
          const author = users.find(
            (user) => user.id === post.userId
          );

          return (
            <div
              key={post.id}
              className="post-card"
            >
              <div className="post-author">
                👤 <strong>{author?.name || "Unknown User"}</strong>
              </div>

              <h3>{post.title}</h3>

              <p>{post.content}</p>

              <div className="post-footer">
                <span>👍 {post.likes} Likes</span>

                <Link
                  to={`/post/${post.id}`}
                  className="view-discussion-btn"
                >
                  View Discussion
                </Link>

                {currentUser &&
                  post.userId === currentUser.id && (
                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDeletePost(post.id)
                      }
                    >
                      Delete
                    </button>
                  )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="no-posts">
          No posts yet.
        </div>
      )}
    </div>
  );
}

export default CommunityPage;