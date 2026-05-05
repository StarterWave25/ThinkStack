import { useFormik } from "formik";
import { useLoginMutation } from "../services/authAPI";

function Login() {
  const [loginUser, { isLoading }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email";
      }

      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 6) {
        errors.password = "Min 6 characters";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        const data = await loginUser(values).unwrap();
        console.log("Login Success:", data);

      } catch (err) {
        console.log("Login Failed:", err);
      }
    },
  });

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit} className="form">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="error">{formik.errors.email}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="error">{formik.errors.password}</p>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;