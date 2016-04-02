import fetch from 'isomorphic-fetch';
import { routeActions } from 'react-router-redux';
import { fetchDestinations } from './dest/destActions';
import { clearFriends } from '../friend/friendActions';
import { clearTags } from '../tag/tagActions';
import { clearDestination, clearDestinations } from '../home/homeActions';
import { fetchFriends } from './tripOverview/travelFriendActions';
import cookie from 'react-cookie';
import { push } from 'react-router-redux';

export const SELECT_TRIP = 'SELECT_TRIP';

const selectTrip = trip => ({
  type: SELECT_TRIP,
  payload: {
    trip,
  },
});

export const deselectTrip = () => ({
  type: 'DESELECT_TRIP',
});

// Redux-Thunk Middleware (see configureStore.js) allows us to return a function that
// can dispatch other actions. In this case, we return a function that:
// (1) dispatches an action that updates the selectedTrip variable
// (2) dispatches another action to GET destinations for the selected trip

export const setTripAndGetDestinations = (trip, goNext, userId) =>
  dispatch => {
    dispatch(selectTrip(trip));
    dispatch(fetchDestinations(trip, goNext, userId));
    dispatch(fetchFriends(trip));
    // these dispatches clears the state after info is saved
    // in db and user can now create a new trip
    dispatch(clearFriends());
    dispatch(clearTags());
    dispatch(clearDestination());
    dispatch(clearDestinations());
  };

export const getAllTripInfo = (tripId, goNext, userId) =>
  dispatch => {
    const token = cookie.load('token');
    return fetch(`/api/trips/${tripId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token,
      },
    })
    .then(res => res.json())
    .then(trip => {
      dispatch(setTripAndGetDestinations(trip, goNext, userId));
    });
  };
