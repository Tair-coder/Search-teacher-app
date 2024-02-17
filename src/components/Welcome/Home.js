import React, { useEffect, useState } from "react";
import illustration from "../img/Illustration.svg";
import styles from "./Home.module.css";
import Modal from "../UI/Modal";
import axios from "axios";
function Home() {
  const [isModalActive, setIsModalActive] = useState(false);
  const activateModal = () => {
    setIsModalActive(true);
  };
  const deactiveteModal = () => {
    setIsModalActive(false);
  };
  // useEffect(() => {
  //   const refresh = async () => {
  //     await axios
  //       .post(
  //         "https://berlin-backender.org.kg/lorby/authentication/login/refresh/",
  //         { refresh: localStorage.getItem("refresh_token") },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Accept: "application/json",
  //           },
  //         }
  //       )
  //       .then((data) => localStorage.setItem("refresh_token", data.data.access))
  //       .catch((err) => console.log);
  //   };
  //   refresh();
  // }, []);
  return (
    <div className={styles.home__content}>
      {isModalActive && <Modal offModal={deactiveteModal} />}
      <span>
        <h1 className={styles.home__title}>Добро пожаловать!</h1>
        <h3 className={styles.home__subtitle}>Lorby - твой личный репетитор</h3>
      </span>
      <img src={illustration} alt="Teacher" />
      <button className={styles.home__exitbtn} onClick={activateModal}>
        Выйти
      </button>
    </div>
  );
}

export default Home;
