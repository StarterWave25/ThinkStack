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

function Login() {
    const [loginUser, { isLoading }] = useLoginMutation();
    const [forgotPassword] = useForgotPasswordMutation();

    const navigate = useNavigate();

    const {
        data,
        isLoading: isAuthLoading,
        isFetching: isAuthFetching,
    } = useGetMeQuery();

    const isLoggedIn = !!data;

    console.log(isLoggedIn);

    // console.log(isLoggedIn, data);
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

            <InputItem
                type={"email"}
                placeholder={"Email"}
                fieldProps={formik.getFieldProps("email")}
                touched={formik.touched.email}
                errors={formik.errors.email}
            ></InputItem>

            <InputItem
                type={"password"}
                placeholder={"Password"}
                fieldProps={formik.getFieldProps("password")}
                touched={formik.touched.password}
                errors={formik.errors.password}
            ></InputItem>

            <span
                onClick={() => handleForgotPassword(formik, forgotPassword)}
                style={{ cursor: "pointer" }}
            >
                Password Forgotten??
            </span>

            <Button
                isLoading={isLoading}
                text={"Logging in..."}
                loadingText={"Log in"}
            ></Button>
        </form>
    );
}

export default Login;
