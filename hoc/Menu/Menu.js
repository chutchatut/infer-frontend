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
      <Layout>
        <Sider width={200} className="site-layout-background">
          <NavMenu curPath={curPath} />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Menu;
