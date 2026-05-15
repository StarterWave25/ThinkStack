export function validateLoginForm(values) {
    const errors = {};

    if (!values.email) {
        errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email";
    }

    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 6) {
        errors.password = "Min 6 characters";
    }

    return errors;
}

export async function loginSubmitHandler(values, loginUser, navigate) {
    try {
        const data = await loginUser(values).unwrap();
        console.log("Login Success:", data);
        navigate("/home");
    } catch (err) {
        console.log("Login Failed:", err);
    }
}

export function handleForgotPassword(formik, forgotPassword) {
    const email = formik.values.email;

    if (!email) {
        alert("Please, Enter your email first!");
        return;
    }

    if (formik.errors.email) {
        alert("Enter a valid email");
        return;
    }

    forgotPassword({ email })
        .unwrap()
        .then(() => {
            alert("Reset link sent to your email");
        })
        .catch(() => {
            alert("Something went wrong");
        });
}
