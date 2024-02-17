import { useFormik } from "formik";
import React, { useState } from "react";
import styles from "./SignInForm.module.css";
import eye from "../img/g.svg";
import hideEye from "../img/hideEye.svg";
import { signInSchemas } from "../../schemas/main";
import axios from "axios";
const url = "https://berlin-backender.org.kg/lorby/authentication/register/";

// последнее изменение объект values его ключи по другому называются что приводит к ошибке
const postData = async (values, setEmailPage, setSignInValues) => {
  await axios
    .post(
      url,
      {
        email: values.email,
        username: values.login,
        password: values.password,
        password_confirm: values.confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json", // Добавленный заголовок Accept
        },
      }
    )
    .then((data) => {
      setEmailPage(true);
      setSignInValues({ username: values.login, password: values.password });
    })
    .catch((err) => console.log(err));
};

function SignInForm(props) {
  const onSubmit = (values, action) => {
    postData(values, props.setEmailPage, props.setSignInValues);
    action.resetForm();
  };
  // password eyes
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };
  const showConfirmPasswordHandler = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  // password eyes END
  // formik hook
  const { errors, handleBlur, handleChange, values, handleSubmit, touched } =
    useFormik({
      initialValues: {
        email: "",
        login: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: signInSchemas,
      onSubmit,
    });

  return (
    <form className={styles.signInForm} onSubmit={handleSubmit}>
      <input
        className={styles.signinInput}
        name="email"
        placeholder="Введи адрес почты"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <input
        className={styles.signinInput}
        name="login"
        placeholder="Придумай логин"
        value={values.login}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <span>
        <label className={styles.signinPasswordInput}>
          <input
            className={styles.signinInput}
            style={{ color: touched.password && errors.password ? "red" : "" }}
            name="password"
            placeholder="Создай пароль"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type={showPassword ? "text" : "password"}
          />
          <span onClick={showPasswordHandler} className={styles.passwordEye}>
            <img src={showPassword ? hideEye : eye} alt="eye" />
          </span>
        </label>
        <ul className={styles.signinValidation}>
          <li
            className={
              (touched.password && values.password.length < 8) ||
              values.password.length > 15
                ? styles.wrong
                : values.password.length < 8 || values.password.length > 15
                ? ""
                : styles.correct
            }
          >
            От 8 до 15 символов
          </li>
          <li
            className={
              touched.password &&
              !/^(?=.*[a-z])(?=.*[A-Z])/.test(values.password)
                ? styles.wrong
                : !/^(?=.*[a-z])(?=.*[A-Z])/.test(values.password)
                ? ""
                : styles.correct
            }
          >
            Строчные и прописные буквы
          </li>
          <li
            className={
              touched.password && !/[0-9]/.test(values.password)
                ? styles.wrong
                : !/[0-9]/.test(values.password)
                ? ""
                : styles.correct
            }
          >
            Минимум 1 цифра
          </li>
          <li
            className={
              touched.password && !/[@#$%^&*()_+<>?]/.test(values.password)
                ? styles.wrong
                : !/[@#$%^&*()_+<>?]/.test(values.password)
                ? ""
                : styles.correct
            }
          >
            Минимум 1 спецсимвол (!, ", #, $...)
          </li>
        </ul>
      </span>
      <label className={styles.signinPasswordInput} htmlFor="confirmPassword">
        <input
          className={styles.signinInput}
          style={{
            color:
              touched.confirmPassword && errors.confirmPassword ? "red" : "",
          }}
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Повтори пароль"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          type={showConfirmPassword ? "text" : "password"}
        />
        <span
          onClick={showConfirmPasswordHandler}
          className={styles.passwordEye}
        >
          <img src={showConfirmPassword ? hideEye : eye} alt="eye" />
        </span>
        {errors.confirmPassword && touched.confirmPassword && (
          <p className={styles.errorMsg}>{errors.confirmPassword}</p>
        )}
      </label>
      <button
        type="submit"
        className={styles.signinBtn}
        disabled={
          values.email.length === 0 ||
          values.login.length === 0 ||
          values.password.length === 0 ||
          values.confirmPassword.length === 0 ||
          Object.keys(errors).length !== 0
        }
      >
        Далее
      </button>
    </form>
  );
}

export default SignInForm;
