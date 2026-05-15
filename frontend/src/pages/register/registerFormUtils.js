export const validateRegisterForm = (values) => {
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
}

export const registerSubmitHandler = async (values, registerUser, navigate) => {
    try {
        const data = await registerUser(values).unwrap();
        console.log(data)
        navigate("/home");
    } catch (err) {
        console.log(err);
    }
};