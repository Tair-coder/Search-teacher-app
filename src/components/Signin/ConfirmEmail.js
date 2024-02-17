import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import styles from "./ConfirmEmail.module.css";
import { useHistory } from "react-router-dom";
const postSignInMethod = async (values, history) => {
  await axios
    .post(
      "https://berlin-backender.org.kg/lorby/authentication/login/",
      values,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then((data) => {
      localStorage.setItem("access_token", data.data.access);
      localStorage.setItem("refresh_token", data.data.refresh);
      history.push("/home");
    })
    .catch((err) => console.log(err));
};

const url =
  "https://berlin-backender.org.kg/lorby/authentication/email-confirm/";
const postMethod = async (values, setValue, signInValues, history) => {
  await axios
    .post(
      url,
      {
        code: `${values.firstCode}${values.secondCode}${values.thirdCode}${values.fourthCode}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    .then((data) => {
      postSignInMethod(signInValues, history);
    })
    .catch((err) => setValue(err));
};
function ConfirmEmail(props) {
  const history = useHistory();
  const [error, setError] = useState(false);
  const { values, handleChange, handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      firstCode: "",
      secondCode: "",
      thirdCode: "",
      fourthCode: "",
    },
    validationSchema: Yup.object({
      firstCode: Yup.string().matches(/^\d{1}$/),
      secondCode: Yup.string().matches(/^\d{1}$/),
      thirdCode: Yup.string().matches(/^\d{1}$/),
      fourthCode: Yup.string().matches(/^\d{1}$/),
    }),
    onSubmit: (values) =>
      postMethod(values, setError, props.signInValues, history),
  });
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={styles.confirmEmail__form}
        style={error ? { gap: "12px" } : {}}
      >
        <span
          className={`${styles.confirmEmail__inputs} ${error && styles.error}`}
        >
          <input
            className={styles.confirmEmail__input}
            type="number"
            value={values.firstCode}
            name="firstCode"
            onChange={(e) => {
              if (e.target.value.length === 2) return;
              handleChange(e);
            }}
          />
          <input
            className={styles.confirmEmail__input}
            type="number"
            value={values.secondCode}
            name="secondCode"
            onChange={(e) => {
              if (e.target.value.length === 2) return;
              handleChange(e);
            }}
          />
          <input
            className={styles.confirmEmail__input}
            type="number"
            value={values.thirdCode}
            onChange={(e) => {
              if (e.target.value.length === 2) return;
              handleChange(e);
            }}
            name="thirdCode"
          />
          <input
            className={styles.confirmEmail__input}
            type="number"
            value={values.fourthCode}
            name="fourthCode"
            onChange={(e) => {
              if (e.target.value.length === 2) return;
              handleChange(e);
            }}
          />
        </span>
        {error && <p className={styles.confirmEmail__error}>Неверный код</p>}
        <button
          type="submit"
          className={styles.confirmEmail__btn}
          disabled={
            values.firstCode.length === 0 ||
            values.secondCode.length === 0 ||
            values.thirdCode.length === 0 ||
            values.fourthCode.length === 0 ||
            isSubmitting
          }
        >
          Подтвердить
        </button>
      </form>
      <button className={styles.confirmEmail__btnAgain}>
        Выслать код повторно
      </button>
    </>
  );
}

export default ConfirmEmail;
