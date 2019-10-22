import React, { Component } from 'react';
import User from '../api/User';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class AuthPage extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.state.authLogin = '';
        this.state.authPassword = '';
    }

    authButtonClickHandler = () => {
        User.login(this.state.authLogin, this.state.authPassword)
            .then(res => {
                this.setState({
                    loginSuccessMessage: 'Authorization successful.',
                    loginErrorMessage: '',
                    authLogin: '',
                    authPassword: ''
                });
                this.props.authChangeHandler();
                setTimeout(function(){
                    document.location.href = '/';
                }, 0.5 * 1000);
            })
            .catch(err => {
                this.setState({
                    loginSuccessMessage: '',
                    loginErrorMessage: 'Authorization error. Make sure you entered correct credentials.',
                    authLogin: '',
                    authPassword: ''
                });
            });
    }

    authLoginChangeHandler = (event) => {
        this.setState({ authLogin: event.target.value });
    }

    authPasswordChangeHandler = (event) => {
        this.setState({ authPassword: event.target.value });
    }

    render() {
        let loginSuccess;
        let loginError;

        if (this.state.loginSuccessMessage) {
            loginSuccess = (<div className="alert alert-success" role="alert">{this.state.loginSuccessMessage}</div>)
        }
        if (this.state.loginErrorMessage) {
            loginError = (<div className="alert alert-danger" role="alert">{this.state.loginErrorMessage}</div>)
        }

        return (
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col col-6">
                        <div className="jumbotron">
                            <div className="container ">
                                <div className="row">
                                    <div className="col col-12">
                                        <h2>Авторизация</h2><br />
                                        {loginSuccess}
                                        {loginError}
                                        <input onChange={this.authLoginChangeHandler} value={this.state.authLogin} className="form-control mr-sm-2" type="text" placeholder="Username" /><br />
                                        <input onChange={this.authPasswordChangeHandler} value={this.state.authPassword} className="form-control mr-sm-2" type="password" placeholder="Password" /><br />
                                        <button onClick={this.authButtonClickHandler} className="btn btn-outline-success">Войти</button>
                                        <Link to="/registration/" className="ml-4">Зарегистрироваться</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>                   
        );
    }
}
            
export default AuthPage;