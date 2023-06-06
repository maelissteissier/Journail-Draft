import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import {page} from "../PageEnum";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import "./JournalLogComponent.css"
import {
    addOneDayToDatetime,
    changeTimeOfDatetime,
    getDateStringFromDatetime,
    getTimeStringFromDatetime,
    removeOneDayToDatetime
} from "../DateUtils";


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


class JournalLogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageState: page.JOURNAL_LOG,
            day: props.day,
            pageDayState: dayState.TODAY,
            modalShow: false,
            toastFailShow: false,
            toastSuccessShow: false,

        }
        this.getTotalCalories = this.getTotalCalories.bind(this);
        this.getFoodLogTable = this.getFoodLogTable.bind(this);
        this.getCellCaloriesByLunchType = this.getCellCaloriesByLunchType.bind(this);
        this.getFoodLogTableByLunchType = this.getFoodLogTableByLunchType.bind(this);
    }


    getFoodLogTableByLunchType(lunchType, lunchCalories) {
        const lunchTypeMinDate = changeTimeOfDatetime(this.props.day, lunchType.timeMin);
        const lunchTypeMaxDate = changeTimeOfDatetime(this.props.day, lunchType.timeMax);
        const lunchtypeHead = (<tr key={lunchType.tag}>
            <td className={"journalTableElem lunchTypeRow"}
                colSpan={5}>{lunchType.tag.toUpperCase() + " : " + lunchCalories + " cals"}
            </td>
        </tr>);
        const lunchTypeEntries = this.props.foodEntries.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
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

    getFoodLogTable(morningCals, noonCals, afternoonCals, eveningCals) {
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
                {this.getFoodLogTableByLunchType(dayTime.MORNING, morningCals)}
                {this.getFoodLogTableByLunchType(dayTime.NOON, noonCals)}
                {this.getFoodLogTableByLunchType(dayTime.AFTERNOON, afternoonCals)}
                {this.getFoodLogTableByLunchType(dayTime.EVENING, eveningCals)}
                </tbody>
            </Table>

        );
    }

    getCellCaloriesByLunchType(entries, lunchType) {

        const lunchTypeMinDate = changeTimeOfDatetime(this.props.day, lunchType.timeMin);
        const lunchTypeMaxDate = changeTimeOfDatetime(this.props.day, lunchType.timeMax);
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
        return this.props.foodEntries.reduce((acc, currVal) => acc + currVal.calories, 0);
    }


    render() {

        return (
            <div className={"journalLogContainer"}>

                <div className={"caloriesStats"}>
                    <div>
                        <div className={"calorieStatsLabel"}>objectif</div>
                        <div className={"caloriesTotal"}>2100</div>
                    </div>
                    <div>
                        <div className={"calorieStatsLabel"}>mangées</div>
                        <div className={"caloriesTotal"}>
                            {this.getTotalCalories()}
                        </div>
                    </div>
                    <div>
                        <div className={"calorieStatsLabel"}>restantes</div>
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
                                  const actualDay = this.props.day;
                                  this.props.onNavigatingFoodJournalDay(removeOneDayToDatetime(actualDay));
                              }}><FontAwesomeIcon icon={faChevronLeft}/></span>
                    <span className={"dateLog"}>{getDateStringFromDatetime(this.props.day)}</span>
                    <span className={"dayAfterIcon"}
                          onClick={() => {
                              const actualDay = this.props.day;
                              this.props.onNavigatingFoodJournalDay(addOneDayToDatetime(actualDay));
                          }}><FontAwesomeIcon icon={faChevronRight}/></span>
                </div>
                {this.getFoodLogTable(
                    this.getCellCaloriesByLunchType(this.props.foodEntries, dayTime.MORNING),
                    this.getCellCaloriesByLunchType(this.props.foodEntries, dayTime.NOON),
                    this.getCellCaloriesByLunchType(this.props.foodEntries, dayTime.AFTERNOON),
                    this.getCellCaloriesByLunchType(this.props.foodEntries, dayTime.EVENING)
                )}

                <Button className="addFoodEntryButton"
                        variant="primary"
                        onClick={this.props.goToCalcPage}>
                    <FontAwesomeIcon icon={faCirclePlus}/>
                </Button>{' '}
            </div>

        );
    }
}

export default JournalLogComponent;