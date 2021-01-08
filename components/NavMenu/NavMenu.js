import { useRouter } from "next/router";
import React from "react";
import {
  UserOutlined,
  HomeOutlined,
  FileImageOutlined,
  HistoryOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const NavMenu = (props) => {
  const router = useRouter();
  const { SubMenu } = Menu;
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[props.curPath]}
      defaultOpenKeys={["diag"]}
      style={{ height: "100%" }}
    >
      <Menu.Item
        key="home"
        onClick={() => {
          router.push("home");
        }}
      >
        <HomeOutlined />
        Home
      </Menu.Item>
      <SubMenu key="diag" icon={<MedicineBoxOutlined />} title="Diagnosis">
        <Menu.Item
          key="new-diagnosis"
          onClick={() => {
            router.push("new-diagnosis");
          }}
        >
          <FileImageOutlined />
          New diagnosis
        </Menu.Item>
        <Menu.Item
          key="history"
          onClick={() => {
            router.push("history");
          }}
        >
          <HistoryOutlined />
          View history
        </Menu.Item>
      </SubMenu>
      <Menu.Item
        key="about-us"
        onClick={() => {
          router.push("about-us");
        }}
      >
        <UserOutlined />
        About us
      </Menu.Item>
    </Menu>
  );
};

export default NavMenu;
