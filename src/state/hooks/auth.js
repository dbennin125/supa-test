import { useState } from "react";
import { supabase } from "../../supabaseClient";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    return supabase.auth
      .signIn({ email: email })
      .then(({ error }) => {
        if (error) throw error;
        alert("Check your email for the login link!");
      })
      .catch((error) => alert(error.error_description || error.message))
      .finally(() => setLoading(false));
  };
  return {
    loading,
    email,
    setEmail,
    setLoading,
    handleLogin,
  };
};
