import { useEffect, useState } from "react";
import RecipeCard from "../components/recipes/RecipeCard";
import { getRecipes } from "../services/recipeService";
import Loader from "../components/Loader";

interface Recipe {
  id: number;
  title: string;
  description: string;
  image_url?: string;
}

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const fetchRecipes = async (searchTerm = "") => {
    setLoading(true);
    try {
      const data = await getRecipes(searchTerm ? { name: searchTerm } : {});
      setRecipes(data);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchRecipes(query);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-info mb-4">Welcome to Recipe Room</h1>

      <form className="mb-4 d-flex" onSubmit={handleSearch}>
        <input
          className="form-control me-2"
          type="text"
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-info text-white" type="submit">
          Search
        </button>
      </form>

      {loading ? (
        <Loader />
      ) : recipes.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {recipes.map((recipe) => (
            <div className="col" key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default Home;
