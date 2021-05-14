import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
import {
  UserOutlined,
  HomeOutlined,
  FileImageOutlined,
  HistoryOutlined,
  MedicineBoxOutlined,
  FolderAddOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useSelector } from "react-redux";

const NavMenu = (props) => {
  const { SubMenu } = Menu;
  const router = useRouter();
  const getMenuItem = (path, children) => (
    <Menu.Item
      key={path}
      onClick={() => {
        router.push(path);
      }}
    >
      {children}
    </Menu.Item>
  );

  const isAdmin = useSelector((state) => state.auth.isAdmin);

  return (
    <Menu
      mode="inline"
      selectedKeys={[router.pathname]}
      defaultOpenKeys={["diag"]}
      style={{ height: "100%", borderRight: 0 }}
    >
      {getMenuItem(
        "/home",
        <>
          <HomeOutlined />
          Home
        </>
      )}
      <SubMenu key="diag" icon={<MedicineBoxOutlined />} title="Diagnosis">
        {getMenuItem(
          "/upload-image",
          <>
            <FileImageOutlined />
            Upload image
          </>
        )}

        {getMenuItem(
          "/new-diagnosis",
          <>
            <FolderAddOutlined />
            New diagnosis
          </>
        )}

        {getMenuItem(
          "/history",
          <>
            <HistoryOutlined />
            View history
          </>
        )}
      </SubMenu>
      {isAdmin &&
        getMenuItem(
          "/admin",
          <>
            <ToolOutlined />
            Admin
          </>
        )}
      {getMenuItem(
        "/about-us",
        <>
          <UserOutlined />
          About us
        </>
      )}
    </Menu>
  );
};

export default NavMenu;
