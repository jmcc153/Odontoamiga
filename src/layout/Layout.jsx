import { Outlet } from "react-router-dom";
import logo from "../assets/images/Logo_Comercial_CrediXpress_Negro_edit.png";
import styles from "./Layout.module.css";
import { Footer } from "../components/footer/footer";
export const Layout = () => {
  return (
    <>
      <div className={styles.backgroundImage}>
        <div className={styles.containerImg}>
          <img src={logo} className={styles.logoImg} />
        </div>
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
