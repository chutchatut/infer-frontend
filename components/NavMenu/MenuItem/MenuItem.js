import React from "react";
import { Menu } from "antd";
import { useRouter } from "next/router";

const MenuItem = (props) => {
  const router = useRouter();

  return (
    <Menu.Item
      {...props}
      key={props.path}
      onClick={() => {
        router.push(props.path);
      }}
    >
      {props.children}
    </Menu.Item>
  );
};

export default MenuItem;
