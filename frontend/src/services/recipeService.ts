// src/services/recipeService.ts
import API from "../api/axios";
import type { Recipe } from "../types/Recipe";

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
