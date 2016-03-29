import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import TripItem from './tripItem';
import List from 'material-ui/lib/lists/list';
import { getAllTripInfo } from '../tripPlan/tripPlanActions';

const mapStateToProps = state => ({ trips: state.trip.get('trips') });
const mapDispatchToProps = dispatch => ({
  getTripInfo: trip => dispatch(getAllTripInfo(trip.id)),
});

let TripList = ({ trips, getTripInfo }) => (
  <div>
    <List>
      {trips.map(trip =>
        <TripItem key={ trip.id } {...trip} goGetTripInfo={() => getTripInfo(trip)} />
      )}
    </List>
  </div>
);

TripList.propTypes = {
  trips: React.PropTypes.object.isRequired,
  getTripInfo: React.PropTypes.func,
};

TripList = connect(mapStateToProps, mapDispatchToProps)(TripList);

export default TripList;
