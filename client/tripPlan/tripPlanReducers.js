import { combineReducers } from 'redux';
import { SELECT_TRIP } from './tripPlanActions';
import dest from './dest/destReducers';
import event from './event/eventReducers';
import vote from './vote/voteReducers';
import tripOverview from './tripOverview/travelFriendReducers';

const selectedTrip = (state = {}, action) => {
  switch (action.type) {
    case SELECT_TRIP:
      return action.payload.trip;
    case 'DESELECT_TRIP':
      return {};
    default:
      return state;
  }
};

// combines subordinate reducers active on the 'tripPlan' page
const tripPlanReducer = combineReducers({
  selectedTrip,
  dest,
  event,
  vote,
  tripOverview,
});

export default tripPlanReducer;
