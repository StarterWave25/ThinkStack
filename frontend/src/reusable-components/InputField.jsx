function InputField({ type, placeholder, fieldProps }) {
    return <input
        className="input-field"
        type={type}
        placeholder={placeholder}
        {...fieldProps}
    />;
}

export default InputField;