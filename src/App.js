import "./index.css";
import Auth from "./components/auth/Auth";
import Account from "./components/account/Account";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom/cjs/react-router-dom.min";
import { PrivateRoute, useSession } from "./state/hooks/sessionHook";

export default function Home() {
  const { session, loading } = useSession();

  return (
    <>
      {session && !loading ? (
        <Redirect to="/dashboard" />
      ) : (
        <Redirect to="/login" />
      )}
      <Switch>
        <Route exact path="/login" component={Auth} />
        <PrivateRoute exact path="/dashboard" component={Account} />
      </Switch>
    </>
  );
}
