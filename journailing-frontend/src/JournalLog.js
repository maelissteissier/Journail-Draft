import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import {page} from "./PageEnum";
import App from "./App";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import "./JournalLog.css"
import {addOneDayToDatetime, getDayDateFromDatetime, getTimeFromDatetime, removeOneDayToDatetime} from "./DateUtils";
import SaveFoodRefModal from "./SaveFoodRefModal";
import AddFoodJournalEntryModal from "./AddFoodJournalEntryModal";

const dayState = {
    TODAY: 0,
    NAVIGATING: 1
}

class JournalLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageState: page.LOADING,
            foodEntries: [],
            day: props.day,
            pageDayState: dayState.TODAY,
            modalShow: false,
            toastFailShow: false,
            toastSuccessShow: false,

        }
        // this.handleFoodNameChange = this.handleFoodNameChange.bind(this);
        // this.handleQuantityChange = this.handleQuantityChange.bind(this);
        // this.handleCaloriesChange = this.handleCaloriesChange.bind(this);
        // this.onSaveFood = this.onSaveFood.bind(this);
        this.getTotalCalories = this.getTotalCalories.bind(this);
        this.getFoodLogTable = this.getFoodLogTable.bind(this);
        this.createModal = this.createModal.bind(this);
    }

    async componentDidMount() {
        const formattedDate = getDayDateFromDatetime(this.state.day);

        try {
            const response = await fetch(`http://192.168.2.31:5000/food-journal-entries/date?date=${formattedDate}`);
            if (!response.ok) {
                throw new Error('Failed to fetch food journal entries');
            }
            const entries = await response.json();
            this.setState({foodEntries: entries, pageState: page.JOURNAL_LOG})
            return entries;
        } catch (error) {
            console.error(error);
            console.error('Error fetching FoodEntries:', error);
        }
    }

    getFoodLogTable() {
        return (
            <Table striped="columns" className={"journalLogTable"}>
                <thead>
                <tr className={"journalTableHeader"}>
                    <th className={"journalTableHeaderElem"}>Heure</th>
                    <th className={"journalTableHeaderElem"}>Nom Aliment</th>
                    <th className={"journalTableHeaderElem"}>Qté.</th>
                    <th className={"journalTableHeaderElem"}>Type Qté.</th>
                    <th className={"journalTableHeaderElem"}>Cals.</th>
                </tr>
                </thead>
                {this.state.foodEntries.map(entry => {
                    const date = new Date(entry.date);
                    const formattedTime = getTimeFromDatetime(date);

                    return (
                        <tr key={entry.id}>
                            <td className={"journalTableElem"}>{formattedTime}</td>
                            <td className={"journalTableElem"}>{entry.name}</td>
                            <td className={"journalTableElem"}>{entry.quantity}</td>
                            <td className={"journalTableElem"}>{entry.quantity_type}</td>
                            <td className={"journalTableElem"}>{entry.calories}</td>

                        </tr>
                    )
                })}
            </Table>

        );
    }


    getTotalCalories() {
        return this.state.foodEntries.reduce((acc, currVal) => acc + currVal.calories, 0);
    }

    createModal() {
        if (this.state.modalShow) {
            return (
                <AddFoodJournalEntryModal show={this.state.modalShow}
                                          onHide={() => this.setState({modalShow: false})}
                                          quantity={this.state.originalQuantity}
                                          calories={this.state.originalCalories}
                                          foodEntry={{
                                              "date": new Date(),
                                              "quantity": 34,
                                              "quantity_type": "grammes",
                                              "calories": 345,
                                              "thoughts": "ehlala",
                                              "journal_category": {
                                                  "id": 1,
                                                  "name": "food"
                                              },
                                              "name": "Caprice des dieux"
                                          }}
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
        if (this.state.pageState === page.HOME) {
            return (
                <App/>
            );
        } else if (this.state.pageState === page.JOURNAL_LOG && this.state.pageDayState === dayState.NAVIGATING) {
            return (<JournalLog day={this.state.day}/>);

        } else if (this.state.pageState === page.JOURNAL_LOG) {
            return (<div>
                    <Button className={"backBanner"}
                            variant="dark"
                            onClick={() => {
                                this.setState({pageState: page.HOME})
                            }}
                    >
                        <span className={"iconBackBanner"}><FontAwesomeIcon icon={faChevronLeft}/></span> <span
                        className={"textBackBanner"}>Return Home</span>
                    </Button>

                    <div className={"caloriesTotal"}>
                        {this.getTotalCalories()} cals
                    </div>
                    <div className={"dateLogNavigating"}>
                        <span className={"dayBeforeIcon"}
                              onClick={() => {
                                  const actualDay = this.state.day;
                                  this.setState({
                                      day: removeOneDayToDatetime(actualDay),
                                      pageDayState: dayState.NAVIGATING
                                  })
                              }}><FontAwesomeIcon icon={faChevronLeft}/></span>
                        <span className={"dateLog"}>{getDayDateFromDatetime(this.state.day)}</span>
                        <span className={"dayAfterIcon"}
                              onClick={() => {
                                  const actualDay = this.state.day;
                                  this.setState({
                                      day: addOneDayToDatetime(actualDay),
                                      pageDayState: dayState.NAVIGATING
                                  })
                              }}><FontAwesomeIcon icon={faChevronRight}/></span>
                    </div>
                    {this.getFoodLogTable()}

                    <Button className="addFoodEntryButton"
                            variant="primary"
                            onClick={() => this.setState({modalShow: true})}>
                        <FontAwesomeIcon icon={faCirclePlus}/>
                    </Button>{' '}
                    {this.createModal()}
                </div>
            );
        } else if (this.state.pageState === page.LOADING) {
            return (<div>Loading...</div>);
        }
    }
}

export default JournalLog;