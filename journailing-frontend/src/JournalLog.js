import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import {page} from "./PageEnum";
import App from "./App";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import "./JournalLog.css"
import {
    addOneDayToDatetime,
    changeTimeOfDatetime,
    getDateStringFromDatetime,
    getTimeStringFromDatetime,
    removeOneDayToDatetime
} from "./DateUtils";
import AddFoodJournalEntryModal from "./AddFoodJournalEntryModal";
import CalculatePage from "./CalculatePage";


const dayState = {
    TODAY: 0,
    NAVIGATING: 1
}

const dayTime = {
    MORNING: {timeMin: "00:00", timeMax: "11:30", tag: "Matin"},
    NOON: {timeMin: "11:30", timeMax: "14:30", tag: "Midi"},
    AFTERNOON: {timeMin: "14:30", timeMax: "17:45", tag: "Apres-midi"},
    EVENING: {timeMin: "17:45", timeMax: "23:59", tag: "Soir"}
}

const dayTimeline = [dayTime.MORNING, dayTime.NOON, dayTime.AFTERNOON, dayTime.EVENING]

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
            morningCals: 0,
            noonCals: 0,
            afternoonCals: 0,
            eveningCals: 0

        }
        this.getTotalCalories = this.getTotalCalories.bind(this);
        this.getFoodLogTable = this.getFoodLogTable.bind(this);
        this.createModal = this.createModal.bind(this);
        this.getCellCaloriesByLunchType = this.getCellCaloriesByLunchType.bind(this);
        this.getFoodLogTableByLunchType = this.getFoodLogTableByLunchType.bind(this);
    }

    async componentDidMount() {
        const formattedDate = getDateStringFromDatetime(this.state.day);

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/food-journal-entries/date?date=${formattedDate}`);
            if (!response.ok) {
                throw new Error('Failed to fetch food journal entries');
            }
            const entries = await response.json();
            this.setState({
                foodEntries: entries,
                pageState: page.JOURNAL_LOG,
                morningCals: this.getCellCaloriesByLunchType(entries, dayTime.MORNING),
                noonCals: this.getCellCaloriesByLunchType(entries, dayTime.NOON),
                afternoonCals: this.getCellCaloriesByLunchType(entries, dayTime.AFTERNOON),
                eveningCals: this.getCellCaloriesByLunchType(entries, dayTime.EVENING)
            })
            return entries;
        } catch (error) {
            console.error(error);
            console.error('Error fetching FoodEntries:', error);
        }
    }

    getFoodLogTableByLunchType(lunchType, lunchCalories) {
        const lunchTypeMinDate = changeTimeOfDatetime(this.state.day, lunchType.timeMin);
        const lunchTypeMaxDate = changeTimeOfDatetime(this.state.day, lunchType.timeMax);
        const lunchtypeHead = (<tr key={lunchType.tag}>
            <td className={"journalTableElem lunchTypeRow"}
                colSpan={5}>{lunchType.tag.toUpperCase() + " : " + lunchCalories + " cals"}
            </td>
        </tr>);
        const lunchTypeEntries = this.state.foodEntries.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            const compare = dateA - dateB;
            return dateA - dateB;
        })
            .filter(entry => {
                const entryDate = new Date(entry.date);
                return entryDate >= lunchTypeMinDate && entryDate < lunchTypeMaxDate
            })
            .map(entry => {
                const entryDate = new Date(entry.date);
                const formattedTime = getTimeStringFromDatetime(entryDate);
                return (

                    <tr key={entry.id}>
                        <td className={"journalTableElem"}>{formattedTime}</td>
                        <td className={"journalTableElem"}>{entry.name}</td>
                        <td className={"journalTableElem"}>{entry.quantity}</td>
                        <td className={"journalTableElem"}>{entry.quantity_type}</td>
                        <td className={"journalTableElem"}>{entry.calories}</td>

                    </tr>
                );
            });

        return (
            <>
                {lunchtypeHead}
                {lunchTypeEntries}
            </>
        );

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
                <tbody>
                {this.getFoodLogTableByLunchType(dayTime.MORNING, this.state.morningCals)}
                {this.getFoodLogTableByLunchType(dayTime.NOON, this.state.noonCals)}
                {this.getFoodLogTableByLunchType(dayTime.AFTERNOON, this.state.afternoonCals)}
                {this.getFoodLogTableByLunchType(dayTime.EVENING, this.state.eveningCals)}
                </tbody>
            </Table>

        );
    }

    getCellCaloriesByLunchType(entries, lunchType) {

        const lunchTypeMinDate = changeTimeOfDatetime(this.state.day, lunchType.timeMin);
        const lunchTypeMaxDate = changeTimeOfDatetime(this.state.day, lunchType.timeMax);
        return entries.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
        }).filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate >= lunchTypeMinDate && entryDate < lunchTypeMaxDate
        }).reduce((acc, currVal) => acc + currVal.calories, 0)
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
        } else if (this.state.pageState === page.CALCULATE_PAGE) {
            return (
                <CalculatePage
                    foodChosen={{name: "", original_quantity: null, original_calory: null, type_quantity: "", id: null}}
                    thoughts={""}/>
            )

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
                    <div className={"journalLogContainer"}>

                        <div className={"caloriesStats"}>
                            <div>
                                <div className={"calorieStatsLabel"}>goal</div>
                                <div className={"caloriesTotal"}>2100</div>
                            </div>
                            <div>
                                <div className={"calorieStatsLabel"}>eaten</div>
                                <div className={"caloriesTotal"}>
                                    {this.getTotalCalories()}
                                </div>
                            </div>
                            <div>
                                <div className={"calorieStatsLabel"}>left</div>
                                <div className={"caloriesTotal"}>
                                    {(() => {
                                        let totalcals = this.getTotalCalories();
                                        return (2100 - totalcals);
                                    })()}
                                </div>
                            </div>
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
                            <span className={"dateLog"}>{getDateStringFromDatetime(this.state.day)}</span>
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
                                onClick={() => this.setState({pageState: page.CALCULATE_PAGE})}>
                            <FontAwesomeIcon icon={faCirclePlus}/>
                        </Button>{' '}
                        {this.createModal()}
                    </div>
                </div>
            );
        } else if (this.state.pageState === page.LOADING) {
            return (<div>Loading...</div>);
        }
    }
}

export default JournalLog;