import React, {Component} from 'react';
import {Form, Modal} from "react-bootstrap";
import "./ThoughtsModal.css";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";

class ThoughtsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thoughts: props.thoughts
        }

        this.handleThoughtsChange = this.handleThoughtsChange.bind(this);
    }

    handleThoughtsChange(e) {
        this.setState({thoughts: e.target.value});
    }


    render() {
        return (
            <>

                <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    backdrop="static"
                    keyboard={false}
                    centered
                    className={"thoughtsModal"}
                >
                    <Modal.Header className={"thoughtsModalHeader"} closeButton>
                        <Modal.Title>Pensées et émotions</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={"thoughtsModalBody"}>
                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="thoughtsTextArea"
                            >
                                <Form.Control as="textarea" rows={16} value={this.state.thoughts} onChange={this.handleThoughtsChange}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className={"thoughtsModalFooter"}>
                        <Button className={"cancelThoughtModal thoughtsModalButtons"} variant="danger"
                                onClick={this.props.onHide}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </Button>
                        <Button className={"validateThoughtModal thoughtsModalButtons"}
                                variant="primary"
                                onClick={() => {
                                    this.props.onSave(this.state.thoughts);
                                    this.props.onHide();
                                }}
                        >
                            <FontAwesomeIcon icon={faCheck}/>
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

}


export default ThoughtsModal;