
import API from "../api/axios";

export interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
  country: string;
  serves: number;
  user_id: number;
  created_at?: string;
}


export const getRecipes = async (): Promise<any> => {
  const response = await API.get("/recipes");

// Fetch all recipes with optional filters
export const getRecipes = async (params?: Record<string, string | number>): Promise<Recipe[]> => {
  const response = await API.get("/recipes", { params });

  return response.data;
};
 
export const getRecipeById = async (id: number): Promise<Recipe> => {
  const response = await API.get(`/recipes/${id}`);
  return response.data;
};

export const createRecipe = async (recipeData: Partial<Recipe>): Promise<{ message: string }> => {
  const response = await API.post("/recipes", recipeData);
  return response.data;
};

export const updateRecipe = async (id: number, recipeData: Partial<Recipe>): Promise<{ message: string }> => {
  const response = await API.put(`/recipes/${id}`, recipeData);
  return response.data;
};
 
export const deleteRecipe = async (id: number): Promise<{ message: string }> => {
  const response = await API.delete(`/recipes/${id}`);
  return response.data;
};

// Search recipes by query string
export const searchRecipes = async (query: string): Promise<Recipe[]> => {
  const response = await API.get(`/recipes/search?q=${encodeURIComponent(query)}`);
  return response.data;
};

// Optional delay for loading simulations
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
