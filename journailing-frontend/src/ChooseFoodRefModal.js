import React, {Component} from 'react';
import {Modal, Table} from "react-bootstrap";
import "./ChooseFoodRefModal.css";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";



const modalState = {
    LOADING: 0,
    LOADED: 1
};

class ChooseFoodRef extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodRefList: [],
            modalState: modalState.LOADING
        }

        this.getSelectFoodRefForm = this.getSelectFoodRefForm.bind(this);
    }

    async componentDidMount() {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/foodrefs`);

            if (!response.ok) {
                throw new Error('Failed to fetch FoodRefs');
            }

            const foodRefs = await response.json();
            console.log('FoodRefs:', foodRefs);
            this.setState({foodRefList: foodRefs, modalState: modalState.LOADED})
        } catch (error) {
            console.error('Error fetching FoodRefs:', error);
        }
    }

    getSelectFoodRefForm() {
        var table = [];

        for (let i = 0; i < this.state.foodRefList.length; i++) {
            table.push(
                <tr onClick={() => {
                    this.props.setFoodChosen(this.state.foodRefList[i]);
                    this.props.onHide();
                }}>
                    <td className={"tableLeft"}>{this.state.foodRefList[i].name}</td>
                    <td>{this.state.foodRefList[i].original_quantity}</td>
                    <td>{this.state.foodRefList[i].quantity_type}</td>
                    <td className={"tableRight"}>{this.state.foodRefList[i].original_calory}</td>
                </tr>);
        }
        return table;
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
                        <Modal.Title>Choisir un aliment reférence</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={"thoughtsModalBody"}>
                    <Table striped="columns" className={"tableFood"}>
                        <thead>
                        <tr className={"tableHead"}>
                            <th className={"tableLeft"}>Aliment</th>
                            <th className={"tableMidle"}>Qté Réf</th>
                            <th className={"tableMidle"}>Qté Type</th>
                            <th className={"tableRight"}>Cal Réf</th>
                        </tr>
                        </thead>
                        {
                            this.getSelectFoodRefForm()
                        }
                    </Table>
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