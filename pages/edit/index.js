import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { Button, Checkbox, CheckboxGroup } from "antd";
import DropDown from "../../components/DropDown/DropDown";
import styles from "./edit.module.css";
import Home from "../../components/Home/Home";
import { SaveOutlined } from "@ant-design/icons";

const Edit = () => {
  const router = useRouter();
  const options = ["Pnuemonia", "COVID-19"];
  const onChange = (event) => {
    console.log(event);
  };

  return (
    <Fragment>
      <Home />
      <div className={styles.Layout}>
        <div className={styles.Preview}>
          <p>
            <h2>C:\folder\images\example.dicom</h2>
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
          <Checkbox.Group options={options} onChange={onChange} />
          <div className={styles.Save}>
            <Button type="primary">
              <SaveOutlined />
              Save
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Edit;
