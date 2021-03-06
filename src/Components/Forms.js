import React, {Component} from 'react'
import Input from "../UI/Input"
import is from 'is_js'
import {connect} from 'react-redux'
import {login, registration} from "../redux/authActions";


class Forms extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Enter correct email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Enter correct password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = () => {
        this.props.login(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )

    }

    registerHandler = () => {
        this.props.registration(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )

    }

    submitHandler = event => {
           event.preventDefault()
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = is.email(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() {

        return (

            <div className="Auth">
                <div>
                    <h1>Authorization</h1>

                    <form onSubmit={this.submitHandler} className={"AuthForm"}>

                        { this.renderInputs() }
                        <button
                            type="success"
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                            className="settings-button"
                        >
                            Login
                        </button>

                        <button
                            type="primary"
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                            className="settings-button"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(props){
    return {
        data:props.auth.data
    }
}
function mapDispatchToProps(dispatch) {
    return {
        login: (email, password, isLogin) => dispatch(login(email, password, isLogin)),
        registration: (email, password, isLogin) => dispatch(registration(email, password, isLogin))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Forms)
