import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUserActions } from "./store/authUser";
import jwt_decode from "jwt-decode";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import HomePage from "./pages/Home/HomePage";
import ChatPage from "./pages/Chat/ChatPage";
import LoginPage from "./pages/Login/LoginPage";
import About from "./components/About/About";
import Register from "./pages/Register/Register";
import AuthRoute from "./AuthRouth/AuthRoute";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (!userToken) {
      dispatch(authUserActions.logout());
      dispatch(authUserActions.setUserInfo({}));
      return;
    }
    const decodeToken = jwt_decode(userToken);
    const dateNow = new Date();

    if (decodeToken.exp < dateNow.getTime() / 1000) {
      dispatch(authUserActions.logout());
      dispatch(authUserActions.setUserInfo({}));
      localStorage.clear();
      navigate("login");
    } else {
      dispatch(authUserActions.login());
      dispatch(authUserActions.setUserInfo(decodeToken));
    }
  }, []);

  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route
          path="/chat"
          element={
            <AuthRoute>
              <ChatPage />
            </AuthRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
