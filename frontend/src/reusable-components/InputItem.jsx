import InputField from "./InputField";
import './styles/InputItem.css';

function InputItem({ type, placeholder, fieldProps, touched, errors }) {
    return <div className="input-item">
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