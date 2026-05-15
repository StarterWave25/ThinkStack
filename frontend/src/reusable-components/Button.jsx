function Button({ text, loadingText, isLoading, }) {
    return <button type="submit" disabled={isLoading}>
        {!isLoading ? loadingText : text}
    </button>;
}

export default Button;