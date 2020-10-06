import { useState } from 'react'
import { signup } from './../../actions/auth';
const SignupComponent = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { name, email, password, error, loading, message, showForm } = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: false, loading: true });
        const user = { name, email, password };
        signup(user).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error,
                    loading: false
                });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    loading: false,
                    message: data.message,
                    showForm: false
                });
            }
        });

    }

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value })
    }

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '')
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '')
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '')

    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input value={name} type="text" onChange={handleChange('name')} className="form-control" placeholder="Type your name" />
                </div>
                <div className="form-group">
                    <input value={email} type="email" onChange={handleChange('email')} className="form-control" placeholder="Type your email" />
                </div>
                <div className="form-group">
                    <input value={password} type="password" onChange={handleChange('password')} className="form-control" placeholder="Type your password" />
                </div>
                <div>
                    <button className="btn btn-primary">Signup</button>
                </div>
            </form>
        )
    }
    return (<React.Fragment>


        {showLoading()}
        {showError()}
        {showMessage()}
        {showForm && signupForm()}
    </React.Fragment>);
}

export default SignupComponent;