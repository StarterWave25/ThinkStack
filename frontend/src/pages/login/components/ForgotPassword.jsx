import { useFormik } from "formik";
import { useResetPasswordMutation } from "../../../services/authAPI";
import { useParams } from "react-router-dom";
import InputItem from "../../../reusable-components/InputItem";
import Button from "../../../reusable-components/Button";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { token } = useParams();

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 6) {
        errors.password = "Min 6 characters";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        const data = await resetPassword({
          token,
          password: values.password,
        }).unwrap()
        console.log(data);
        alert("Password updated successfully");
      } catch (err) {
        alert("Failed to reset password", err);
        console.log(err)
      }
    },
  });

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit} className="form">
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="error">{formik.errors.password}</p>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;