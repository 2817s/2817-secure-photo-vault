import axios from "axios";

import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
} from "./cloudinary";

export const uploadImage = async (
  file,
  onProgress
) => {
  const formData = new FormData();

  formData.append("file", file);

  formData.append(
    "upload_preset",
    CLOUDINARY_UPLOAD_PRESET
  );

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) {
            return;
          }

          const percent = Math.round(
            (progressEvent.loaded * 100) /
              progressEvent.total
          );

          if (onProgress) {
            onProgress(percent);
          }
        },
      }
    );

    return response.data.secure_url;
  } catch (error) {
    console.error(
      "Cloudinary upload error:",
      error.response?.data ||
        error.message
    );

    throw error;
  }
};