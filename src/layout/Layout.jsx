import { Outlet } from "react-router-dom";
import logo from "../assets/images/Logo_Comercial_CrediXpress_Negro_edit.png";
import styles from "./Layout.module.css";
import { Footer } from "../components/footer/footer";
import { useContext } from "react";
import { LoadingContext } from "../contexts/loadingContext";
import { Loading } from "../components/loading/loading";
export const Layout = () => {
  const {isLoading} = useContext(LoadingContext)
  return (
    <>
      <div className={styles.backgroundImage}>

        <div className={styles.containerImg}>
          <img src={logo} className={styles.logoImg} />
        </div>
        {isLoading && <Loading />}
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
