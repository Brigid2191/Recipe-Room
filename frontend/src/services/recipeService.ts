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

export const getRecipes = async (): Promise<Recipe[]> => {
  const response = await API.get("/recipes");
  return response.data;
};

export const getRecipeById = async (id: number): Promise<Recipe> => {
  const response = await API.get(`/recipes/${id}`);
  return response.data;
};

export const createRecipe = async (
  recipeData: Partial<Recipe>
): Promise<{ message: string }> => {
  const response = await API.post("/recipes", recipeData);
  return response.data;
};

export const updateRecipe = async (
  id: number,
  recipeData: Partial<Recipe>
): Promise<{ message: string }> => {
  const response = await API.put(`/recipes/${id}`, recipeData);
  return response.data;
};

export const deleteRecipe = async (
  id: number
): Promise<{ message: string }> => {
  const response = await API.delete(`/recipes/${id}`);
  return response.data;
};
