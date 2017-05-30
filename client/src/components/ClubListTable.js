import React from 'react';
import { Link } from 'react-router';
// import { Menu } from 'semantic-ui-react';
import { Container, Table, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';

import '../scss/club-list.css';

// map state dispatch
const mapStateToProps = state => ({
    data: state.clubList.data,
    loading: state.clubList.loading
});

const mapDispatchToProps = dispatch => ({

});


class ClubListTable extends React.Component {


    handleClickClub = (yelpId) => () => {
        console.log(yelpId);
    }


    render() {


        if (this.props.loading) {
            // return <div>loading...</div>;
            return (
                <Dimmer active>
                    <Loader />
                </Dimmer>
            );
        }

        if (this.props.data.length === 0) {
            return <div></div>;

        }


        return (
            <Container className="club-list">
                <Table unstackable singleLine selectable style={{marginTop:'20px'}}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={2}>No Reservations</Table.HeaderCell>
                            <Table.HeaderCell width={7}>Club Name</Table.HeaderCell>
                            <Table.HeaderCell width={7}>Address</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body className="hover-pointer">
                        {this.props.data.map((club) => {
                            console.log('club', club);
                            return (
                                <Table.Row key={club.yelpId}
                                    onClick={this.handleClickClub(club.yelpId)}
                                >
                                    <Table.Cell>1</Table.Cell>
                                    <Table.Cell>
                                        {club.name}
                                    </Table.Cell>
                                    <Table.Cell>{club.address}</Table.Cell>
                                </Table.Row>
                            );
                        })}

                    </Table.Body>
                </Table>

            </Container>
        );
    }
}

// export default ClubListTable;

export default connect(mapStateToProps, mapDispatchToProps)(ClubListTable);
