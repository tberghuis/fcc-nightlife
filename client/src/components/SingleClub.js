import React from 'react';
import { Link } from 'react-router';
import { List, Button, Container, Table, Dimmer, Segment, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';

import axios from 'axios';
import {
    SINGLECLUB_GET
} from '../constants/actionTypes';

import '../scss/single-club.css';

const mapStateToProps = state => ({
    data: state.singleClub.data
});

const mapDispatchToProps = dispatch => ({
    getSingleClubData: (yelpId) => {
        const payload = axios.get('/api/yelp/'+yelpId);
        dispatch({ type: SINGLECLUB_GET, payload });
    }
});

class SingleClub extends React.Component {

    componentWillMount() {
        this.props.getSingleClubData(this.props.params.yelpId);
    }

    render() {
        if (!this.props.data) {
            return (
                <Loader active />
            );
        }

        let data = this.props.data;
        return (
            <div className="single-club">
                <h1>
                    {/* _blank https://mathiasbynens.github.io/rel-noopener/ */}
                    <a rel="noopener noreferrer" target="_blank" href={data.url}>{data.name}</a>
                </h1>
                <div>Rating: {data.rating} / 5</div>
                <div>{data.address}</div>
                <h3>
                    Reservation List
                </h3>

                <List>
                    <List.Item>1</List.Item>
                    <List.Item>2</List.Item>
                    <List.Item>3</List.Item>
                </List>

                <Button>Add yourself to reservations</Button>
                <img src={data.image_url} alt="" />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleClub);
