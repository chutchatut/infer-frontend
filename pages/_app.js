import "../styles/globals.css";
import * as actions from "../store/actions";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { useEffect } from "react";
import store from "../store/store";
import "antd/dist/antd.css";
import { Layout, message } from "antd";
import NavMenu from "../components/NavMenu/NavMenu";
import TopBar from "../components/TopBar/TopBar";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // useSelector doesn't work because this is outside of the Provider
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

  if (router.query.pipeline) {
    // TODO set pipeline
    console.log(router.query.pipeline);
  }

  const { Header, Content, Footer, Sider } = Layout;
  const curPath = router.pathname.replace("/", "");
  return (
    <Provider store={store}>
      <Layout style={{ height: "100vh" }}>
        <Header className="header">
          <TopBar />
        </Header>
        <Content style={{ padding: "0 2vw" }}>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0" }}
          >
            <Sider className="site-layout-background" width={200}>
              <NavMenu curPath={curPath} />
            </Sider>
            <Content
              style={{
                padding: "0 24px",
                minHeight: 280,
              }}
            >
              <Component {...pageProps} />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Provider>
  );
}

export default MyApp;
