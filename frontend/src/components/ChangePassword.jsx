import { useFormik } from "formik";
import { useChangePasswordMutation } from "../services/authAPI";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
    },

    validate: (values) => {
      const errors = {};

      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 6) {
        errors.password = "Minimum 6 characters required";
      }

      return errors;
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        const data = await changePassword({
          password: values.password,
        }).unwrap();

        console.log(data);

        alert("Password changed successfully.");

        resetForm();

        // User should login again, show that to user in popup - @Harsha
        navigate('/login')

      } catch (err) {
        console.log(err);

        alert(
          err?.data?.message || "Failed to change password"
        );
      }
    },
  });

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit} className="form">
        <h2>Change Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          {...formik.getFieldProps("password")}
        />

        {formik.touched.password &&
          formik.errors.password && (
            <p className="error">
              {formik.errors.password}
            </p>
          )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;