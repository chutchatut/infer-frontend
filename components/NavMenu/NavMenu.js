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
import MenuItem from "./MenuItem/MenuItem";

const NavMenu = (props) => {
  const { SubMenu } = Menu;

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[props.curPath]}
      defaultOpenKeys={["diag"]}
      style={{ height: "100%", borderRight: 0 }}
    >
      <MenuItem path="home">
        <HomeOutlined />
        Home
      </MenuItem>
      <SubMenu key="diag" icon={<MedicineBoxOutlined />} title="Diagnosis">
        <MenuItem path="upload-image">
          <FileImageOutlined />
          Upload image
        </MenuItem>

        <MenuItem path="new-diagnosis">
          <FolderAddOutlined />
          New diagnosis
        </MenuItem>

        <MenuItem path="history">
          <HistoryOutlined />
          View history
        </MenuItem>
      </SubMenu>
      <MenuItem path="about-us">
        <UserOutlined />
        About us
      </MenuItem>
    </Menu>
  );
};

export default NavMenu;
