import axios from 'axios';

const API_URL = '/api/groups'; // Adjust this if your Flask endpoint differs

export const getAllGroups = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const getGroupById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createGroup = async (groupData: any) => {
  const response = await axios.post(`${API_URL}`, groupData);
  return response.data;
};

export const updateGroup = async (id: number, groupData: any) => {
  const response = await axios.put(`${API_URL}/${id}`, groupData);
  return response.data;
};

export const deleteGroup = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const joinGroup = async (groupId: number) => {
  const response = await axios.post(`${API_URL}/${groupId}/join`);
  return response.data;
};

export const leaveGroup = async (groupId: number) => {
  const response = await axios.post(`${API_URL}/${groupId}/leave`);
  return response.data;
};

export const getGroupMembers = async (groupId: number) => {
  const response = await axios.get(`${API_URL}/${groupId}/members`);
  return response.data;
};

export const getGroupRecipes = async (groupId: number) => {
  const response = await axios.get(`${API_URL}/${groupId}/recipes`);
  return response.data;
};
