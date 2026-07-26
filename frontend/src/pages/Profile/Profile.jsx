import "./Profile.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

function Profile() {
  const { currentUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const res = await api.get("/users/me");
      setProfile(res.data.profile);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (!currentUser) {
    return (
      <div className="profile-page">
        <h2>Please log in to view your profile.</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="profile-page">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-page">
        <h2>Unable to load profile.</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="profile-avatar">
          {profile.user.username.charAt(0).toUpperCase()}
        </div>

        <h1>{profile.user.username}</h1>

        <p>{profile.user.email}</p>

        <div className="profile-stats">

          <div className="stat">
            <h2>{profile.communities.length}</h2>
            <p>Communities</p>
          </div>

          <div className="stat">
            <h2>{profile.posts.length}</h2>
            <p>Posts</p>
          </div>

          <div className="stat">
            <h2>{profile.comments.length}</h2>
            <p>Comments</p>
          </div>

        </div>

        <div className="joined-section">
          <h3>Joined Communities</h3>

          {profile.communities.length > 0 ? (
            <ul>
              {profile.communities.map((community) => (
                <li key={community.community_id}>
                  <Link to={`/community/${community.community_id}`}>
                    {community.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No communities joined yet.</p>
          )}
        </div>

        <div className="joined-section">
          <h3>My Posts</h3>

          {profile.posts.length > 0 ? (
            <ul>
              {profile.posts.map((post) => (
                <li key={post.post_id}>
                  <Link to={`/post/${post.post_id}`}>
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No posts created yet.</p>
          )}
        </div>

        <div className="joined-section">
          <h3>My Comments</h3>

          {profile.comments.length > 0 ? (
            <ul>
              {profile.comments.map((comment) => (
                <li key={comment.comment_id}>
                  <Link to={`/post/${comment.post_id}`}>
                    {comment.body}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Profile;