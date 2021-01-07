import { HomeOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import styles from "./Home.module.css";

const Home = () => {
  const router = useRouter();
  
  return (
    <div className={styles.Home}>
      <HomeOutlined
        style={{ fontSize: "5vh" }}
        onClick={() => router.push("app")}
      />
    </div>
  );
};

export default Home;
