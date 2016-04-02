import Immutable from 'immutable';
import { REQUEST_DESTINATIONS, RECEIVE_DESTINATIONS,
FETCH_DEST_FAILURE } from './destActions';

const initialState = Immutable.Map({
  isFetching: false,
  destinations: Immutable.List(),
  key: null,
});

// not using this yet, but if we add sorting or filtering, we'll need it
const destination = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const destinations = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_DESTINATIONS:
      return state.set('isFetching', true);
    case RECEIVE_DESTINATIONS:
      state = state.set('isFetching', false);
      return state.set('destinations', action.payload.destinations);
    case 'CHOOSE_DEST':
      return state.set('key', action.payload.key);
    case 'CLEAR_ALL':
      state = state.set('destinations', Immutable.List());
      state = state.set('key', null);
      return state;
    case FETCH_DEST_FAILURE:
      // return state.set('')
    default:
      return state;
  }
};

export default destinations;
