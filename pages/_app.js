// import "../styles/globals.css";
import * as actions from "../store/actions";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { useEffect } from "react";
import store from "../store/store";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // useSelector doesn't work because this is outside of the Provider
  // const token = useSelector((state) => state.auth.token);
  const token = store.getState().auth.token;

  useEffect(() => {
    // Restore token if it exists in local storage
    if (!token && localStorage.getItem("Token"))
      store.dispatch(actions.authRestore());
    // Redirect to login page
    else if (!token) router.replace("/login");
  }, [token]);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
