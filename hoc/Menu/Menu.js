import { Layout } from "antd";
import { useRouter } from "next/router";
import React from "react";
import NavMenu from "../../components/NavMenu/NavMenu";
import TopBar from "../../components/TopBar/TopBar";

const Menu = (props) => {
  const router = useRouter();

  const { Header, Content, Footer, Sider } = Layout;
  const curPath = router.pathname.replace("/", "");
  return (
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
              {props.children}
            </Content>
          </Layout>
        </Content>
      </Layout>
  );
};

export default Menu;
