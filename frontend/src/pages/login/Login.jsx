import { useFormik } from "formik";
import {
    useLoginMutation,
    useForgotPasswordMutation,
    useGetMeQuery,
} from "../../services/authAPI";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
    validateLoginForm,
    loginSubmitHandler,
    handleForgotPassword,
} from "./loginFormUtils";
import InputItem from "../../reusable-components/InputItem";
import Button from "../../reusable-components/Button";
import AuthError from "../../reusable-components/AuthError";

function Login() {
    const [loginUser, { isLoading, error }] = useLoginMutation();

    const [forgotPassword] = useForgotPasswordMutation();

    const navigate = useNavigate();

    const {
        data,
        isLoading: isAuthLoading,
        isFetching: isAuthFetching,
    } = useGetMeQuery();

    const isLoggedIn = !!data;

    useEffect(() => {
        if (!isAuthLoading && !isAuthFetching && isLoggedIn) {
            navigate("/home");
        }
    }, [isLoggedIn, isAuthLoading, isAuthFetching, navigate]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        validate: validateLoginForm,

        onSubmit: (values) => loginSubmitHandler(values, loginUser, navigate),
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <h2>Login</h2>

            <AuthError error={error} />

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
                placeholder={'Enter your Password'}
                fieldProps={formik.getFieldProps("password")}
                touched={formik.touched.password}
                errors={formik.errors.password}
            ></InputItem>

            <span
                onClick={() => handleForgotPassword(formik, forgotPassword)}
                style={{ cursor: 'pointer' }}>
                Password Forgotten??
            </span>

            <Button
                isLoading={isLoading}
                text={'Log in'}
                loadingText={'Logging in...'}>
            </Button>
        </form>
    );
}

export default Login;
