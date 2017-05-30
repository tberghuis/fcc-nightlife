import React from 'react';
import { Link } from 'react-router';
// import { Menu } from 'semantic-ui-react';
import { Container, Table, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';

// import '../scss/club-list.css';

// map state dispatch
const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});


class SingleClub extends React.Component {


    render() {



        return (
            <div>single club</div>
        );
    }
}

// export default SingleClub;

export default connect(mapStateToProps, mapDispatchToProps)(SingleClub);
