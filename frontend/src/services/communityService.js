import api from "./api";

export const getCommunities = async () => {
    const response = await api.get("/communities");
    return response.data.communities;
};

export const joinCommunity = async (communityId) => {
    const response = await api.post(`/communities/${communityId}/join`);
    return response.data;
};

export const leaveCommunity = async (communityId) => {
    const response = await api.delete(`/communities/${communityId}/leave`);
    return response.data;
};