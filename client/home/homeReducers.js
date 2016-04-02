import Immutable from 'immutable';
import { CHANGE_STARTDATE, CHANGE_ENDDATE, CHANGE_DESTINATION, CHANGE_TRIPTYPE }
from './homeActions';

const initialState = Immutable.Map({
  destinations: Immutable.List(),
  destination: Immutable.Map({
    location: null,
    startDate: null,
    endDate: null,
  }),
  tripType: 'Group',
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_STARTDATE':
      return state.setIn(['destination', 'startDate'], action.payload.date);
    case 'CHANGE_ENDDATE':
      return state.setIn(['destination', 'endDate'], action.payload.date);
    case 'CHANGE_DESTINATION':
      return state.setIn(['destination', 'location'], action.payload.value);
    case 'CHANGE_TRIPTYPE':
      return state.set('tripType', action.payload.tripType);
    case 'ADD_DESTINATION':
      const oldDests = state.get('destinations');
      const updatedDests = oldDests.push(state.get('destination'));
      return state.set('destinations', updatedDests);
    case 'CLEAR_DESTINATION':
      state = state.setIn(['destination', 'location'], null);
      state = state.setIn(['destination', 'startDate'], null);
      state = state.setIn(['destination', 'endDate'], null);
      return state;
    case 'CLEAR_DESTINATIONS':
      state = state.set('tripType', 'Group');
      return state.set('destinations', Immutable.List());
    default:
      return state;
  }
};
