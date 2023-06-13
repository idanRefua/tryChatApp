import * as yup from "yup";
const passValid = new RegExp(
  "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{6,}$"
);

export const registerValidation = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(5, "Password must be with a least 5 charcters")
    .matches(
      passValid,
      "Password must include at least : One Uppercase letter [A-Z], One number [0-9] and one symbol [!,@,#,%,$,&,^]"
    )
    .required("Password is required"),
  name: yup
    .string()
    .min(2, "Name must be with at least 2 charcters")
    .required(),
});
