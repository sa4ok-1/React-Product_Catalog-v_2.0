import { useContext, useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./styles/fonts.scss";
import styles from "./App.module.scss";
import { themeContext } from "./store/ThemeContext";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import Loader from "./components/Loader/Loader";



export const App = () => {
  const { theme } = useContext(themeContext);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    // Симуляція завантаження даних
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400); // 2 секунди для демонстрації

    return () => clearTimeout(timer);
  }, [location.pathname]); // Виконується при зміні маршруту

  return (
    <div
    
      className={`${styles.app} ${
        theme === "light" ? styles.light : styles.dark
      }`}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <main className={styles.pageMain}>
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};
