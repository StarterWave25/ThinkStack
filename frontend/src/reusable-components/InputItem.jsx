import InputField from "./InputField";
import './styles/InputItem.css';

function InputItem({ label, type, placeholder, fieldProps, touched, errors }) {
    return <div className="input-item">
        <label>{`${label}:`}</label>
        <InputField
            type={type}
            placeholder={placeholder}
            fieldProps={fieldProps}>
        </InputField>
        {
            touched &&
            errors &&
            <span className="input-error-span">{errors}</span>
        }
    </div>;
}

export default InputItem;