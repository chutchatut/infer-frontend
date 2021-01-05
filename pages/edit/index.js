import { useRouter } from "next/router";
import React, { Fragment } from "react";
import Button from "../../components/Button/Button";
import DropDown from "../../components/DropDown/DropDown";
import styles from "./edit.module.css";

const Edit = () => {
  const router = useRouter();
  const onChange = (event) => {
    const options = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    console.log(options);
  };

  return (
    <Fragment>
      <div className={styles.Home}>
        <Button width="13vw" height="6vh" onClick={() => router.push("app")}>
          Home
        </Button>
      </div>
      <div className={styles.Layout}>
        <div className={styles.Preview}>
          <p>
            <strong>C:\folder\images\example.dicom</strong>
          </p>
          <img src="https://www.hdwallpaper.nu/wp-content/uploads/2015/02/Funny-Cat-Hidden.jpg" />
        </div>
        <div className={styles.Confidence}>
          <div className={styles.Head}>Confidence</div>
          <p>
            COVID-19: 0.9323
            <br />
            Pneumonia: 0.0482
            <br />
            Normal: 0.0195
          </p>
        </div>
        <div className={styles.Prediction}>
          <div className={styles.Head}>Prediction</div>
          <DropDown
            width="100%"
            height="100%"
            onChange={onChange}
            options={["Pnuemonia", "COVID-19"]}
            multiple
          />
        </div>
        <div className={styles.Save}>
          <Button>Save</Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Edit;
