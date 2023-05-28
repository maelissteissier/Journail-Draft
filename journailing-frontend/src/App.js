import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalculator } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import React, { useState } from "react";
import CalculatePage from "./CalculatePage";



function App() {
    const [state, setState] = useState({pageState:'homePage'});
    if (state.pageState === "homePage"){
          return (
            <div className="App">
              <header className="App-header">
                <p>
                    <Button className="homeButton" variant="primary" onClick={()=>
                        setState({pageState:'calculatePage'
                        })}>
                        <FontAwesomeIcon icon={faCalculator} />
                    </Button>{' '}
                </p>
              </header>
            </div>
          );
    } else if (state.pageState === "calculatePage"){
        return (
            <div className="App">
              <header className="App-header">
                <CalculatePage/>
              </header>
            </div>
          );
    }

}

export default App;
