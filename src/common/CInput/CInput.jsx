import "./CInput.css"

export const CInput = ({ type, placeholder, name, value, changeEmit, disabled, onBlurFunction }) => {
    return (
        <input
            className="inputDesign"
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            disabled={disabled}
            onChange={(e) => changeEmit(e)}
            onBlur={onBlurFunction}
        />
    )
}
