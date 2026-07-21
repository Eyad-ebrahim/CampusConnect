import "./CommunityDirectory.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCommunities } from "../../context/CommunityContext";



function CommunityDirectory() {
  const [search, setSearch] = useState("");
const { currentUser, toggleCommunity } = useAuth();

const joinedCommunities =
  currentUser?.joinedCommunities || [];
const { communities: communityList, updateMembers } = useCommunities();
  const filteredCommunities = communityList.filter((community) =>
    community.name.toLowerCase().includes(search.toLowerCase())
  );

  function toggleJoin(id) {

    const joined = joinedCommunities.includes(id);

    toggleCommunity(id);

    updateMembers(id, !joined);
}

  return (
    <div className="community-directory">
      <h1>Community Directory</h1>

      <input
        className="search-bar"
        type="text"
        placeholder="Search communities..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="community-grid">
        {filteredCommunities.length > 0 ? (
          filteredCommunities.map((community) => (
            <div key={community.id} className="community-card">
              <h2>{community.name}</h2>

              <p>{community.description}</p>

              <div className="community-info">
                <span>
                  👥 {community.members}{" "}
                  {community.members === 1 ? "member" : "members"}
                </span>

                <span>{community.category}</span>
              </div>

              <div className="card-buttons">
                <Link
                  to={`/community/${community.id}`}
                  className="view-btn"
                >
                  View Community
                </Link>

                <button
                  className={
                    joinedCommunities.includes(community.id)
                      ? "leave-btn"
                      : "join-btn"
                  }
                  onClick={() => toggleJoin(community.id)}
                >
                  {joinedCommunities.includes(community.id)
                    ? "Leave"
                    : "Join"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h2>No communities found 😕</h2>
            <p>Try searching for something else.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommunityDirectory;