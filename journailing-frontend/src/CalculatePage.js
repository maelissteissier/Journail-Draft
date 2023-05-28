import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import "./CalculatePage.css"
import Button from "react-bootstrap/Button";

const calcType = {
    CALORIES: 0,
    QUANTITY: 1
}

class CalculatePage extends Component {
    constructor() {
        super()
        this.state = {
            originalQuantity: 100,
            originalCalories: 50,
            wantedQuantity: 0,
            resultCalories: 0,
            typeCalculate: calcType.CALORIES,
            error: { err:false, mess:""}
        }
        this.handleOriginalQuantityChange = this.handleOriginalQuantityChange.bind(this);
        this.handleOriginalCaloryChange = this.handleOriginalCaloryChange.bind(this);
        this.handleWantedQuantityChange = this.handleWantedQuantityChange.bind(this);
        this.handleResultCaloriesChange = this.handleResultCaloriesChange.bind(this);
        this.onCaloryCalcClick = this.onCaloryCalcClick.bind(this);
        this.onQuantityCalcClick = this.onQuantityCalcClick.bind(this);
    }

    onCaloryCalcClick(){
            this.setState({typeCalculate: calcType.CALORIES});
            console.log(this.state.typeCalculate);
    }

    onQuantityCalcClick(){
            this.setState({typeCalculate: calcType.QUANTITY});
            console.log(this.state.typeCalculate);
    }


    handleOriginalQuantityChange(e){
        let originQuantity = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value);
        if (originQuantity === 0) {
            this.setState({error: {err:true, mess:"La quantité originale est invalide"}});
        } else if (this.state.typeCalculate === calcType.CALORIES){
            let resultCals = Math.round((this.state.originalCalories/originQuantity) * this.state.wantedQuantity);
            console.log(resultCals);
            this.setState({originalQuantity: originQuantity, resultCalories: resultCals });
        } else{
            let resultQuant = Math.round(this.state.resultCalories / (this.state.originalCalories/originQuantity))
            console.log(resultQuant);
            this.setState({originalQuantity: originQuantity, wantedQuantity: resultQuant });
        }
    }
    handleOriginalCaloryChange(e){
        let originCalories = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value);
        if (originCalories === 0) {
            this.setState({error: {err:true, mess:"Le nombre de calories originales est invalide"}});
        } else if (this.state.typeCalculate === calcType.CALORIES){
            let resultCals = Math.round((originCalories/this.state.originalQuantity) * this.state.wantedQuantity);
            console.log(resultCals);
            this.setState({originalCalories: originCalories, resultCalories: resultCals });
        } else{
            let resultQuant = Math.round(this.state.resultCalories / (originCalories/this.state.originalQuantity));
            console.log(resultQuant);
            this.setState({originalCalories: originCalories, wantedQuantity: resultQuant });
        }
    }
    handleWantedQuantityChange(e){
        let wantedQuant = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value);
        if (wantedQuant === 0) {
            this.setState({error: {err:true, mess:"La quantité visée est invalide"}});
        } else if (this.state.typeCalculate === calcType.CALORIES){
            let resultCals = Math.round((this.state.originalCalories/this.state.originalQuantity) * wantedQuant);

            this.setState({wantedQuantity: wantedQuant, resultCalories: resultCals });
        }
    }
    handleResultCaloriesChange(e){
        let resCalories = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value);
        console.log(resCalories);
        if (resCalories === 0) {
            this.setState({error: {err:true, mess:"Le nombre de calories visé est invalide"}});
        } else if (this.state.typeCalculate === calcType.QUANTITY){
            let resultQuant = Math.round(resCalories / (this.state.originalCalories/this.state.originalQuantity));
            console.log(resultQuant)
            this.setState({resultCalories: resCalories, wantedQuantity: resultQuant });
            console.log(this.state);
        }
    }

    getChoiceCalcButtons(){
        if (this.state.typeCalculate === calcType.CALORIES){
            return (
                <div className={"choiceContainer"}>
                        <Button className={"calcTypeChosenButton"} variant="primary" onClick={this.onCaloryCalcClick}>Calculer Calories</Button>
                        <Button className={"notChosenButton"} variant="primary" onClick={this.onQuantityCalcClick}>Calculer Quantité</Button>
                </div>
            );
        } else{
            return (
                <div className={"choiceContainer"}>
                        <Button className={"notChosenButton"} variant="primary" onClick={this.onCaloryCalcClick}>Calculer Calories</Button>
                        <Button className={"calcTypeChosenButton"} variant="primary" onClick={this.onQuantityCalcClick}>Calculer Quantité</Button>
                </div>
            );
        }
    }

    getCalcFormEntries(){
        if (this.state.typeCalculate === calcType.CALORIES){
            return (
                <div>
                    <Form.Group className="mb-3" controlId="wantedQuantity">
                        <Form.Label>Quantité voulue</Form.Label>
                        <Form.Control className={"calcEntry"}
                                      type="text"
                                      placeholder={this.state.wantedQuantity.toString()}
                                      onChange={this.handleWantedQuantityChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="wantedCalories">
                        <Form.Label>Calories obtenues</Form.Label>
                        <Form.Control className={"calcEntry disabled"}
                                      type="text"
                                      placeholder={this.state.resultCalories.toString()}
                                      value={this.state.resultCalories.toString()}
                                      disabled
                        />
                    </Form.Group>
                </div>
        );
        } else {
            return (
                <div>
                    <Form.Group className="mb-3" controlId="wantedQuantity">
                        <Form.Label>Quantité voulue</Form.Label>
                        <Form.Control className={"calcEntry disabled"}
                                      type="text"
                                      placeholder={this.state.wantedQuantity.toString()}
                                      value={this.state.wantedQuantity.toString()}
                                      disabled
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="wantedCalories">
                        <Form.Label>Calories obtenues</Form.Label>
                        <Form.Control className={"calcEntry"}
                                      type="text"
                                      placeholder={this.state.resultCalories.toString()}
                                      onChange={this.handleResultCaloriesChange}
                        />
                    </Form.Group>
                </div>
        );
        }

    }

    render() {

        return (
            <Form>
                    {this.getChoiceCalcButtons()}
                    <Form.Group className="mb-3" controlId="originalQuantity">
                        <Form.Label>Quantité d'origine</Form.Label>
                        <Form.Control className={ "calcEntry" }
                                      type="text"
                                      placeholder={this.state.originalQuantity.toString()}
                                      onChange={this.handleOriginalQuantityChange}/>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="originalCalories">
                        <Form.Label>Calories d'origine</Form.Label>
                        <Form.Control className={ "calcEntry" }
                                      type="text"
                                      placeholder={this.state.originalCalories.toString()}
                                      onChange={this.handleOriginalCaloryChange}
                        />
                    </Form.Group>
                    {this.getCalcFormEntries()}
            </Form>
        );
    }
}

export default CalculatePage;
