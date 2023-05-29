import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import "./CalculatePage.css"
import Button from "react-bootstrap/Button";
import SaveFoodRefModal from "./SaveFoodRefModal";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import App from "./App";
import {page} from "./PageEnum";
import Toast from "react-bootstrap/Toast";
import {ToastContainer} from "react-bootstrap";

const calcType = {
    CALORIES: 0,
    QUANTITY: 1
}


class CalculatePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            originalQuantity: props.foodChosen.original_quantity,
            originalCalories: props.foodChosen.original_calory,
            wantedQuantity: 0,
            resultCalories: 0,
            typeCalculate: calcType.CALORIES,
            error: {err: false, mess: ""},
            modalShow: false,
            toastFailShow: false,
            toastSuccessShow: false,
            pageState: page.CALCULATE_PAGE
        }
        this.handleOriginalQuantityChange = this.handleOriginalQuantityChange.bind(this);
        this.handleOriginalCaloryChange = this.handleOriginalCaloryChange.bind(this);
        this.handleWantedQuantityChange = this.handleWantedQuantityChange.bind(this);
        this.handleResultCaloriesChange = this.handleResultCaloriesChange.bind(this);
        this.onCaloryCalcClick = this.onCaloryCalcClick.bind(this);
        this.onQuantityCalcClick = this.onQuantityCalcClick.bind(this);
        this.createModal = this.createModal.bind(this);
    }


    onCaloryCalcClick() {
        this.setState({typeCalculate: calcType.CALORIES});
        console.log(this.state.typeCalculate);
    }

    onQuantityCalcClick() {
        this.setState({typeCalculate: calcType.QUANTITY});
        console.log(this.state.typeCalculate);
    }


    handleOriginalQuantityChange(e) {
        let originQuantity = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value);
        if (originQuantity === 0) {
            this.setState({error: {err: true, mess: "La quantité originale est invalide"}});
        } else if (this.state.typeCalculate === calcType.CALORIES) {
            let resultCals = Math.round((this.state.originalCalories / originQuantity) * this.state.wantedQuantity);
            console.log(resultCals);
            this.setState({originalQuantity: originQuantity, resultCalories: resultCals});
        } else {
            let resultQuant = Math.round(this.state.resultCalories / (this.state.originalCalories / originQuantity))
            console.log(resultQuant);
            this.setState({originalQuantity: originQuantity, wantedQuantity: resultQuant});
        }
    }

    handleOriginalCaloryChange(e) {
        let originCalories = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value);
        if (originCalories === 0) {
            this.setState({error: {err: true, mess: "Le nombre de calories originales est invalide"}});
        } else if (this.state.typeCalculate === calcType.CALORIES) {
            let resultCals = Math.round((originCalories / this.state.originalQuantity) * this.state.wantedQuantity);
            console.log(resultCals);
            this.setState({originalCalories: originCalories, resultCalories: resultCals});
        } else {
            let resultQuant = Math.round(this.state.resultCalories / (originCalories / this.state.originalQuantity));
            console.log(resultQuant);
            this.setState({originalCalories: originCalories, wantedQuantity: resultQuant});
        }
    }

    handleWantedQuantityChange(e) {
        let wantedQuant = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value);
        if (wantedQuant === 0) {
            this.setState({error: {err: true, mess: "La quantité visée est invalide"}});
        } else if (this.state.typeCalculate === calcType.CALORIES) {
            let resultCals = Math.round((this.state.originalCalories / this.state.originalQuantity) * wantedQuant);

            this.setState({wantedQuantity: wantedQuant, resultCalories: resultCals});
        }
    }

    handleResultCaloriesChange(e) {
        let resCalories = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value);
        console.log(resCalories);
        if (resCalories === 0) {
            this.setState({error: {err: true, mess: "Le nombre de calories visé est invalide"}});
        } else if (this.state.typeCalculate === calcType.QUANTITY) {
            let resultQuant = Math.round(resCalories / (this.state.originalCalories / this.state.originalQuantity));
            console.log(resultQuant)
            this.setState({resultCalories: resCalories, wantedQuantity: resultQuant});
            console.log(this.state);
        }
    }

    getChoiceCalcButtons() {
        if (this.state.typeCalculate === calcType.CALORIES) {
            return (
                <div className={"choiceContainer"}>
                    <Button className={"calcTypeChosenButton"} variant="primary" onClick={this.onCaloryCalcClick}>Calculer
                        Calories</Button>
                    <Button className={"notChosenButton"} variant="primary" onClick={this.onQuantityCalcClick}>Calculer
                        Quantité</Button>
                </div>
            );
        } else {
            return (
                <div className={"choiceContainer"}>
                    <Button className={"notChosenButton"} variant="primary" onClick={this.onCaloryCalcClick}>Calculer
                        Calories</Button>
                    <Button className={"calcTypeChosenButton"} variant="primary" onClick={this.onQuantityCalcClick}>Calculer
                        Quantité</Button>
                </div>
            );
        }
    }

    getCalcFormEntries() {
        if (this.state.typeCalculate === calcType.CALORIES) {
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
        } else if (this.state.typeCalculate === calcType.QUANTITY) {
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

    createModal() {
        if (this.state.modalShow) {
            return (
                <SaveFoodRefModal show={this.state.modalShow}
                                  onHide={() => this.setState({modalShow: false})}
                                  quantity={this.state.originalQuantity}
                                  calories={this.state.originalCalories}
                                  onSuccessSave={() => {
                                      this.setState({modalShow: false, toastSuccessShow: true})
                                  }}
                                  onFailSave={() => {
                                      this.setState({modalShow: false, toastFailShow: true})
                                  }}
                />
            );
        } else {
            return null;
        }
    }

    render() {

        if (this.state.pageState === page.CALCULATE_PAGE) {
            return (
                <div>
                    <Button className={"backBanner"}
                            variant="dark"
                            onClick={() => {
                                this.setState({pageState: page.HOME})
                            }}
                    >
                        <span className={"iconBackBanner"}><FontAwesomeIcon icon={faChevronLeft}/></span> <span
                        className={"textBackBanner"}>Return Home</span>
                    </Button>
                    {/*Toast notif in case of success save of new food ref*/}
                    <ToastContainer position="middle-center" className="p-3">
                        <Toast className={"toastSaveSuccess"} onClose={() => this.setState({toastSuccessShow: false})}
                               show={this.state.toastSuccessShow} delay={3000}
                               autohide>
                            <Toast.Header>
                                <strong className="me-auto">Aliment sauvé avec succès !</strong>
                            </Toast.Header>

                        </Toast>
                    </ToastContainer>
                    {/*Toast notif in case of failing save of new food ref*/}
                    <ToastContainer position="middle-center" className="p-3">
                        <Toast className={"toastSaveFail"} onClose={() => this.setState({toastFailShow: false})}
                               show={this.state.toastFailShow} delay={3000}
                               autohide>
                            <Toast.Header>
                                <strong className="me-auto">Echec de la sauvegarde de l'aliment !</strong>
                            </Toast.Header>
                        </Toast>
                    </ToastContainer>
                    <Form className={"calcForm"}>
                        {this.getChoiceCalcButtons()}
                        <Form.Group className="mb-3" controlId="originalQuantity">
                            <Form.Label>Quantité d'origine</Form.Label>
                            <Form.Control className={"calcEntry"}
                                          type="text"
                                          placeholder={this.state.originalQuantity.toString()}
                                          onChange={this.handleOriginalQuantityChange}
                                          value={this.state.originalQuantity === 0 ? "" : this.state.originalQuantity}
                            />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="originalCalories">
                            <Form.Label>Calories d'origine</Form.Label>
                            <Form.Control className={"calcEntry"}
                                          type="text"
                                          placeholder={this.state.originalCalories.toString()}
                                          onChange={this.handleOriginalCaloryChange}
                                          value={this.state.originalCalories === 0 ? "" : this.state.originalCalories}
                            />
                        </Form.Group>
                        {this.getCalcFormEntries()}
                        <Button className={"saveFood"} variant="primary"
                                onClick={() => this.setState({modalShow: true})}>Sauvegarder
                            Aliment</Button>
                        {this.createModal()}

                    </Form>
                </div>
            );
        } else if (this.state.pageState === page.HOME) {
            return (
                <App/>
            );
        }


    }
}

export default CalculatePage;
