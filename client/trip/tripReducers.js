import Immutable from 'immutable';
import { REQUEST_TRIPS, RECEIVE_TRIPS, FETCH_TRIP_FAILURE } from './tripActions';

const initialState = Immutable.Map({
  isFetching: false,
  trips: Immutable.List(),
});

const trip = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const trips = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_TRIPS:
      return state.set('isFetching', true);
    case RECEIVE_TRIPS:
      state = state.set('isFetching', false);
      return state.set('trips', action.payload.trips);
    case FETCH_TRIP_FAILURE:
      // return state.set('')
    default:
      return state;
  }
};

export default trips;
