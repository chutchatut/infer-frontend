import axios from "axios";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import Button from "../../components/Button/Button";
import styles from "./select.module.css";

const Select = () => {
  const [page, setPage] = useState(1);

  const img_list = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg/1280px-An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg/1280px-An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg/1280px-An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg/1280px-An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg/1280px-An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg/1280px-An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg",
    "https://3.bp.blogspot.com/-VBSEN1_Xoc0/T_xeujapGnI/AAAAAAAAAzw/55lYVUjQH14/s1600/cat+11.jpg",
    "https://3.bp.blogspot.com/-VBSEN1_Xoc0/T_xeujapGnI/AAAAAAAAAzw/55lYVUjQH14/s1600/cat+11.jpg",
    "https://3.bp.blogspot.com/-VBSEN1_Xoc0/T_xeujapGnI/AAAAAAAAAzw/55lYVUjQH14/s1600/cat+11.jpg",
    "https://3.bp.blogspot.com/-VBSEN1_Xoc0/T_xeujapGnI/AAAAAAAAAzw/55lYVUjQH14/s1600/cat+11.jpg",
  ];
  const NUMBER_OF_PAGES = Math.ceil(img_list.length / 6);

  const router = useRouter();
  const onClick = (i) => {
    const index = 6 * page - 6 + i;
    console.log(`The ${index}-th images was clicked`);
  };

  const goBack = () => {
    if (page > 1) setPage(page - 1);
  };

  const goForward = () => {
    if (page < NUMBER_OF_PAGES) setPage(page + 1);
  };
  
  return (
    <Fragment>
      <div className={styles.Home}>
        <Button width="13vw" height="6vh" onClick={() => router.push("app")}>
          Home
        </Button>
      </div>
      <div className={styles.TopLabel}>
        <strong>Images</strong>
      </div>
      <div className={styles.ImageGrid}>
        {img_list.slice(6 * page - 6, 6 * page).map((url, i) => (
          <img
            src={url}
            className={styles.Image}
            onClick={onClick.bind(this, i)}
          />
        ))}
      </div>
      <div className={styles.Navigation}>
        <div className={styles.arrowLeft} onClick={goBack} />
        {`Page ${page}/${NUMBER_OF_PAGES}`}
        <div className={styles.arrowRight} onClick={goForward} />
      </div>
    </Fragment>
  );
};

export default Select;
