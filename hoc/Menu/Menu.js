import { Layout } from "antd";
import React from "react";
import NavMenu from "./NavMenu/NavMenu";
import TopBar from "./TopBar/TopBar";

const Menu = (props) => {
  const { Header, Content, Footer, Sider } = Layout;
  return (
    <Layout style={{ height: "100vh" }}>
      <Header className="header">
        <TopBar />
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <NavMenu />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              paddingTop: 14,
              margin: 0,
              minHeight: 280,
            }}
          >
            <div
              style={{
                background: "#fff",
                height: `calc(100vh - 100px)`,
                padding: "24px",
                overflow: "auto",
              }}
            >
              {props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Menu;
