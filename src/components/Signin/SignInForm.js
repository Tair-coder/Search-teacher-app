import { useFormik } from "formik";
import React, { useState } from "react";
import styles from "./SignInForm.module.css";
import eye from "../img/g.svg";
import hideEye from "../img/hideEye.svg";
import { signInSchemas } from "../../schemas/main";

const onSubmit = (values, action) => {
  console.log(values);
  action.resetForm();
};
function SignInForm() {
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
  const {
    isSubmitting,
    errors,
    handleBlur,
    handleChange,
    values,
    handleSubmit,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      login: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signInSchemas,
    onSubmit,
  });
  console.log(errors.password);
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
          values.email.length == 0 ||
          values.login.length == 0 ||
          values.password.length == 0 ||
          values.confirmPassword.length == 0 ||
          Object.keys(errors).length !== 0
        }
      >
        Далее
      </button>
    </form>
  );
}

export default SignInForm;
