import { useContext } from "react";
import { SessionContext } from "../contextProviders/SessionProvider";
import { Redirect, Route } from "react-router-dom";
import { LoadingSpinner } from "../../components/loader/Loader";

export const useSession = () => {
  const { session, loading } = useContext(SessionContext);
  return {
    session,
    loading,
  };
};

export const PrivateRoute = (props) => {
  const { session, loading } = useSession();

  if (loading) return <LoadingSpinner />;
  if (!session && !loading) return <Redirect to="/login" />;

  return <Route {...props} />;
};
