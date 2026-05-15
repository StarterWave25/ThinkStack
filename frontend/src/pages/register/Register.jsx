import { useFormik } from "formik";
import { useGetMeQuery, useRegisterMutation } from "../../services/authAPI";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { registerSubmitHandler, validateRegisterForm } from "./registerFormUtils";
import InputItem from "../../reusable-components/InputItem";

function Register() {

    const [registerUser] = useRegisterMutation();
    const navigate = useNavigate();
    const {
        data,
        isLoading,
        isFetching,
    } = useGetMeQuery();

    const isLoggedIn = !!data;

    // console.log(isLoggedIn, data);
    useEffect(() => {
        if (!isLoading && !isFetching && isLoggedIn) {
            navigate('/home');
        }
    }, [isLoggedIn, isLoading, isFetching, navigate]);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },

        validate: validateRegisterForm,

        onSubmit: (values) => registerSubmitHandler(values, registerUser, navigate),
    });

    return (
        <div className="container">
            <form onSubmit={formik.handleSubmit} className="form">
                <h2>Register</h2>

                <InputItem
                    label={'Name'}
                    type={'text'}
                    placeholder={'Enter your Name'}
                    fieldProps={formik.getFieldProps("name")}
                    touched={formik.touched.name}
                    errors={formik.errors.name}
                ></InputItem>

                <InputItem
                    label={'Email'}
                    type={'email'}
                    placeholder={'Enter your Email'}
                    fieldProps={formik.getFieldProps("email")}
                    touched={formik.touched.email}
                    errors={formik.errors.email}
                ></InputItem>

                <InputItem
                    label={'Password'}
                    type={'password'}
                    placeholder={'Enter a Password'}
                    fieldProps={formik.getFieldProps("password")}
                    touched={formik.touched.password}
                    errors={formik.errors.password}
                ></InputItem>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Register;