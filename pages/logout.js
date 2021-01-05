import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";

const Logout = () => {
  const dispatch = useDispatch();
  dispatch(actions.authLogout());
  const router = useRouter();
  router.replace("login");
  return null;
};

export default Logout;
