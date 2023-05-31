import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {Component} from 'react';
import "./AddFoodJournalEntryModal.css"
import CalculatePage from "./CalculatePage";


class AddFoodJournalEntryModal extends Component {
    constructor(props) {
        super(props);
        this.state={
            foodEntry:props.foodEntry,
            foodName:props.foodEntry.name,
            quantity:props.foodEntry.quantity,
            calories:props.foodEntry.calories,
            thoughts:props.foodEntry.thoughts,
            quantityType:props.foodEntry.quantity_type,
            date:props.foodEntry.date


        }
        this.handleFoodNameChange = this.handleFoodNameChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleCaloriesChange = this.handleCaloriesChange.bind(this);
        this.onSaveFood = this.onSaveFood.bind(this);
    }


    handleFoodNameChange(e){
        this.setState({foodName: e.target.value});
    }

    handleQuantityChange(e){
        let originQuantity = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value);
        this.setState({quantity: originQuantity});
    }

    handleCaloriesChange(e){
        let originCalories = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value);
        this.setState({calories: originCalories});
    }

    async onSaveFood() {
        const data = {
            name: this.state.foodName,
            original_calory: this.state.calories,
            original_quantity: this.state.quantity
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

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sauvegarder cet aliment
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className={"calculator"}>
                        <CalculatePage foodChosen={{original_quantity: 0, original_calory: 0}}/>
                    </div>

                    {/*<hr/>*/}
                    {/*<Form>*/}
                    {/*    <Form.Group className="mb-3 infoFoodTitle" controlId="exampleForm.ControlInput1">*/}
                    {/*        <Form.Label>Nom de l'aliment</Form.Label>*/}
                    {/*        <Form.Control*/}
                    {/*            type="text"*/}
                    {/*            placeholder="riz blanc cuit"*/}
                    {/*            value={this.state.name}*/}
                    {/*            onChange={this.handleFoodNameChange}*/}
                    {/*            autoFocus*/}
                    {/*            required*/}
                    {/*        />*/}
                    {/*    </Form.Group>*/}
                    {/*    <div className={"infoFoodContainer"}>*/}
                    {/*        <Form.Group className="mb-3 infoFoodTitle" controlId="exampleForm.ControlInput1">*/}
                    {/*            <Form.Label>Quantité</Form.Label>*/}
                    {/*            <Form.Control*/}
                    {/*                type="text"*/}
                    {/*                value={this.state.quantity}*/}
                    {/*                onChange={this.handleQuantityChange}*/}
                    {/*                required*/}
                    {/*            />*/}
                    {/*        </Form.Group>*/}
                    {/*        <Form.Group className="mb-3 infoFoodTitle" controlId="exampleForm.ControlInput1">*/}
                    {/*            <Form.Label>Calories Références</Form.Label>*/}
                    {/*            <Form.Control*/}
                    {/*                type="text"*/}
                    {/*                value={this.state.calories}*/}
                    {/*                onChange={this.handleCaloriesChange}*/}
                    {/*                required*/}
                    {/*            />*/}
                    {/*        </Form.Group>*/}

                    {/*    </div>*/}
                    {/*</Form>*/}
                    {/*<hr/>*/}
                </Modal.Body>
                <Modal.Footer>
                    <Button className={"saveButton"} onClick={this.onSaveFood}>Enregistrer</Button>
                </Modal.Footer>
            </Modal>

        );
    }
}

export default AddFoodJournalEntryModal;
