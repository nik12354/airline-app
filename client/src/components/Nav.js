import React, { Component } from 'react'; 
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from '../img/logo.svg';
import User from '../api/User';

class Nav extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.state.authText = props.isAuthorized ? '' : 'Гость';
    }

    updateUserText() {
        User.getUsername()
            .then(username => {
                const authText = 'Вы зашли как: ' + username;
                this.setState({authText});
            })
            .catch(err => {
                console.log(err);
            });
    }

    logoutHandler = () => {
        User.logout()
            .then(res => {
                const authText = 'Гость';
                this.setState({authText});
                this.props.authChangeHandler();
            })
            .catch(err => {
                console.log(err)
            });
    }

    componentDidMount() {
        if (this.props.isAuthorized) {
            this.updateUserText();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.isAuthorized && !prevProps.isAuthorized) {
            this.updateUserText();
        }
    }

  render() {
    let authButtons;
    let addButton;

    if (this.props.isAuthorized) {
        authButtons = (<Link onClick={this.logoutHandler} className="py-2 nav-link">Выйти</Link>)
        addButton = (<button onClick={this.props.onChangeModalState} className="btn btn-outline-warning add-but" id="add-button">Поделиться</button>)

    } else {
        authButtons = (<Link to="/auth/" className="py-2 nav-link">Войти</Link>)
    }

    return (
        <nav className="site-header sticky-top py-1">
          <div className="container">
            <div className="row d-flex flex-row">
              <div className="col">
                <a className="logo" href="#">
                    <img src={logo} height="50" width="50"/>
                </a>
              </div>
              <div className="col-6 nav justify-content-between">
                <Link className="py-2 nav-link" to="/">Главная</Link>
                <Link className="py-2 nav-link" to="/about/">Об авторе</Link>
                {authButtons}
                {addButton}
                </div>
              <div className="col text-muted py-2 text-right">
                {this.state.authText}
              </div>
              
            </div>
          </div>
        </nav>
    );
  }
}

export default Nav;