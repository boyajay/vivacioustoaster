import { TOGGLE_TAG } from './tagActions';
import Immutable from 'immutable';

const initialState = Immutable.Map({
  tags: Immutable.Map({
    Romance: false,
    Thrill: false,
    Relaxation: false,
    Food: false,
    Family: false,
    Outdoor: false,
    Culture: false,
    Landmarks: false,
  }),
  events: null,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_TAG':
      return state.setIn(['tags', action.payload.tag], !state.getIn(['tags', action.payload.tag]));
    case 'RECEIVE_EVENTS':
      return state.set('events', action.payload.events);
    default:
      return state;
  }
};
