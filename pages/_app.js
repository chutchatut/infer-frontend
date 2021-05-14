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

import getConfig from "next/config";
import LoadingModal from "../components/LoadingModal/LoadingModal";
const { publicRuntimeConfig } = getConfig();

axios.defaults.baseURL = publicRuntimeConfig.BACKEND_URL
  ? publicRuntimeConfig.BACKEND_URL
  : "http://35.72.157.253:8008";

const guardedPath = ["/upload-image", "/new-diagnosis", "/history"];

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response && err.response.statusText === "Unauthorized") {
        message.error("Invalid credential");
        router.push("/logout");
      }
      return Promise.reject(err);
    }
  );
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

  useEffect(() => {
    if (!token) return;
    const currentProject = store.getState().project.currentProject;
    if (guardedPath.indexOf(router.pathname) > -1 && !currentProject) {
      // Redirect to home page if a project is not selected
      message.info("Please select a project!");
      router.replace("/home");
    }
  }, [router.pathname]);

  useEffect(() => {
    if (router.asPath === "/") router.replace("/login");
  }, []);

  if (router.pathname === "/login") {
    // Don't inject menu on login page
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }

  // Inject menu
  return (
    <Provider store={store}>
      <Menu>
        <Component {...pageProps} />
      </Menu>
      <LoadingModal />
    </Provider>
  );
}

export default MyApp;
