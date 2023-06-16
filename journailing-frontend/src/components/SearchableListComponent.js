import React, {Component} from 'react';
import {Form} from "react-bootstrap";


class SearchableListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ""
        }
    }


    render() {
        return (
            <>
                <Form>
                    <Form.Group className="mb-3" controlId={this.props.formControlId}>
                        <Form.Control className={(() => {
                            let classProps = "";
                            this.props.formControlClasses.forEach(classname => {
                                classProps = classProps + " " + classname
                            });
                            return classProps;
                        })()}
                                      type="text"
                                      placeholder={this.props.placeholder}
                                      onChange={this.handleSearchChange}
                        />
                    </Form.Group>
                </Form>

                {this.props.listComponent}
            </>
        );

    }


}

export default SearchableListComponent;