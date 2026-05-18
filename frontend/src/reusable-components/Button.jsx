function Button({ text, loadingText, isLoading, clickHandler }) {
    return <button type="submit" disabled={isLoading} onClick={clickHandler}>
        {isLoading ? loadingText : text}
    </button>;
}

export default Button;