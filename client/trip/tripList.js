import React from 'react';
import { connect } from 'react-redux';
import Card from 'material-ui/lib/card/card';
import Immutable from 'immutable';
import TripItem from './tripItem';
import List from 'material-ui/lib/lists/list';
import { getAllTripInfo } from '../tripPlan/tripPlanActions';
import { push } from 'react-router-redux';

const mapStateToProps = state => ({
  trips: state.trip.get('trips'),
  user: state.auth.get('user'),
});

const mapDispatchToProps = dispatch => ({
  getTripInfo: (trip, goNext, user) => dispatch(getAllTripInfo(trip.id, goNext, user.id)),
  goNext: name => dispatch(push(name)),
});

let TripList = ({ trips, getTripInfo, goNext, user }) => (
  <div>
    <Card style={ { width: '60%', margin: '5% 20%' } }>
      <List>
        {trips.map(trip =>
          <TripItem key={ trip.id } {...trip}
            goGetTripInfo={() => getTripInfo(trip, goNext, user)}
          />
        )}
      </List>
    </Card>
  </div>
);

TripList.propTypes = {
  trips: React.PropTypes.object.isRequired,
  getTripInfo: React.PropTypes.func,
  goNext: React.PropTypes.func,
  user: React.PropTypes.object.isRequired,
};

TripList = connect(mapStateToProps, mapDispatchToProps)(TripList);

export default TripList;
