import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBook, faCalculator, faCirclePlus, faMagnifyingGlass, faRectangleList} from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import React, {useState} from "react";
import CalculatePage from "./CalculatePage";
import ListFoodRefPage from "./ListFoodRefPage";


function App() {
    const [state, setState] = useState({pageState: 'homePage'});
    if (state.pageState === "homePage") {
        return (
            <div className="App">
                <div className="App-header-home">

                    <Button className="homeButton calcButton" variant="primary" onClick={() =>
                        setState({
                            pageState: 'calculatePage'
                        })}>
                        <FontAwesomeIcon icon={faCalculator}/>
                    </Button>{' '}
                    <Button className="homeButton listButton" variant="primary" onClick={() =>
                        setState({
                            pageState: 'foodRefList'
                        })}>
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </Button>{' '}
                    <Button className="homeButton journalLogButton" variant="primary" onClick={() =>
                        setState({
                            pageState: 'foodRefList'
                        })}>
                        <FontAwesomeIcon icon={faBook} />
                    </Button>{' '}
                    <Button className="homeButton addJournalEntryButton" variant="primary" onClick={() =>
                        setState({
                            pageState: 'foodRefList'
                        })}>
                        <FontAwesomeIcon icon={faCirclePlus} />
                    </Button>{' '}

                </div>
            </div>
        );
    } else if (state.pageState === "calculatePage") {
        return (
            <div className="App">
                <header className="App-header">
                    <CalculatePage foodChosen={{original_quantity: 100, original_calory: 50}}/>
                </header>
            </div>
        );
    } else if (state.pageState === "foodRefList") {
        return (
            <div className="App">
                <header className="App-header">
                    <ListFoodRefPage/>
                </header>
            </div>
        );
    }

}

export default App;
