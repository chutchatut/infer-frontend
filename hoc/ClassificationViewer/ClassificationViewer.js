import { Fragment } from "react";
import styles from "./ClassificationViewer.module.css";

const ClassificationViewer = (props) => {
  return (
    <Fragment>
      <div className={styles.Layout}>
        <div className={styles.Preview}>
          <img src={props.src[0]} />
          <p>
            <h2>{props.path}</h2>
          </p>
        </div>
        <div className={styles.Pred}>{props.children}</div>
      </div>
    </Fragment>
  );
};

export default ClassificationViewer;
