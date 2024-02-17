import * as yup from "yup";
export const signInSchemas = yup.object().shape({
  email: yup.string().email().required(),
  login: yup.string().required(),
  password: yup
    .string()
    .min(8, "От 8 до 15 символов")
    .max(15, "От 8 до 15 символов")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])/, "Строчные буквы и прописные буквы")
    .matches(/[@#$%^&*()_+<>?]/, 'Минимум 1 спецсимвол (!, ", #, $...).')
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароли не совпадают")
    .required("Пароли не совпадают"),
});
