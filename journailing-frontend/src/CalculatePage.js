import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import "./CalculatePage.css"
import Button from "react-bootstrap/Button";
import SaveFoodRefModal from "./SaveFoodRefModal";
import {faChevronLeft, faFloppyDisk} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import App from "./App";
import {page} from "./PageEnum";
import Toast from "react-bootstrap/Toast";
import {ToastContainer} from "react-bootstrap";
import ThoughtsModal from "./ThoughtsModal";
import ChooseFoodRefModal from "./ChooseFoodRefModal";
import {getUTCDateStringFromDateAndTime, getDateStringFromDatetime, getTimeStringFromDatetime} from "./DateUtils";
import {faFloppyDisk as farFloppyDisk} from "@fortawesome/free-regular-svg-icons";


const calcType = {
    CALORIES: 0,
    QUANTITY: 1
}

const foodState = {
    FROM_PROPS: 0,
    FROM_REF: 1
}

const addPageState = {
    BUTTONS: 0,
    QUICK_ADD: 1,
    FROM_REF_FOOD_ADD: 2,
    RESET: 3
}


class CalculatePage extends Component {
    constructor(props) {
        super(props)
        const now = new Date();
        this.state = {
            originalQuantity: props.foodChosen.original_quantity,
            originalCalories: props.foodChosen.original_calory,
            quantity_type: props.foodChosen.quantity_type,
            foodChosen: props.foodChosen,
            thoughts: props.thoughts,
            foodName: props.foodChosen.name,
            date: getDateStringFromDatetime(now),
            hour: getTimeStringFromDatetime(now),
            quickCalories: 0,
            wantedQuantity: 0,
            resultCalories: 0,
            typeCalculate: calcType.CALORIES,
            error: {err: false, mess: ""},
            modalShow: false,
            toastFailShow: false,
            toastSuccessShow: false,
            pageState: page.CALCULATE_PAGE,
            foodState: foodState.FROM_PROPS,
            showThoughtsModal: false,
            showThoughts: props.thoughts !== "",
            showFoodRefModal: false,
            addState: addPageState.FROM_REF_FOOD_ADD
        }
        this.handleFoodNameChange = this.handleFoodNameChange.bind(this);
        this.handleQuantityTypeChange = this.handleQuantityTypeChange.bind(this);
        this.handleHourChange = this.handleHourChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleQuickCaloriesChange = this.handleQuickCaloriesChange.bind(this);


        this.handleOriginalQuantityChange = this.handleOriginalQuantityChange.bind(this);
        this.handleOriginalCaloryChange = this.handleOriginalCaloryChange.bind(this);
        this.handleWantedQuantityChange = this.handleWantedQuantityChange.bind(this);
        this.handleResultCaloriesChange = this.handleResultCaloriesChange.bind(this);

        this.onCaloryCalcClick = this.onCaloryCalcClick.bind(this);
        this.onQuantityCalcClick = this.onQuantityCalcClick.bind(this);

        this.createSaveFoodRefModal = this.createSaveFoodRefModal.bind(this);
        this.getThoughtsModal = this.getThoughtsModal.bind(this);
        this.getFoodRefModal = this.getFoodRefModal.bind(this);

        this.setFoodChosenFields = this.setFoodChosenFields.bind(this);
        this.setThoughtsFields = this.setThoughtsFields.bind(this);
        this.getThoughtsBubble = this.getThoughtsBubble.bind(this);
        this.saveFoodEntry = this.saveFoodEntry.bind(this);
        this.getForm = this.getForm.bind(this);
    }

    setFoodChosenFields(foodChosen) {
        this.setState({
            foodChosen: foodChosen,
            foodState: foodState.FROM_REF
        });
        console.log(this.state.foodChosen)
        console.log(foodChosen)
    }

    setThoughtsFields(thoughtsSaved) {
        this.setState({
            thoughts: thoughtsSaved,
            showThoughts: true
        });
        console.log(this.state.thoughts)
    }

    getThoughtsModal() {
        return (
            <ThoughtsModal show={this.state.showThoughtsModal}
                           onHide={() => {
                               this.setState({showThoughtsModal: false})
                           }}
                           thoughts={this.state.thoughts}
                           onSave={this.setThoughtsFields}

            />
        );
    }

