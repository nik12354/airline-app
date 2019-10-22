import React, { Component } from 'react';
import User from '../api/User';

class Message extends Component {
    state = {};

    constructor(props) {
        super(props);

        this.state.author = props.info.username;
        this.state.username = '';
        this.state.text = props.info.description;
        this.state.editing = false;
    }

    textClickHandler = () => {
        console.log('text click');
        if (this.checkChange()) {
            this.setState({
            editing: true
            });
        }
    }

    checkChange() {
        User.getUsername()
            .then(login => {
                const username = login;
                this.setState({username});
            })
            .catch(err => {
                console.log(err);
            });
        if (this.state.author === this.state.username) {
            return true;
        }
    }

    saveClickHandler = () => {
        console.log('save');
        this.setState({
            editing: false
        });
        this.props.editMessageHandler(this.props.info._id, this.state.text);
    }

    inputChangeHandler = (event) => {
        this.setState({ text: event.target.value });
    }
    
    render() {
        let cardContent;

        if (this.state.editing) {
            cardContent = (
                <p className="card-text">
                <input onChange={this.inputChangeHandler} value={this.state.text} className="form-control mr-sm-2" type="text" />
                </p>
            );
        } else {
            cardContent = (
                <p className="card-text" onClick={this.textClickHandler}>
                {this.state.text}
                </p>
            );
        }

        let saveButton;

        if (this.state.editing) {
            saveButton = (<a href="#" onClick={this.saveClickHandler} className="btn btn-outline-success message-save-button">Сохранить</a>);
        }

        let delButton;
        
        if (this.checkChange()) {
            delButton = (<button type="button" onClick={(e) => {this.props.deleteMessageHandler(this.props.info._id)}} data-toggle="tooltip" data-placement="top" title="Удалить" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>);
        }

        return (
            <div className="row row-12 row-md-6 row-lg-4">
                <div className="col d-flex justify-content-center" >
                    <div className="card" style={{width: '35rem'}}>
                        <div className="card-body">
                            {delButton}
                            <p className="text-muted">От: {this.state.author}</p>
                            {cardContent}
                            {saveButton}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Message;