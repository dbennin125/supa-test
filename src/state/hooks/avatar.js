import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient.js";

export const useAvatar = ({ url, onUpload }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  const downloadImage = async (path) => {
    return supabase.storage
      .from("avatars")
      .download(path)
      .then(({ data, error }) => {
        if (error) throw error;
        return data;
      })
      .then(URL.createObjectURL)
      .then(setAvatarUrl)
      .catch((err) => console.log("Error downloading image: ", err.message));
  };

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };
  return {
    uploadAvatar,
    uploading,
    avatarUrl,
  };
};
