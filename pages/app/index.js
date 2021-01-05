import { useRouter } from "next/router";
import React, { Fragment } from "react";
import Button from "../../components/Button/Button";
import style from "./app.module.css";

const App = () => {
  const router = useRouter();

  return (
    <Fragment>
      <div className={style.Logout}>
        <Button onClick={() => router.push("logout")}>Logout</Button>
      </div>
      <div className={style.Nav}>
        <Button onClick={() => router.push("infer")}>Inference</Button>
        <Button onClick={() => router.push("create-pipeline")}>
          Create pipeline
        </Button>
        <Button onClick={() => router.push("select")}>Edit/Save result</Button>
      </div>
    </Fragment>
  );
};

// <Button>Login</Button>
export default App;
