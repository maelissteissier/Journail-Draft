import React, {Component} from 'react';
import {Form, Modal, Table} from "react-bootstrap";
import "./ChooseFoodRefModal.css";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import ListFoodRefComponent from "../ListFoodRefComponent";


const modalState = {
    LOADING: 0,
    LOADED: 1
};

class ChooseFoodRef extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodRefList: this.props.foodRefList,
            modalState: modalState.LOADED,
            search: ""
        }

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.getFoodRefListComponent = this.getFoodRefListComponent.bind(this);
    }


    handleSearchChange(e) {
        this.setState({search: e.target.value});
    }

    getFoodRefListComponent(foodRefs) {
        return (
            <ListFoodRefComponent foodRefList={foodRefs}
                                  onFoodRefChosen={(foodRefChosen) => {
                                      this.props.onHide();
                                      this.props.setFoodChosen(foodRefChosen);
                                  }}
            />);

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
                    <Modal.Header className={"chooseFoodRefModalHeader"} closeButton>
                        <Modal.Title>Choisir un aliment reférence</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={"chooseFoodRefModalBody"}>
                        <Form>
                            <Form.Group className="mb-3" controlId="searchFoodRef">
                                <Form.Control className={"searchFoodRefEntry"}
                                              type="text"
                                              placeholder={"Tapez votre recherche"}
                                              onChange={this.handleSearchChange}
                                />
                            </Form.Group>
                        </Form>
                        {this.state.search === "" ?
                            this.getFoodRefListComponent(this.props.foodRefList)
                            : this.getFoodRefListComponent(
                                this.props.foodRefList.filter(food => food.name.includes(this.state.search)))}
                    </Modal.Body>
                    <Modal.Footer className={"thoughtsModalFooter"}>
                        <Button className={"cancelThoughtModal thoughtsModalButtons"} variant="danger"
                                onClick={this.props.onHide}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </Button>
                        <Button className={"validateThoughtModal thoughtsModalButtons"} variant="primary">
                            <FontAwesomeIcon icon={faCheck}/>
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

}


export default ChooseFoodRef;