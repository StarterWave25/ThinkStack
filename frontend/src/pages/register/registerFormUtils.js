export const validateRegisterForm = (values) => {
    const errors = {};

    if (!values.firstName) {
        errors.firstName = "First name is required";
    } else if (values.firstName.length < 3) {
        errors.firstName = "Min 3 characters";
    }

    if (!values.lastName) {
        errors.lastName = "Last name is required";
    } else if (values.lastName.length < 3) {
        errors.lastName = "Min 3 characters";
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