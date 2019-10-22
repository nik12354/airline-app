import React, { Component } from 'react'; 
import { Modal, Button } from 'react-bootstrap';

class AddNewMessageModal extends Component {
    state = {};
    
    constructor(props) {
        super(props);
        this.state.text = '';
    }

    buttonClickHandler = () => {
        this.props.addMessageHandler(this.state.text);
        this.setState({text: ''});
        this.props.onChangeModalState();
    }

    inputChangeHandler = (event) => {
        this.setState({text: event.target.value});
    }

    render() {
        return (
            <Modal show={this.props.isOpenModal} onHide={this.props.onChangeModalState} >
            <Modal.Header closeButton>
            <Modal.Title>Новая запись</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <textarea onChange={this.inputChangeHandler} value={this.state.text} className="form-control" placeholder="Расскажите о путешествии" aria-label="With textarea"></textarea>
            </Modal.Body>
            <Modal.Footer>
            <button type="button" onClick={this.props.onChangeModalState} className="btn btn-outline-secondary" data-dismiss="modal">Отменить</button>
            <button type="button" onClick={this.buttonClickHandler} className="btn btn-outline-success" data-dismiss="modal">Добавить</button>
            </Modal.Footer>
            </Modal>
            );
    }
}

export default AddNewMessageModal;