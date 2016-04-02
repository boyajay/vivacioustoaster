import Immutable from 'immutable';

const initialState = Immutable.Map({
  travelFriends: Immutable.List([]),
  showList: false,
});

const travelFriends = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_FRIENDS_IN_TRIP':
      return state.set('travelFriends', action.payload.friends);
    case 'TOGGLE_LIST':
      return state.set('showList', !state.get('showList'));
    default:
      return state;
  }
};

export default travelFriends;
