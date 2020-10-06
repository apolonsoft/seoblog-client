import { useState } from 'react'
import {signin, authenticate, isAuth} from './../../actions/auth';
import Router from 'next/router';
const SigninComponent = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { email, password, error, loading, message, showForm } = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: false, loading: true });
        const user = { email, password };
        signin(user).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error,
                    loading: false
                });
            } else {
                authenticate(data, () => {
                 if(isAuth() && isAuth().role === 1){
                     Router.push(`/admin`);
                 } else {
                     Router.push(`/user`);
                 }
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

    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>
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
        {showForm && signinForm()}
    </React.Fragment>);
}

export default SigninComponent;