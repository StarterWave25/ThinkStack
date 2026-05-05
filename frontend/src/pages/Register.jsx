import { useFormik } from "formik";
import { useRegisterMutation } from "../services/authAPI";

function Register() {

  const [registerUser] = useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "Name is required";
      } else if (values.name.length < 3) {
        errors.name = "Min 3 characters";
      }

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
        const data = await registerUser(values).unwrap();
        console.log(data)
        if(data.OK) {
          // Harhsa Redirect the user 
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit} className="form">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Name"
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="error">{formik.errors.name}</p>
        )}

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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;