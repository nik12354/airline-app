import React, { Component } from 'react';
import Message from './Message';


class MessageList extends Component {
    render() {
        return (
            <div className="container" id="message-list">
                {this.props.messages.map((message) => {
                    return (<Message key={message._id} info={message} deleteMessageHandler={this.props.deleteMessageHandler} editMessageHandler={this.props.editMessageHandler}/>)
                })}
            </div>
        );
    }
}

export default MessageList;