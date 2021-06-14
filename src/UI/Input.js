import React from 'react'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = props => {
    const inputType = props.type || 'text'
    const htmlFor = `${inputType}-${Math.random()}`


    return (
        <div className="InputWrapper">
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
                className="FieldSettings"
                placeholder={props.label}
            />

            {
                isInvalid(props)
                    ? <span>{props.errorMessage || 'Введите верное значение'}</span>
                    : null
            }
        </div>
    )
}

export default Input
