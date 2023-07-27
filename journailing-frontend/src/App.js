import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBook, faChevronLeft, faCirclePlus, faMagnifyingGlass, faQuestion} from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import React, {useState} from "react";
import CalculatePage from "./CalculatePage";
import FoodRefsManagementComponent from "./components/FoodRefsManagementComponent";
import {page} from "./PageEnum";
import JournalLogComponent from "./components/JournalLogComponent";
import {getDateStringFromDatetime} from "./DateUtils";


const fetchFoodRefList = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/foodrefs`);

        if (!response.ok) {
            throw new Error('Failed to fetch FoodRefs');
        }

        const foodRefs = await response.json();
        console.log('FoodRefs:', foodRefs);
        return foodRefs;

    } catch (error) {
        console.error('Error fetching FoodRefs:', error);
    }
}

const fetchFoodJournalLog = async (date) => {
    const formattedDate = getDateStringFromDatetime(date);

    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/food-journal-entries/date?date=${formattedDate}`);
        if (!response.ok) {
            throw new Error('Failed to fetch food journal entries');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching FoodEntries:', error);
    }
}


function App() {
    const defaultFoodRefChosen = {name: "", original_quantity: null, original_calory: null, quantity_type: "", id: null}
    const [state, setState] = useState({pageState: page.HOME, foodRefList: [], foodChosen: defaultFoodRefChosen});

    const changePage = (newPage) => {
        setState({pageState: newPage, foodRefList: state.foodRefList, foodChosen: state.foodChosen})
    }

    const goToCalcPage = async () => {
        fetchFoodRefList().then(foodRefs => {
            setState({
                pageState: page.CALCULATE_PAGE,
                foodRefList: foodRefs,
                foodChosen: defaultFoodRefChosen
            })
        }).catch(err => {
            setState({
                pageState: page.LOADING_CALCULATE_PAGE,
                foodRefList: state.foodRefList,
                foodChosen: defaultFoodRefChosen
            });
        });// I think this catch is useless

    }

    const onFoodChosen = (foodChosenRes) => {
        setState({pageState: page.CALCULATE_PAGE, foodRefList: state.foodRefList, foodChosen: foodChosenRes})
    }

    const onNavigatingFoodJournalDay = (newDay) => {
        fetchFoodJournalLog(newDay).then(journalLog => {
            setState({
                pageState: page.JOURNAL_LOG,
                foodRefList: state.foodRefList,
                foodChosen: defaultFoodRefChosen,
                journalLog: journalLog,
                journalDay: newDay
            })
        }).catch(err => {
            setState({
                pageState: page.LOADING_FOOD_JOURNAL_LOG_PAGE,
                foodRefList: state.foodRefList,
                foodChosen: defaultFoodRefChosen
            });
        }); // I think this catch is useless
    }

    if (state.pageState === page.HOME) {
        return (
            <div className="App">
                <div className="App-header-home">

                    <Button className="homeButton calcButton" variant="primary" onClick={() => goToCalcPage()}>
                        <FontAwesomeIcon icon={faCirclePlus}/>

                    </Button>{' '}
                    <Button className="homeButton listButton" variant="primary" onClick={() =>
                        fetchFoodRefList().then(foodRefs => {
                            setState({
                                pageState: page.FOODLIST,
                                foodRefList: foodRefs,
                                foodChosen: defaultFoodRefChosen
                            })
                        }).catch(err => {
                            setState({
                                pageState: page.LOADING_CALCULATE_PAGE,
                                foodRefList: state.foodRefList,
                                foodChosen: defaultFoodRefChosen
                            });
                        }) // I think this catch is useless
                    }>
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </Button>{' '}
                    <Button className="homeButton journalLogButton" variant="primary" onClick={() => {
                        var today = new Date();
                        fetchFoodJournalLog(today).then(journalLog => {
                            setState({
                                pageState: page.JOURNAL_LOG,
                                foodRefList: state.foodRefList,
                                foodChosen: defaultFoodRefChosen,
                                journalLog: journalLog,
                                journalDay: today
                            })
                        }).catch(err => {
                            setState({
                                pageState: page.LOADING_FOOD_JOURNAL_LOG_PAGE,
                                foodRefList: state.foodRefList,
                                foodChosen: defaultFoodRefChosen
                            });
                        });// I think this catch is useless
                    }
                    }>
                        <FontAwesomeIcon icon={faBook}/>
                    </Button>{' '}
                    <Button className="homeButton addJournalEntryButton" variant="primary" onClick={() =>
                        setState({
                            pageState: page.HOME,
                            foodRefList: state.foodRefList,
                            foodChosen: defaultFoodRefChosen
                        })}>
                        <FontAwesomeIcon icon={faQuestion}/>
                    </Button>{' '}

                </div>
            </div>
        );
    } else {
        return (
            <div className="App">
                <div>
                    <Button className={"backBanner"}
                            variant="dark"
                            onClick={() => changePage(page.HOME)}
                    ><FontAwesomeIcon icon={faChevronLeft}/> Return Home</Button>
                </div>

                {(() => {
                    if (state.pageState === page.CALCULATE_PAGE) {
                        return (

                            <CalculatePage
                                foodChosen={state.foodChosen}
                                thoughts={""}
                                foodRefList={state.foodRefList}
                                resetCalcPage={() =>
                                    setState({
                                        pageState: page.CALCULATE_PAGE,
                                        foodRefList: state.foodRefList,
                                        foodChosen: defaultFoodRefChosen
                                    })
                                }
                                setFoodChosen={(foodChosenFromList) => setState({
                                    pageState: page.CALCULATE_PAGE,
                                    foodRefList: state.foodRefList,
                                    foodChosen: foodChosenFromList
                                })}
                            />
                        );
                    } else if (state.pageState === page.FOODLIST) {
                        return (
                            <FoodRefsManagementComponent onFoodRefChosen={onFoodChosen}
                                                         foodRefList={state.foodRefList}
                            />

                        );
                    } else if (state.pageState === page.JOURNAL_LOG) {

                        return (
                            <JournalLogComponent day={state.journalDay}
                                                 onNavigatingFoodJournalDay={onNavigatingFoodJournalDay}
                                                 goToCalcPage={() => goToCalcPage()}
                                                 foodEntries={state.journalLog}
                            />

                        );
                    }

                })()}
            </div>
        )
    }

}

export default App;
