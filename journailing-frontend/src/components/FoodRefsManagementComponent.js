import React, {Component} from 'react';
import "./FoodRefsManagementComponent.css"
import {page} from "../PageEnum";
import ListFoodRefComponent from "./ListFoodRefComponent";

class FoodRefsManagementComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            foodRefList: [],
            pageState: page.FOODLIST,
            foodChosenIdx: 0
        }
    }

    render() {

        if (this.state.pageState === page.FOODLIST) {
            return (

                <div className={"listFoodRefContainer"}>
                    <ListFoodRefComponent foodRefList={this.props.foodRefList}
                                          onFoodRefChosen={this.props.onFoodRefChosen}

                    />
                </div>

            );
        }

    }


}

export default FoodRefsManagementComponent;