    getThoughtsBubble() {
        if (this.state.thoughts === "") {
            return null;
        } else {
            return (
                <div className={"thoughtsBubble"}>
                    <p>{this.state.thoughts}</p>
                </div>);
        }

    }

    getFoodRefModal() {
        if (this.state.showFoodRefModal) {
            return (
                <ChooseFoodRefModal show={this.state.showFoodRefModal}
                                    onHide={() => {
                                        this.setState({showFoodRefModal: false})
                                    }}
                                    setFoodChosen={this.setFoodChosenFields}

                />
            );
        } else {
            return null;
        }

    }

    async saveFoodEntry() {
        let jsonBody = {};
        if (this.state.addState === addPageState.QUICK_ADD) {

            jsonBody = JSON.stringify({
                journal_category: {id: 1},
                date: getUTCDateStringFromDateAndTime(this.state.date, this.state.hour),
                calories: this.state.quickCalories,
                thoughts: this.state.thoughts,
                name: this.state.foodName,
            })

        } else if (this.state.addState === addPageState.FROM_REF_FOOD_ADD) {

            jsonBody = JSON.stringify({
                journal_category: {id: 1},
                food_ref: this.state.foodChosen,
                date: getUTCDateStringFromDateAndTime(this.state.date, this.state.hour),
                quantity: this.state.wantedQuantity,
                quantity_type: this.state.quantity_type,
                calories: this.state.resultCalories,
                thoughts: this.state.thoughts,
                name: this.state.foodName,
            });
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/food-journal-entry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonBody
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const newEntry = await response.json();
            console.log('Food entry saved:', newEntry);
            this.setState({
                toastSuccessShow: true,
                addState: addPageState.RESET
            });

        } catch (error) {
            console.error('Error saving food entry:', error.message);
            this.setState({toastFailShow: true});
        }
    }


    onCaloryCalcClick() {
        this.setState({typeCalculate: calcType.CALORIES});
        console.log(this.state.typeCalculate);
    }

    onQuantityCalcClick() {
        this.setState({typeCalculate: calcType.QUANTITY});
        console.log(this.state.typeCalculate);
    }

    handleFoodNameChange(e) {
        this.setState({foodName: e.target.value});
    }

    handleQuantityTypeChange(e) {
        this.setState({quantity_type: e.target.value});
    }


    handleHourChange(e) {
        console.log(e.target.value)
        this.setState({hour: e.target.value});
    }

    handleDateChange(e) {
        console.log(e.target.value)
        this.setState({date: e.target.value});
    }

