import "./Profile.css";

import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useCommunities } from "../../context/CommunityContext";
import { usePosts } from "../../context/PostContext";
import { useComments } from "../../context/CommentContext";

function Profile() {
  const { currentUser } = useAuth();
  const { communities } = useCommunities();
  const { posts } = usePosts();
  const { comments } = useComments();

  if (!currentUser) {
    return (
      <div className="profile-page">
        <h2>Please log in to view your profile.</h2>
      </div>
    );
  }

  const joinedCommunities = communities.filter((community) =>
    currentUser.joinedCommunities.includes(community.id)
  );

  const userPosts = posts.filter(
    (post) => post.userId === currentUser.id
  );

  const userComments = comments.filter(
    (comment) => comment.userId === currentUser.id
  );

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="profile-avatar">
          {currentUser.name.charAt(0).toUpperCase()}
        </div>

        <h1>{currentUser.name}</h1>

        <p>{currentUser.email}</p>

        <div className="profile-stats">

          <div className="stat">
            <h2>{joinedCommunities.length}</h2>
            <p>Communities</p>
          </div>

          <div className="stat">
            <h2>{userPosts.length}</h2>
            <p>Posts</p>
          </div>

          <div className="stat">
            <h2>{userComments.length}</h2>
            <p>Comments</p>
          </div>

        </div>

        <div className="joined-section">
          <h3>Joined Communities</h3>

          {joinedCommunities.length > 0 ? (
            <ul>
              {joinedCommunities.map((community) => (
                <li key={community.id}>
                  <Link to={`/community/${community.id}`}>
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

          {userPosts.length > 0 ? (
            <ul>
              {userPosts.map((post) => (
                <li key={post.id}>
                  <Link to={`/post/${post.id}`}>
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

          {userComments.length > 0 ? (
            <ul>
              {userComments.map((comment) => (
                <li key={comment.id}>
                  <Link to={`/post/${comment.postId}`}>
                    {comment.content}
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