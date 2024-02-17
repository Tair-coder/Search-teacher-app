import React, { useState } from "react";
import SignInForm from "./SignInForm";
import styles from "./SignIn.module.css";
import illustration from "../img/Illustration.svg";
import { NavLink } from "react-router-dom";
import ConfirmEmail from "./ConfirmEmail";
function SignIn() {
  const [confirmEmailPage, setConfirmEmailPage] = useState(false);
  const [signValues, setSignValues] = useState();
  return (
    <div className={styles.container}>
      <NavLink to={"/"} className={styles.backBtn}>
        Назад
      </NavLink>
      <div className={styles["signin-bg-photo"]}>
        <img src={illustration} alt="Illustration" />
        <h1 className={styles["signin-img-title"]}>Lorby</h1>
        <h2 className={styles["signin-img-subtitle"]}>Твой личный репетитор</h2>
      </div>
      <div
        className={`${styles["signin-textbox"]} ${
          confirmEmailPage ? styles["confirmemail-textbox"] : ""
        }`}
      >
        <h3
          className={styles["signin-textbox-title"]}
          style={
            confirmEmailPage ? { fontSize: "24px", marginBottom: "20px" } : {}
          }
        >
          {confirmEmailPage
            ? "Введи 4-значный код, высланный на example@ gmail.com"
            : `Создать аккаунт Lorby`}
        </h3>
        {confirmEmailPage ? (
          <ConfirmEmail signInValues={signValues} />
        ) : (
          <SignInForm
            setEmailPage={setConfirmEmailPage}
            setSignInValues={setSignValues}
          />
        )}
      </div>
    </div>
  );
}

export default SignIn;
