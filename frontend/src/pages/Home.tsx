import { useEffect, useState } from "react";
import RecipeCard from "../components/recipes/RecipeCard";
import { getRecipes } from "../services/recipeService";
import type { Recipe } from "../types/Recipe";

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showGenerate, setShowGenerate] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setShowGenerate(value.trim().length > 0);
  };

  const handleSearch = () => {
    setHasSearched(true);
    // Optionally implement filtering here
    console.log("Searching for:", search);
  };

  const handleGenerate = () => {
    console.log("Generating recipe for:", search);
  };

  return (
    <div className="container mt-4">
      {/* Search Form */}
      <div className="d-flex align-items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search or describe a recipe..."
          className="form-control fs-5 p-3"
          value={search}
          onChange={handleSearchChange}
        />
        <button
          className="btn"
          style={{ backgroundColor: "white", color: "black", fontWeight: "bold" }}
          onClick={handleSearch}
        >
          Search
        </button>
        {showGenerate && (
          <button
            className="btn btn-primary fs-5"
            onClick={handleGenerate}
          >
            Generate
          </button>
        )}
      </div>

      {/* Recipes List */}
      {!loading && recipes.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {recipes.map((recipe) => (
            <div className="col" key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      ) : !loading && hasSearched ? (
        <p className="fs-4">No recipes found.</p>
      ) : null}
    </div>
  );
};

export default Home;
