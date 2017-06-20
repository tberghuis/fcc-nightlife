import React from 'react';
import { Link } from 'react-router';
import { Modal, List, Button, Container, Table, Dimmer, Segment, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';

import axios from 'axios';
import {
    SINGLECLUB_GET,
    SINGLECLUB_GET_RESERVATIONS
} from '../constants/actionTypes';

import '../scss/single-club.css';

const mapStateToProps = state => ({
    data: state.singleClub.data,
    reservationList: state.singleClub.reservationList,
    loggedIn: state.auth.loggedIn
});

class SingleClub extends React.Component {

    componentWillMount() {
        // this.props.getSingleClubData(this.props.params.yelpId);
        this.getSingleClubData();
        this.getReservationList();
    }

    getSingleClubData = () => {
        const payload = axios.get('/api/yelp/' + this.props.params.yelpId);
        this.props.dispatch({ type: SINGLECLUB_GET, payload });
    }

    getReservationList = () => {
        axios.get('/api/reservation/' + this.props.params.yelpId)
            .then((res) => {
                console.log(res);
                //dispatch
                this.props.dispatch({ type: SINGLECLUB_GET_RESERVATIONS, usernames: res.data.usernames });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    addUserReservationList = () => {

        // console.log(this.props.data);
        // post yelpId to server
        axios.post('/api/reservation', { yelpId: this.props.data.yelpId })
            .then((res) => {
                console.log(res);
                this.getReservationList();
            })
            .catch((err) => {
                console.log(err);
            });
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
                    {this.props.reservationList.map((username)=>{
                        return <List.Item>{username}</List.Item>;
                    })}
                </List>
                {this.props.loggedIn &&
                    <Button onClick={this.addUserReservationList}>Add yourself to reservations</Button>
                }
                {!this.props.loggedIn &&
                    <p>Please Register/Login to add yourself to reservation list.</p>
                }
                <br />
                <img src={data.image_url} alt="" />
            </div>
        );
    }
}

//export default connect(mapStateToProps, mapDispatchToProps)(SingleClub);
export default connect(mapStateToProps)(SingleClub);
