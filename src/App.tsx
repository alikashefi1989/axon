import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import { routes } from "./config/routes.config";
import { APP_ROUTE } from "./enums/appRoute.enum";
import { ReduxStoreModel } from "./models/reduxStore.model";
import { UserEntityModel } from "./models/user.model";
import ChatList from "./pages/Chat";
import ContactList from "./pages/ContactList";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  const user: UserEntityModel | null = useSelector<ReduxStoreModel, ReduxStoreModel['user']>((store: ReduxStoreModel) => store.user);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null && location.pathname !== APP_ROUTE.LOGIN) {
      navigate(routes.login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <Layout
        renderProps={() => {
          return <>
            <Routes>
              <Route key='1' path={APP_ROUTE.LOGIN} element={<Login />} />
              <Route key='2' path={APP_ROUTE.CONTACT_LIST} element={<ContactList />} />
              <Route key='3' path={APP_ROUTE.CHAT} element={<ChatList />} />
              <Route key='4' path={APP_ROUTE.PROFILE} element={<Profile />} />
            </Routes>
          </>
        }}
      />
    </>
  );
}

export default App;