    handleQuickCaloriesChange(e) {
        let originCalories = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value);
        this.setState({quickCalories: originCalories});
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
                    <Button className={"calcTypeChosenButton choiceCalcButton"} variant="primary"
                            onClick={this.onCaloryCalcClick}>Calculer
                        Calories</Button>
                    <Button className={"notChosenButton choiceCalcButton"} variant="primary"
                            onClick={this.onQuantityCalcClick}>Calculer
                        Quantité</Button>
                </div>
            );
        } else {
            return (
                <div className={"choiceContainer"}>
                    <Button className={"notChosenButton choiceCalcButton"} variant="primary"
                            onClick={this.onCaloryCalcClick}>Calculer
                        Calories</Button>
                    <Button className={"calcTypeChosenButton choiceCalcButton"} variant="primary"
                            onClick={this.onQuantityCalcClick}>Calculer
                        Quantité</Button>
                </div>
            );
        }
    }

    getCalcFormEntries() {
        if (this.state.typeCalculate === calcType.CALORIES) {
            return (
                <div className={"calcEntryContainer"}>
                    <Form.Group className="mb-3 formEntries" controlId="wantedQuantity">
                        <Form.Label>Qté. voulue</Form.Label>
                        <Form.Control className={"calcEntry"}
                                      type="text"
                                      placeholder={this.state.wantedQuantity.toString()}
                                      onChange={this.handleWantedQuantityChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 formEntries" controlId="wantedCalories">
                        <Form.Label>Cal. obtenues</Form.Label>
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
                <div className={"calcEntryContainer"}>
                    <Form.Group className="mb-3 formEntries" controlId="wantedQuantity">
                        <Form.Label>Qté. voulue</Form.Label>
                        <Form.Control className={"calcEntry disabled"}
                                      type="text"
                                      placeholder={this.state.wantedQuantity === null ? 0 : this.state.wantedQuantity.toString()}
                                      value={this.state.wantedQuantity.toString()}
                                      disabled
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 formEntries" controlId="wantedCalories">
                        <Form.Label>Calories obtenues</Form.Label>
                        <Form.Control className={"calcEntry"}
                                      type="text"
                                      placeholder={this.state.resultCalories === null ? 0 : this.state.resultCalories.toString()}
                                      onChange={this.handleResultCaloriesChange}
                        />
                    </Form.Group>
                </div>
            );
        }

    }

    createSaveFoodRefModal() {
        if (this.state.modalShow) {
            return (
                <SaveFoodRefModal show={this.state.modalShow}
                                  onHide={() => this.setState({modalShow: false})}
                                  quantity={this.state.originalQuantity}
                                  calories={this.state.originalCalories}
                                  quantityType={this.state.quantity_type}
                                  foodName={this.state.foodName}
                                  onSuccessSave={(newFoodRef) => {
                                      this.setState({modalShow: false, toastSuccessShow: true, foodChosen: newFoodRef})
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

    getForm() {
        let hourForm = (<div className={"dateTimeInputContainer"}>
            <Form.Group className="entryColItem formEntries" controlId="dayDate">
                <Form.Label>Jour</Form.Label>
                <Form.Control className={"calcEntry"}
                              type="date"
                              placeholder={this.state.date}
                              onChange={this.handleDateChange}
                              value={this.state.date}
                />
            </Form.Group>
            <Form.Group className="entryColItem formEntries" controlId="time">
                <Form.Label>Heure</Form.Label>
                <Form.Control className={"calcEntry"}
                              type="time"
                              placeholder={this.state.hour}
                              onChange={this.handleHourChange}
                              value={this.state.hour}
                />
            </Form.Group>
        </div>);
        if (this.state.addState === addPageState.QUICK_ADD) {
            return (<Form className={"calcForm"}>
                {this.getFoodRefModal()}
                <div className={"entryColumns"}>
                    <Form.Group className="entryColItem" controlId="nameEntry">
                        <Form.Label>Nom de l'aliment</Form.Label>
                        <Form.Control className={"calcEntry"}
                                      type="text"
                                      onChange={this.handleFoodNameChange}
                                      value={this.state.foodName}
                        />
                    </Form.Group>
                    <Form.Group className="entryColItem" controlId="quickCalories">
                        <Form.Label>Calories</Form.Label>
                        <Form.Control className={"calcEntry"}
                                      type="text"
                                      placeholder={this.state.quickCalories.toString()}
                                      onChange={this.handleQuickCaloriesChange}
                                      value={this.state.quickCalories.toString()}
                        />
                    </Form.Group>

                    {hourForm}

                    <Button className={"thoughtsModalBtn"} variant="primary"
                            onClick={() => this.setState({showThoughtsModal: true})}>
                        Ajouter/Editer vos pensées ou émotions
                    </Button>
                    {this.getThoughtsBubble()}
                    {this.getThoughtsModal()}
                </div>
                <div className={"calcEntryContainer"}>
                    <Button className={"saveFoodBtn"} variant="primary"
                            onClick={this.saveFoodEntry}>
                        <span className={"iconSpan"}><FontAwesomeIcon icon={faFloppyDisk}/></span>
                        Sauvegarder dans le journal</Button>
                </div>

                {this.createSaveFoodRefModal()}

            </Form>);
        } else if (this.state.addState === addPageState.FROM_REF_FOOD_ADD) {
            return (
                <Form className={"calcForm"}>
                    <Button className={"foodRefModalBtn"} variant="primary"
                            onClick={() => this.setState({showFoodRefModal: true})}>
                        Choisir un aliment (optionnel)
                    </Button>
                    {this.getFoodRefModal()}
                    <div className={"entryColumns"}>
                        <Form.Group className="entryColItem" controlId="nameEntry">
                            <Form.Label>Nom de l'aliment</Form.Label>
                            <Form.Control className={"calcEntry"}
                                          type="text"
                                          onChange={this.handleFoodNameChange}
                                          value={this.state.foodName}
                            />
                        </Form.Group>

                        {hourForm}

                        <Button className={"thoughtsModalBtn"} variant="primary"
                                onClick={() => this.setState({showThoughtsModal: true})}>
                            Ajouter/Editer vos pensées ou émotions
                        </Button>
                        {this.getThoughtsBubble()}
                        {this.getThoughtsModal()}
                    </div>
                    <Form.Group className="entryColItem" controlId="quantityTypeEntry">
                        <Form.Label>Type Quantité</Form.Label>
                        <Form.Control className={"calcEntry"}
                                      type="text"
                                      onChange={this.handleQuantityTypeChange}
                                      value={this.state.quantity_type}
                        />
                    </Form.Group>
                    {this.getChoiceCalcButtons()}
                    <div className={"calcEntryContainer"}>
                        <Form.Group className="mb-3 formEntries" controlId="originalQuantity">
                            <Form.Label>Qté. d'origine</Form.Label>
                            <Form.Control className={"calcEntry"}
                                          type="text"
                                          placeholder={this.state.originalQuantity === null ? 0 : this.state.originalQuantity.toString()}
                                          onChange={this.handleOriginalQuantityChange}
                                          value={this.state.originalQuantity === 0 ? "" : this.state.originalQuantity}
                            />
                        </Form.Group>


                        <Form.Group className="mb-3 formEntries" controlId="originalCalories">
                            <Form.Label>Calories d'origine</Form.Label>
                            <Form.Control className={"calcEntry"}
                                          type="text"
                                          placeholder={this.state.originalCalories === null ? 0 : this.state.originalCalories.toString()}
                                          onChange={this.handleOriginalCaloryChange}
                                          value={this.state.originalCalories === 0 ? "" : this.state.originalCalories}
                            />
                        </Form.Group>
                    </div>
                    {this.getCalcFormEntries()}
                    <div className={"calcEntryContainer"}>
                        <Button className={"saveFoodBtn"} variant="primary"
                                onClick={() => this.setState({modalShow: true})}>
                            <span className={"iconSpan"}><FontAwesomeIcon icon={farFloppyDisk}/></span>
                            Sauvegarder nouvel Aliment</Button>
                        <Button className={"saveFoodBtn"} variant="primary"
                                onClick={this.saveFoodEntry}>
                            <span className={"iconSpan"}><FontAwesomeIcon icon={faFloppyDisk}/></span>

                            Sauvegarder entrée journal</Button>
                    </div>

                    {this.createSaveFoodRefModal()}

                </Form>
            );
        }

    }


    render() {

        if (this.state.pageState === page.CALCULATE_PAGE && this.state.foodState === foodState.FROM_REF) {
            return (
                <CalculatePage
                    foodChosen={this.state.foodChosen}
                    thoughts={this.state.thoughts}
                />
            )
        } else if (this.state.addState === addPageState.RESET) {
            return (
                <CalculatePage
                    foodChosen={{name: "", original_quantity: null, original_calory: null, quantity_type: "", id: null}}
                    thoughts={""}
                />);


        } else if (this.state.pageState === page.CALCULATE_PAGE) {
            return (
                <div className={"calcPageContainer"}>
                    <Button className={"backBanner"}
                            variant="dark"
                            onClick={() => {
                                this.setState({pageState: page.HOME})
                            }}
                    >
                        <span className={"iconBackBanner"}><FontAwesomeIcon icon={faChevronLeft}/></span> <span
                        className={"textBackBanner"}>Return Home</span>
                    </Button>

                    <div className={"calculatorContainer"}>
                        <div className={"addMethodChoiceContainer"}>
                            <Button className="calculationAddButton" variant="primary" onClick={() =>
                                this.setState({
                                    addState: addPageState.FROM_REF_FOOD_ADD
                                })}>
                                CALCULATEUR
                            </Button>
                            <Button className="fastAddButton" variant="primary" onClick={() =>
                                this.setState({
                                    addState: addPageState.QUICK_ADD
                                })}>
                                AJOUT RAPIDE
                            </Button>

                        </div>


                        {/*Toast notif in case of success save of new food ref*/}
                        <ToastContainer position="middle-center" className="p-3">
                            <Toast className={"toastSaveSuccess"}
                                   onClose={() => this.setState({toastSuccessShow: false})}
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
                        {this.getForm()}
                    </div>
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

