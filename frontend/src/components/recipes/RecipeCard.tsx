// components/recipes/RecipeCard.tsx
import React from 'react';

type Recipe = {
  id: number;
  title: string;
  imageUrl: string;
  servings: number;
  country: string;
  rating: number;
};

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.imageUrl} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p>Serves: {recipe.servings}</p>
      <p>Country: {recipe.country}</p>
      <p>Rating: {recipe.rating} ⭐</p>
    </div>
  );
};

export default RecipeCard;
