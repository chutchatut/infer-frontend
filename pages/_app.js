import "../styles/globals.css";
import * as actions from "../store/actions";
import { message } from "antd";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { useEffect } from "react";
import store from "../store/store";
import "antd/dist/antd.css";
import Menu from "../hoc/Menu/Menu";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // useSelector doesn't work because this is outside of Redux Provider
  // const token = useSelector((state) => state.auth.token);
  const token = store.getState().auth.token;

  useEffect(() => {
    // Restore token if it exists in local storage
    if (!token && localStorage.getItem("Token")) {
      store.dispatch(actions.authRestore());
    }
    // Redirect to login page if not logged in and no token exists
    else if (!token) router.replace("/login");
  }, [token]);

  if (router.pathname === "/login") {
    // Don't inject menu on login page
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }

  // useEffect(() => {
  //   const currentProject = store.getState().project.currentProject;
  //   if (router.pathname !== "/home" && !currentProject) {
  //     // Redirect to home page if a project is not selected
  //     // Make sure this code is behind login's return statement to avoid infinite loop
  //     message.info("Please select a project!");
  //     router.replace("/home");
  //   }
  // }, [router.pathname]);

  // Inject menu
  return (
    <Provider store={store}>
      <Menu>
        <Component {...pageProps} />
      </Menu>
    </Provider>
  );
}

export default MyApp;
