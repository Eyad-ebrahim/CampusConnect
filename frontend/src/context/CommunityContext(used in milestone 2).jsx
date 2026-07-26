import { createContext, useContext, useEffect, useState } from "react";
import communitiesData from "../data/communities";

const CommunityContext = createContext();

export function CommunityProvider({ children }) {

    const [communities, setCommunities] = useState(() => {
        const saved = localStorage.getItem("communities");

        if (!saved) {
            return communitiesData;
        }

        const storedCommunities = JSON.parse(saved);

        // Merge stored data with latest mock data
        return communitiesData.map((community) => {
            const stored = storedCommunities.find(
                (c) => c.id === community.id
            );

            return stored
                ? {
                      ...community,
                      ...stored,
                      category: community.category,
                  }
                : community;
        });
    });

    useEffect(() => {
        localStorage.setItem(
            "communities",
            JSON.stringify(communities)
        );
    }, [communities]);

    function updateMembers(communityId, joined) {
        setCommunities((prev) =>
            prev.map((community) => {
                if (community.id !== communityId) {
                    return community;
                }

                return {
                    ...community,
                    members: joined
                        ? community.members + 1
                        : community.members - 1,
                };
            })
        );
    }

    return (
        <CommunityContext.Provider
            value={{
                communities,
                updateMembers,
            }}
        >
            {children}
        </CommunityContext.Provider>
    );
}

export function useCommunities() {
    return useContext(CommunityContext);
}