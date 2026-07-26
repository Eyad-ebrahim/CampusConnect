import "./CommunityDirectory.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function CommunityDirectory() {
  const [communities, setCommunities] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    try {
      const [communitiesRes, profileRes] = await Promise.all([
        api.get("/communities"),
        api.get("/users/me"),
      ]);

      setCommunities(communitiesRes.data.communities);

      setJoinedCommunities(
        profileRes.data.profile.communities.map(
          (community) => community.community_id
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function joinCommunity(id) {
    try {
      await api.post(`/communities/${id}/join`);
      await loadData();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to join community."
      );
    }
  }

  async function leaveCommunity(id) {
    try {
      await api.delete(`/communities/${id}/join`);
      await loadData();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to leave community."
      );
    }
  }

  const filtered = communities.filter((community) =>
    community.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="community-grid">
          {filtered.map((community) => {
            const isJoined = joinedCommunities.includes(
              community.community_id
            );

            return (
              <div
                key={community.community_id}
                className="community-card"
              >
                <h2>{community.name}</h2>

                <p>{community.description}</p>

                <div className="card-buttons">
                  <Link
                    to={`/community/${community.community_id}`}
                    className="view-btn"
                  >
                    View Community
                  </Link>

                  {isJoined ? (
                    <button
                      className="join-btn"
                      onClick={() =>
                        leaveCommunity(
                          community.community_id
                        )
                      }
                    >
                      Leave
                    </button>
                  ) : (
                    <button
                      className="join-btn"
                      onClick={() =>
                        joinCommunity(
                          community.community_id
                        )
                      }
                    >
                      Join
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CommunityDirectory;