import axios from 'axios';

const API_URL = '/api/recipes'; 

export const getAllRecipes = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const getRecipeById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createRecipe = async (data: any) => {
  const response = await axios.post(`${API_URL}`, data);
  return response.data;
};

export const updateRecipe = async (id: number, data: any) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteRecipe = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const bookmarkRecipe = async (recipeId: number) => {
  const response = await axios.post(`${API_URL}/${recipeId}/bookmark`);
  return response.data;
};

export const unbookmarkRecipe = async (recipeId: number) => {
  const response = await axios.delete(`${API_URL}/${recipeId}/bookmark`);
  return response.data;
};

export const getBookmarkedRecipes = async () => {
  const response = await axios.get(`${API_URL}/bookmarks`);
  return response.data;
};

export const searchRecipes = async (queryParams: Record<string, any>) => {
  const query = new URLSearchParams(queryParams).toString();
  const response = await axios.get(`${API_URL}/search?${query}`);
  return response.data;
};
