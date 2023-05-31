import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import "./ListFoodRefPage.css"
import CalculatePage from "./CalculatePage";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {page} from "./PageEnum";
import App from "./App";

class ListFoodRefPage extends Component {
    constructor() {
        super()
        this.state = {
            foodRefList: [],
            pageState: page.LOADING,
            foodChosenIdx: 0
        }
    }

    async componentDidMount() {
        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/foodrefs`;
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/foodrefs`);

            if (!response.ok) {
                throw new Error('Failed to fetch FoodRefs');
            }

            const foodRefs = await response.json();
            console.log('FoodRefs:', foodRefs);
            this.setState({foodRefList: foodRefs, pageState: page.FOODLIST})
        } catch (error) {
            console.error('Error fetching FoodRefs:', error);
        }
    }


    render() {
        var table = [];

        for (let i = 0; i < this.state.foodRefList.length; i++) {
            table.push(
                <tr onClick={() => {
                    this.setState({pageState: page.CALCULATE_PAGE, foodChosenIdx: i})
                }}>
                    <td className={"tableLeft"}>{this.state.foodRefList[i].name}</td>
                    <td>{this.state.foodRefList[i].original_quantity}</td>
                    <td className={"tableRight"}>{this.state.foodRefList[i].original_calory}</td>
                </tr>);
        }

        if (this.state.pageState === page.FOODLIST) {
            return (
                <div>
                    <Button className={"backBanner"}
                            variant="dark"
                            onClick={() => {
                                this.setState({pageState: page.HOME})
                            }}
                    ><FontAwesomeIcon icon={faChevronLeft}/> Return Home</Button>
                    <div className={"listFoodRefContainer"}>
                        <Table striped="columns" className={"tableFood"}>
                            <thead>
                            <tr className={"tableHead"}>
                                <th className={"tableLeft"}>Aliment</th>
                                <th className={"tableMidle"}>Quantité Référence</th>
                                <th className={"tableRight"}>Calories Référence</th>
                            </tr>
                            </thead>
                            {
                                table
                            }
                        </Table>
                    </div>
                </div>);
        } else if (this.state.pageState === page.CALCULATE_PAGE) {
            return (
                <CalculatePage foodChosen={this.state.foodRefList[this.state.foodChosenIdx]}/>
            );
        } else if (this.state.pageState === page.LOADING) {
            return (<div>Loading...</div>);
        } else if (this.state.pageState === page.HOME) {
            return (<App/>);
        }

    }


}

export default ListFoodRefPage;