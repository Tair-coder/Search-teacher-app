import React, { useState } from "react";
import { useFormik } from "formik";
import styles from "./LoginForm.module.css";
import eye from "../img/g.svg";
import hideEye from "../img/hideEye.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const notify = () => {
    toast("Неверный логин или пароль", {
      position: "top-right",
      autoClose: 3000,
      closeButton: false,
      draggable: false,
      icon: false,
      hideProgressBar: true,
      pauseOnHover: false,
      progress: undefined,
      fontFamily: false,
      boxShadow: false,
      theme: false,
      style: {
        padding: "15px 16px",
        borderRadius: " 12px",
        boxShadow: " none",
        fontFamily: "mplus1-medium",
      },
      className: styles.errormsg,
    });
  };
  const formik = useFormik({
    initialValues: { login: "", password: "" },
    onSubmit: (values) => {},
  });
  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <ToastContainer
        toastClassName={styles.msg}
        fontFamily={"m1plus-medium"}
      />
      <span className={styles.inputbox}>
        <input
          className={styles["form-input"]}
          placeholder="Введи логин"
          value={formik.values.login}
          name="login"
          type="text"
          onChange={formik.handleChange}
        />
        <label className={styles["form-input-password"]}>
          <input
            className={styles["form-input"]}
            placeholder="Введи пароль"
            value={formik.values.password}
            name="password"
            type={showPassword ? "text" : "password"}
            onChange={formik.handleChange}
          />
          <span onClick={showPasswordHandler} className={styles.eye}>
            <img src={showPassword ? eye : hideEye} alt="eye" />
          </span>
        </label>
      </span>
      <button type="submit" className={styles["form-btn"]} onClick={notify}>
        Войти
      </button>
    </form>
  );
}

export default LoginForm;
