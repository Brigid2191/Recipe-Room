// components/recipes/RecipeForm.tsx
import React, { useState } from 'react';

type RecipeFormProps = {
  onSubmit: (formData: any) => void;
};

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [procedure, setProcedure] = useState('');
  const [servings, setServings] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, ingredients, procedure, servings });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Recipe</h2>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Ingredients" value={ingredients} onChange={e => setIngredients(e.target.value)} required />
      <textarea placeholder="Procedure" value={procedure} onChange={e => setProcedure(e.target.value)} required />
      <input type="number" value={servings} onChange={e => setServings(parseInt(e.target.value))} min={1} required />
      <button type="submit">Save Recipe</button>
    </form>
  );
};

export default RecipeForm;
