import React from "react";
import styles from "./Modal.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
const delToken = async (history) => {
  await axios
    .post(
      "https://berlin-backender.org.kg/lorby/authentication/logout/",
      { refresh_token: localStorage.getItem("refresh_token") },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          withCredentials: true,
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
    .then((data) => {
      localStorage.removeItem("access_token");
      history.push("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};
function Modal(props) {
  const history = useHistory();
  return (
    <div className={styles.bg}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Выйти?</h2>
        <h3 className={styles.subtitle}>Точно выйти?</h3>
        <button className={styles.exit__btn} onClick={() => delToken(history)}>
          Да, точно
        </button>
        <button className={styles.stay__vtn} onClick={props.offModal}>
          Нет, остаться
        </button>
      </div>
    </div>
  );
}

export default Modal;
