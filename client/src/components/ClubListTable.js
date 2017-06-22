import React from "react";
import { Container, Table, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";

import "../scss/club-list.css";

const mapStateToProps = state => ({
  data: state.clubList.data,
  loading: state.clubList.loading
});

class ClubListTable extends React.Component {
  handleClickClub = yelpId => () => {
    browserHistory.push("/club/" + yelpId);
  };

  render() {
    if (this.props.loading) {
      return <Loader active />;
    }
    if (this.props.data.length === 0) {
      return <div />;
    }
    return (
      <Container className="club-list">
        <Table unstackable singleLine selectable style={{ marginTop: "20px" }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={2}>No Reservations</Table.HeaderCell>
              <Table.HeaderCell width={7}>Club Name</Table.HeaderCell>
              <Table.HeaderCell width={7}>Address</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body className="hover-pointer">
            {this.props.data.map(club => {
              console.log("club", club);
              return (
                <Table.Row
                  key={club.yelpId}
                  onClick={this.handleClickClub(club.yelpId)}
                >
                  <Table.Cell>{club.noReservations}</Table.Cell>
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

export default connect(mapStateToProps)(ClubListTable);
