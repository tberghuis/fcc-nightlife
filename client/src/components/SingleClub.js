import React from 'react';
import { Link } from 'react-router';
// import { Menu } from 'semantic-ui-react';
import { Container, Table, Dimmer, Segment, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';

import agent from '../agent';
import {
    SINGLECLUB_GET
} from '../constants/actionTypes';

// import '../scss/single-club.css';

// map state dispatch
const mapStateToProps = state => ({
    data: state.singleClub.data

});

const mapDispatchToProps = dispatch => ({
    // getPoll: (id) => {
    //     const payload = agent.Polls.get(id);
    //     dispatch({ type: GET_POLL, payload });
    // }
    getSingleClubData: (yelpId) => {
        const payload = agent.requests.get('/yelp/' + yelpId);
        dispatch({ type: SINGLECLUB_GET, payload });
    }
});

// access to param...
// learn from my past project


class SingleClub extends React.Component {


    componentWillMount() {
        //
        this.props.getSingleClubData(this.props.params.yelpId);
    }

    render() {

        console.log(this.props.params.yelpId);

        if (!this.props.data) {
            return (
                
                    <Loader active/>
                
            );
        }

        return (
            <div>single club
                {this.props.data.name}
            </div>
        );
    }
}

// export default SingleClub;

export default connect(mapStateToProps, mapDispatchToProps)(SingleClub);
