const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

function sanitizeRecipeName(name) {
  return name.trim().toLowerCase().replace(/\W+/g, '_');
}

const uploadRecipeImage = async (filePath, recipeName) => {
  const publicId = `recipes/${sanitizeRecipeName(recipeName)}`;
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'recipes',
      public_id: publicId,
      resource_type: 'image',
      overwrite: true,
    });
    return result.secure_url;
  } catch (error) {
    console.error(`[ERROR] Failed to upload '${recipeName}':`, error);
    return null;
  }
};

const uploadFromUrl = async (imageUrl, recipeName) => {
  const publicId = `recipes/${sanitizeRecipeName(recipeName)}`;
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: 'recipes',
      public_id: publicId,
      resource_type: 'image',
      overwrite: true,
    });
    return result.secure_url;
  } catch (error) {
    console.error(`[ERROR] Failed to upload from URL '${imageUrl}':`, error);
    return null;
  }
};

const deleteRecipeImage = async (recipeName) => {
  const publicId = `recipes/${sanitizeRecipeName(recipeName)}`;
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
    });
    return result;
  } catch (error) {
    console.error(`[ERROR] Failed to delete image '${recipeName}':`, error);
    return null;
  }
};

module.exports = {
  uploadRecipeImage,
  uploadFromUrl,
  deleteRecipeImage,
};
