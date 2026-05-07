import { useFormik } from "formik";
import { useResetPasswordMutation } from "../services/authAPI";
import { useSearchParams } from "react-router-dom";

function ForgotPassword() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

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
        await resetPassword({
          token,
          password: values.password,
        }).unwrap()
          .then( (data) => {
            console.log(data)
          })
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