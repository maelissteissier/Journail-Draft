import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import "./ListFoodRefComponent.css"

class ListFoodRefComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            foodChosenIdx: 0
        }
    }


    render() {
        var table = [];

        for (let i = 0; i < this.props.foodRefList.length; i++) {
            table.push(
                <tr key={this.props.foodRefList[i].name} onClick={() => this.props.onFoodRefChosen(this.props.foodRefList[i])}>
                    <td className={"tableLeft foodNameCell"}>{this.props.foodRefList[i].name}</td>
                    <td className={"tableCell qteRefCell"}> {this.props.foodRefList[i].original_quantity}</td>
                    <td className={"qteTypeCell"}>{this.props.foodRefList[i].quantity_type}</td>
                    <td className={"tableRight calRefCell"}>{this.props.foodRefList[i].original_calory}</td>
                </tr>);
        }

        return (

            <div className={"listFoodRefContainer"}>
                <Table striped="columns" className={"tableFood tableScroll"}>
                    <thead className={"theadScroll"}>
                    <tr className={"tableHead"}>
                        <th className={"tableLeft foodNameCell"}>Aliment</th>
                        <th className={"tableMidle qteRefCell"}>Qté. Réf</th>
                        <th className={"tableMidle qteTypeCell"}>Qté. Type</th>
                        <th className={"tableRight calRefCell"}>Cals. Réf.</th>
                    </tr>
                    </thead>
                    <tbody className={"tbodyScroll"}>
                    {
                        table
                    }
                    </tbody>
                </Table>
            </div>
        );


    }


}

export default ListFoodRefComponent;