import React from "react";
import SignInForm from "./SignInForm";
import styles from "./SignIn.module.css";
import illustration from "../img/Illustration.svg";
function SignIn() {
  return (
    <div className={styles.container}>
      <div className={styles["signin-bg-photo"]}>
        <img src={illustration} alt="Illustration" />
        <h1 className={styles["signin-img-title"]}>Lorby</h1>
        <h2 className={styles["signin-img-subtitle"]}>Твой личный репетитор</h2>
      </div>
      <div className={styles["signin-textbox"]}>
        <h3 className={styles["signin-textbox-title"]}>
          Создать аккаунт
          <br />
          Lorby
        </h3>
        <SignInForm />
      </div>
    </div>
  );
}

export default SignIn;
