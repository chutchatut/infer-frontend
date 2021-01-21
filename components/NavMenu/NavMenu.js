import { useRouter } from "next/router";
import React from "react";
import {
  UserOutlined,
  HomeOutlined,
  FileImageOutlined,
  HistoryOutlined,
  MedicineBoxOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

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

  return (
    <Menu
      mode="inline"
      selectedKeys={[router.pathname.replace("/", "")]}
      defaultOpenKeys={["diag"]}
      style={{ height: "100%", borderRight: 0 }}
    >
      {getMenuItem(
        "home",
        <>
          <HomeOutlined />
          Home
        </>
      )}
      <SubMenu key="diag" icon={<MedicineBoxOutlined />} title="Diagnosis">
        {getMenuItem(
          "upload-image",
          <>
            <FileImageOutlined />
            Upload image
          </>
        )}

        {getMenuItem(
          "new-diagnosis",
          <>
            <FolderAddOutlined />
            New diagnosis
          </>
        )}

        {getMenuItem(
          "history",
          <>
            <HistoryOutlined />
            View history
          </>
        )}
      </SubMenu>
      {getMenuItem(
        "about-us",
        <>
          <UserOutlined />
          About us
        </>
      )}
    </Menu>
  );
};

export default NavMenu;
