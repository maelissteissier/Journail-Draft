import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBook, faCalculator, faCirclePlus, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import React, {useState} from "react";
import CalculatePage from "./CalculatePage";
import ListFoodRefPage from "./ListFoodRefPage";
import {page} from "./PageEnum";
import JournalLog from "./JournalLog";


function App() {
    const [state, setState] = useState({pageState: page.HOME});
    if (state.pageState === page.HOME) {
        return (
            <div className="App">
                <div className="App-header-home">

                    <Button className="homeButton calcButton" variant="primary" onClick={() =>
                        setState({
                            pageState: page.CALCULATE_PAGE
                        })}>
                        <FontAwesomeIcon icon={faCalculator}/>
                    </Button>{' '}
                    <Button className="homeButton listButton" variant="primary" onClick={() =>
                        setState({
                            pageState: page.FOODLIST
                        })}>
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </Button>{' '}
                    <Button className="homeButton journalLogButton" variant="primary" onClick={() =>
                        setState({
                            pageState: page.JOURNAL_LOG
                        })}>
                        <FontAwesomeIcon icon={faBook}/>
                    </Button>{' '}
                    <Button className="homeButton addJournalEntryButton" variant="primary" onClick={() =>
                        setState({
                            pageState: page.FOODLIST
                        })}>
                        <FontAwesomeIcon icon={faCirclePlus}/>
                    </Button>{' '}

                </div>
            </div>
        );
    } else if (state.pageState === page.CALCULATE_PAGE) {
        return (
            <div className="App">
                <CalculatePage foodChosen={{name: "", original_quantity: 0, original_calory: 0}}/>
            </div>
        );
    } else if (state.pageState === page.FOODLIST) {
        return (
            <div className="App">
                <header className="App-header">
                    <ListFoodRefPage/>
                </header>
            </div>
        );
    } else if (state.pageState === page.JOURNAL_LOG) {
        return (
            <div className="App">
                <header className="App-header">
                    <JournalLog day={new Date()}/>
                </header>
            </div>
        );
    }
}

export default App;
