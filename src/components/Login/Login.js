import React from "react";
import LoginForm from "./LoginForm";
import styles from "./Login.module.css";
import illustration from "../img/Illustration.svg";
import { NavLink } from "react-router-dom";
function Login() {
  return (
    <div className={styles.container}>
      <div className={styles["login-bg-photo"]}>
        <img src={illustration} alt="Illustration" />
        <h1 className={styles["login-img-title"]}>Lorby</h1>
        <h2 className={styles["login-img-subtitle"]}>Твой личный репетитор</h2>
      </div>
      <div className={styles["login-textbox"]}>
        <h3 className={styles["login-textbox-title"]}>Вэлком бэк!</h3>
        <LoginForm />
        <NavLink className={styles["login-btn-create"]} to={"/signin"}>
          У меня еще нет аккаунта
        </NavLink>
      </div>
    </div>
  );
}

export default Login;
