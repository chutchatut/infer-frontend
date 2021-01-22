import React from "react";
// import logoImg from "./images/logo.png";
import Image from "next/image";

const Logo = (props) => (
  /* <img src={logoImg} {...props} /> */
  <Image src="/logo.png" {...props} />
);
export default Logo;
