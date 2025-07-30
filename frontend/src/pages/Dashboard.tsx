import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Bookmark, PlusCircle, Settings } from "lucide-react";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Dashboard</h1>

        {user && (
          <p className="text-xl text-gray-700 mb-8">
            👋 Welcome back, <span className="font-semibold">{user.username}</span>!
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            onClick={() => navigate("/my-recipes")}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-md cursor-pointer transition"
          >
            <BookOpen className="text-indigo-600 mb-2" size={32} />
            <h2 className="text-lg font-semibold">My Recipes</h2>
            <p className="text-sm text-gray-500">View and manage your shared recipes.</p>
          </div>

          <div
            onClick={() => navigate("/bookmarks")}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-md cursor-pointer transition"
          >
            <Bookmark className="text-yellow-500 mb-2" size={32} />
            <h2 className="text-lg font-semibold">Bookmarks</h2>
            <p className="text-sm text-gray-500">Access your saved recipes.</p>
          </div>

          <div
            onClick={() => navigate("/add-recipe")}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-md cursor-pointer transition"
          >
            <PlusCircle className="text-green-500 mb-2" size={32} />
            <h2 className="text-lg font-semibold">Add Recipe</h2>
            <p className="text-sm text-gray-500">Create and share a new recipe.</p>
          </div>

          <div
            onClick={() => navigate("/profile")}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-md cursor-pointer transition"
          >
            <Settings className="text-gray-700 mb-2" size={32} />
            <h2 className="text-lg font-semibold">Profile Settings</h2>
            <p className="text-sm text-gray-500">Update your account information.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
