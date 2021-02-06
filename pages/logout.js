import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(actions.authLogout());
    router.replace("login");
  }, []);
  
  return null;
};

export default Logout;
