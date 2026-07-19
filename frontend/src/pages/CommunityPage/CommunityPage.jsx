import "./CommunityPage.css";
import { useParams } from "react-router-dom";
import communities from "../../data/communities";
import postsData from "../../data/posts";

function CommunityPage() {

    const { id } = useParams();

    const community = communities.find(
        c => c.id === Number(id)
    );

    const communityPosts = postsData.filter(
        post => post.communityId === Number(id)
    );

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

            <h2 className="posts-title">
                Posts
            </h2>

            {

                communityPosts.length > 0 ? (

                    communityPosts.map(post => (

                        <div
                            key={post.id}
                            className="post-card"
                        >

                            <h3>{post.title}</h3>

                            <p>{post.content}</p>

                            <span>👍 {post.likes} Likes</span>

                        </div>

                    ))

                ) : (

                    <div className="no-posts">

                        No posts yet.

                    </div>

                )

            }

        </div>

    );

}

export default CommunityPage;