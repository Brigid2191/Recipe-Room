import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Recipe {
  id: number;
  title: string;
  description?: string; // optional if you want to keep it
  ingredients: string[];
  steps: string;
}

interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: [],
};

const recipeSlice = createSlice({
  name: 'recipes', // ✅ use plural
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
    },
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload);
    },
  },
});

export const { setRecipes, addRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
