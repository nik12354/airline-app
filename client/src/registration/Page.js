import React, { Component } from 'react';
import User from '../api/User';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class RegPage extends Component {
    state = {};

    constructor(props) {
        super(props);

        this.state.regLogin = '';
        this.state.regPassword = '';
    }

    regButtonClickHandler = () => {
        User.register(this.state.regLogin, this.state.regPassword)
            .then(res => {
                this.setState({
                    regSuccessMessage: 'Registration successful.',
                    regErrorMessage: '',
                    regLogin: '',
                    regPassword: ''
                });
            })
            .catch(err => {
                this.setState({
                    regSuccessMessage: '',
                    regErrorMessage: 'Registration failed. Perhaps username is taken already.',
                    regLogin: '',
                    regPassword: ''
                });
            });
    }

    regLoginChangeHandler = (event) => {
        this.setState({ regLogin: event.target.value });
    }

    regPasswordChangeHandler = (event) => {
        this.setState({ regPassword: event.target.value });
    }

    render() {
        let regSuccess;
        let regError;

        if (this.state.regSuccessMessage) {
            regSuccess = (<div className="alert alert-success" role="alert">{this.state.regSuccessMessage}</div>)
        }
        if (this.state.regErrorMessage) {
            regError = (<div className="alert alert-danger" role="alert">{this.state.regErrorMessage}</div>)
        }

        return (
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col col-6 ">
                        <div className="jumbotron">
                            <div className="container">
                                <div className="row">
                                    <div className="col col-12">
                                        <h2>Регистрация</h2><br />
                                        {regSuccess}
                                        {regError}
                                        <input onChange={this.regLoginChangeHandler} value={this.state.regLogin} className="form-control mr-sm-2" type="text" placeholder="Username" /><br />
                                        <input onChange={this.regPasswordChangeHandler} value={this.state.regPassword} className="form-control mr-sm-2" type="password" placeholder="Password" /><br />
                                        <button onClick={this.regButtonClickHandler} className="btn btn-outline-success">Зарегистрировать</button>
                                        <Link to="/auth/" className="ml-4">Войти</Link>
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
 
                    
            
export default RegPage;