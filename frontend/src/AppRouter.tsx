import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import RecipeDetail from "./pages/RecipeDetail";
import CreateRecipe from "./pages/CreateRecipe";
import Profile from "./pages/Profile";
import Bookmarks from "./pages/Bookmarks";
import Groups from "./pages/Groups";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import RecipeUploader from "./components/RecipeUploader";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="recipes/:id" element={<RecipeDetail />} />
        <Route path="recipe-uploader" element={<RecipeUploader />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="create-recipe" element={<CreateRecipe />} />
          <Route path="profile" element={<Profile />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="groups" element={<Groups />} />
        </Route>
      </Route>

      {/* Optional: catch-all for 404 */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
