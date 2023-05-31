import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import "./SaveFoodRefModal.css"

class SaveFoodRefModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodName: props.foodName,
            quantity: props.quantity,
            calories: props.calories,
            quantityType: props.quantityType
        }
        this.handleFoodNameChange = this.handleFoodNameChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleCaloriesChange = this.handleCaloriesChange.bind(this);
        this.handleQuantityTypeChange = this.handleQuantityTypeChange.bind(this);
        this.onSaveFood = this.onSaveFood.bind(this);
        this.getNameField = this.getNameField.bind(this);
        this.getTypeQteField = this.getTypeQteField.bind(this);
        this.getQuantityRefField = this.getQuantityRefField.bind(this);
        this.getCaloryRefField = this.getCaloryRefField.bind(this);
    }


    handleFoodNameChange(e) {
        this.setState({foodName: e.target.value});
    }

    handleQuantityChange(e) {
        let originQuantity = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value);
        this.setState({quantity: originQuantity});
    }

    handleCaloriesChange(e) {
        let originCalories = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value);
        this.setState({calories: originCalories});
    }

    handleQuantityTypeChange(e) {
        this.setState({quantityType: e.target.value});
    }

    async onSaveFood() {
        const data = {
            name: this.state.foodName,
            original_calory: this.state.calories,
            original_quantity: this.state.quantity,
            quantity_type: this.state.quantityType
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/foodrefs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                this.props.onFailSave();
                throw new Error('Failed to create FoodRef');
            }

            const newFoodRef = await response.json();
            this.props.onSuccessSave();
            console.log('New FoodRef:', newFoodRef);
        } catch (error) {
            console.error('Error creating FoodRef:', error);
        }
    };

    getNameField() {
        if (this.state.foodName === "") {
            return (
                <Form.Control
                    type="text"
                    placeholder="riz blanc cuit"
                    onChange={this.handleFoodNameChange}
                    autoFocus
                    required
                />
            );
        } else {
            return (
                <Form.Control
                    type="text"
                    value={this.state.foodName}
                    onChange={this.handleFoodNameChange}
                    autoFocus
                    required
                    disabled
                />
            );
        }
    }

    getTypeQteField() {
        if (this.state.quantityType === "") {
            return (
                <Form.Control
                    type="text"
                    placeholder="tbsp."
                    onChange={this.handleQuantityTypeChange}
                    autoFocus
                    required
                />
            );
        } else {
            return (
                <Form.Control
                    type="text"
                    value={this.state.quantityType}
                    onChange={this.handleQuantityTypeChange}
                    autoFocus
                    required
                    disabled
                />

            );
        }
    }

    getQuantityRefField() {
        if (this.state.quantity === null) {
            return (
                <Form.Control
                    type="text"
                    placeholder="4"
                    onChange={this.handleQuantityChange}
                    required
                />
            );
        } else {
            return (

                <Form.Control
                    type="text"
                    value={this.state.quantity}
                    onChange={this.handleQuantityChange}
                    required
                    disabled
                />


            );
        }
    }

    getCaloryRefField() {
        if (this.state.calories === null) {
            return (
                <Form.Control
                    type="text"
                    placeholder="4"
                    onChange={this.handleCaloriesChange}
                    required
                    disabled
                />
            );
        } else {
            return (

                <Form.Control
                    type="text"
                    value={this.state.calories}
                    onChange={this.handleCaloriesChange}
                    required
                    disabled
                />


            );
        }
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className={"saveFoodRefModalContent saveFoodModalHeader"} closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sauvegarder cet aliment comme référence
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body className={"saveFoodRefModalContent saveFoodModalBody"}>
                    <hr/>
                    <Form>
                        <Form.Group className="mb-3 infoFoodTitle" controlId="foodName">
                            <Form.Label>Nom de l'aliment</Form.Label>
                            {this.getNameField()}
                        </Form.Group>
                        <Form.Group className="mb-3 infoFoodTitle" controlId="quantityType">
                            <Form.Label>Type (Qté)</Form.Label>
                            {this.getTypeQteField()}
                        </Form.Group>
                        <div className={"infoFoodContainer"}>
                            <Form.Group className="mb-3 infoFoodTitle" controlId="quantityRef">
                                <Form.Label>Quantité Référence</Form.Label>
                                {this.getQuantityRefField()}
                            </Form.Group>
                            <Form.Group className="mb-3 infoFoodTitle" controlId="caloryRef">
                                <Form.Label>Calories Références</Form.Label>
                                {this.getCaloryRefField()}
                            </Form.Group>

                        </div>
                    </Form>
                    <hr/>
                </Modal.Body>
                <Modal.Footer className={"saveFoodRefModalContent saveFoodModalFooter"}>
                    <Button className={"saveButton"} onClick={this.onSaveFood}>Enregistrer</Button>
                </Modal.Footer>
            </Modal>

        );
    }
}

export default SaveFoodRefModal;
