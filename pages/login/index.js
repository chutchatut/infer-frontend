import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import style from "./login.module.css";
import * as action from "../../store/actions";
import Loading from "../../components/Loading/Loading";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const submit = (event) => {
    event.preventDefault();
    dispatch(action.authInit(username, password));
  };

  return (
    <form onSubmit={submit} className={style.Login}>
      <div className={style.Username}>
        <InputField
          text="Username"
          placeholder="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          type="text"
        />
      </div>
      <div className={style.Password}>
        <InputField
          text="Password"
          placeholder="********"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
        />
      </div>
      <div className={style.LoginButton}>
        {token || loading ? (
          <Loading redirect_to="app" loading={!token} />
        ) : (
          <Button>Login</Button>
        )}
      </div>
    </form>
  );
};

export default Login;
