import { createContext, useContext, useEffect, useState } from "react";
import communitiesData from "../data/communities";

const CommunityContext = createContext();

export function CommunityProvider({ children }) {

    const [communities, setCommunities] = useState(() => {
        const saved = localStorage.getItem("communities");

        return saved
            ? JSON.parse(saved)
            : communitiesData;
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