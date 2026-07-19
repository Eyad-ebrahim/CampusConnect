import "./CommunityPage.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import usersData from "../../data/users";
import communities from "../../data/communities";
import postsData from "../../data/posts";

function CommunityPage() {
  const { id } = useParams();
  const { currentUser } = useAuth();

  const community = communities.find(
    (community) => community.id === Number(id)
  );

  const [posts, setPosts] = useState(
    postsData.filter(
      (post) => post.communityId === Number(id)
    )
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

    setPosts([newPost, ...posts]);

    setTitle("");
    setContent("");
  }

  function handleDeletePost(postId) {
    setPosts(posts.filter((post) => post.id !== postId));
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

      {posts.length > 0 ? (
        posts.map((post) => {
           
          const author = usersData.find(
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