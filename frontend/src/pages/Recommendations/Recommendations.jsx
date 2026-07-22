import "./Recommendations.css";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useCommunities } from "../../context/CommunityContext";
import { useInteractions } from "../../context/InteractionContext";

function Recommendations() {
  const navigate = useNavigate();

  const { currentUser, toggleCommunity } = useAuth();
  const { communities, updateMembers } = useCommunities();
  const { interactions, addInteraction } = useInteractions();

  if (!currentUser) {
    return <h2>Please log in.</h2>;
  }

  const joinedCommunities = currentUser.joinedCommunities || [];

  const userInteractions = interactions.filter(
    (interaction) => interaction.userId === currentUser.id
  );

  // Calculate scores for each category
  const categoryScores = {};

  userInteractions.forEach((interaction) => {
    const community = communities.find(
      (c) => c.id === interaction.communityId
    );

    if (!community) return;

    if (!categoryScores[community.category]) {
      categoryScores[community.category] = 0;
    }

    switch (interaction.type) {
      case "join":
        categoryScores[community.category] += 3;
        break;

      case "comment":
        categoryScores[community.category] += 2;
        break;

      case "view":
        categoryScores[community.category] += 1;
        break;

      default:
        break;
    }
  });

  const recommendations = communities
    .filter(
      (community) =>
        !joinedCommunities.includes(community.id)
    )
    .map((community) => ({
      ...community,
      score: categoryScores[community.category] || 0,
    }))
    .filter((community) => community.score > 0)
    .sort((a, b) => b.score - a.score);

  function handleJoin(communityId) {
    toggleCommunity(communityId);

    updateMembers(communityId, true);

    addInteraction({
      userId: currentUser.id,
      communityId,
      type: "join",
    });

    navigate(`/community/${communityId}`);
  }

  function handleView(communityId) {
    navigate(`/community/${communityId}`);
  }

  function getRecommendationLevel(score) {
    if (score >= 10) {
      return "⭐⭐⭐ Highly Recommended";
    }

    if (score >= 5) {
      return "⭐⭐ Recommended";
    }

    return "⭐ Worth Exploring";
  }

  return (
    <div className="recommendations-page">
      <h1>Recommended Communities</h1>

      {recommendations.length === 0 ? (
        <p>
          No recommendations available.
          <br />
          Start joining communities, viewing posts,
          and commenting to receive personalized
          recommendations.
        </p>
      ) : (
        recommendations.map((community) => (
          <div
            key={community.id}
            className="recommendation-card"
          >
            <h2>{community.name}</h2>

            <p>{community.description}</p>

            <p>
              <strong>Category:</strong>{" "}
              {community.category}
            </p>

            <p className="recommendation-level">
              {getRecommendationLevel(
                community.score
              )}
            </p>

            <p className="recommendation-reason">
              Based on your activity in{" "}
              <strong>{community.category}</strong>{" "}
              communities.
            </p>

            <p>
              <strong>Recommendation Score:</strong>{" "}
              {community.score}
            </p>

            <div className="recommendation-buttons">
              <button
                className="view-btn"
                onClick={() =>
                  handleView(community.id)
                }
              >
                View Community
              </button>

              <button
                className="join-btn"
                onClick={() =>
                  handleJoin(community.id)
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