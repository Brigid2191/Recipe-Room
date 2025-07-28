import axios from '../api/axios';

export interface Group {
  id: number;
  name: string;
  description: string;
  image_url?: string;
  creator_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface Member {
  id: number;
  username: string;
  email: string;
  avatar_url?: string;
}

export interface Recipe {
  id: number;
  title: string;
  image_url: string;
  description: string;
  user_id: number;
}

const API_URL = '/api/groups';

export const getAllGroups = async (): Promise<Group[]> => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const getGroupById = async (id: number): Promise<Group> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createGroup = async (groupData: Partial<Group>): Promise<Group> => {
  const response = await axios.post(`${API_URL}`, groupData);
  return response.data;
};

export const updateGroup = async (id: number, groupData: Partial<Group>): Promise<Group> => {
  const response = await axios.put(`${API_URL}/${id}`, groupData);
  return response.data;
};

export const deleteGroup = async (id: number): Promise<{ message: string }> => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const joinGroup = async (groupId: number): Promise<{ message: string }> => {
  const response = await axios.post(`${API_URL}/${groupId}/join`);
  return response.data;
};

export const leaveGroup = async (groupId: number): Promise<{ message: string }> => {
  const response = await axios.post(`${API_URL}/${groupId}/leave`);
  return response.data;
};

export const getGroupMembers = async (groupId: number): Promise<Member[]> => {
  const response = await axios.get(`${API_URL}/${groupId}/members`);
  return response.data;
};

export const getGroupRecipes = async (groupId: number): Promise<Recipe[]> => {
  const response = await axios.get(`${API_URL}/${groupId}/recipes`);
  return response.data;
};
