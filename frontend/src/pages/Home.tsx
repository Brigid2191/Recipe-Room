import { useEffect, useState } from "react";
import RecipeCard from "../components/recipes/RecipeCard";
import { getRecipes } from "../services/recipeService";

// Define or import a proper Recipe interface
interface Recipe {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  // add more fields if needed
}

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-info mb-4">Welcome to Recipe Room</h1>
      {loading ? (
        <p>Loading recipes...</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {recipes.map((recipe) => (
            <div className="col" key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
