import "./Recommendations.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

function Recommendations() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, []);

  async function loadRecommendations() {
    try {
      const res = await api.get("/recommendations");
      console.log(res.data);

      setRecommendations(res.data.recommendations);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleJoin(communityId) {
    try {
      await api.post(`/communities/${communityId}/join`);
      navigate(`/community/${communityId}`);
    } catch (error) {
      alert(error.response?.data?.message || "Unable to join community.");
    }
  }

  if (!currentUser) {
    return <h2>Please log in.</h2>;
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="recommendations-page">
      <h1>Recommended Communities</h1>

      {recommendations.length === 0 ? (
        <p>No recommendations available.</p>
      ) : (
        recommendations.map((community) => (
          <div
            key={community.community_id}
            className="recommendation-card"
          >
            <h2>{community.name}</h2>

            <p>{community.description}</p>

            <div className="recommendation-buttons">
              <button
                className="view-btn"
                onClick={() =>
                  navigate(`/community/${community.community_id}`)
                }
              >
                View Community
              </button>

              <button
                className="join-btn"
                onClick={() =>
                  handleJoin(community.community_id)
                }
              >
                Join & Visit
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Recommendations;