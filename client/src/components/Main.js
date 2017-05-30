import React from 'react';
// import { Link } from 'react-router';
import { Container, Form, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import agent from '../agent';
import ClubListTable from './ClubListTable';
import {
    YELP_SEARCH
} from '../constants/actionTypes';

const DivCentered = styled(Container) `
    text-align: center;
    margin-top: 30px;
`;

const DivA = styled.div`
    text-align: center;
    margin-top: 30px;
`;

const InputB = styled.input`
    text-align: center !important;
`;

const Button01 = styled(Button) `
    margin-top: 15px !important;
`;

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    yelpSearch: searchText => dispatch({
        type: YELP_SEARCH,
        payload: agent.Yelp.search(searchText)
    })
});



class Main extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    handleSubmit = (event) => {
        event.preventDefault();
        // console.log('input.value', this.input.value);
        this.props.yelpSearch(this.input.value);
    }

    render() {
        return (
            <div>
                <DivCentered text>
                    <Form onSubmit={this.handleSubmit}>
                        <h1>Welcome to the Nightlife Coordination App</h1>
                        <h2>Where are you heading out tonight?</h2>
                        <DivA className="ui fluid input">
                            <InputB
                                innerRef={(input) => this.input = input}
                                placeholder="Enter City or Address..." />
                        </DivA>
                        <Button01 type='submit'>Search</Button01>
                    </Form>
                </DivCentered>
                <ClubListTable></ClubListTable>
            </div>
        );
    }
}

// export default Main;
export default connect(mapStateToProps, mapDispatchToProps)(Main);
