import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import "./ListFoodRefPage.css"
import CalculatePage from "./CalculatePage";

class ListFoodRefPage extends Component {
    constructor() {
        super()
        this.state = {
            foodRefList: [],
            pageState: "loading",
            foodChosenIdx: 0
        }
    }

    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:5000/foodrefs');

            if (!response.ok) {
                throw new Error('Failed to fetch FoodRefs');
            }

            const foodRefs = await response.json();
            console.log('FoodRefs:', foodRefs);
            this.setState({foodRefList: foodRefs, pageState:"foodList"})
        } catch (error) {
            console.error('Error fetching FoodRefs:', error);
        }
    }


    render() {
        var table = [];

        for (let i = 0; i < this.state.foodRefList.length; i++) {
            table.push(
                <tr onClick={() => {
                    this.setState({pageState: "calculatePage", foodChosenIdx: i})
                }}>
                    <td className={"tableLeft"}>{this.state.foodRefList[i].name}</td>
                    <td>{this.state.foodRefList[i].original_quantity}</td>
                    <td className={"tableRight"}>{this.state.foodRefList[i].original_calory}</td>
                </tr>);
        }

        if (this.state.pageState === "foodList") {
            return (
                <Table striped="columns" className={"tableFood"}>
                    <thead>
                    <tr className={"tableHead"}>
                        <th className={"tableLeft"}>Aliment</th>
                        <th>Quantité Référence</th>
                        <th className={"tableRight"}>Calories Référence</th>
                    </tr>
                    </thead>
                    {
                        table
                    }
                </Table>);
        } else if (this.state.pageState === "calculatePage") {
            return (
                <CalculatePage foodChosen={this.state.foodRefList[this.state.foodChosenIdx]}/>
            );
        } else if (this.state.pageState === "loading"){
            return (<div>Loading...</div>);
        }

    }


}

export default ListFoodRefPage;