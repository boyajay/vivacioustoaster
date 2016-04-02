import fetch from 'isomorphic-fetch';
import { routeActions } from 'react-router-redux';
import cookie from 'react-cookie';
import Promise from 'bluebird';
import { fetchEvents } from '../event/eventActions';

export const REQUEST_DESTINATIONS = 'REQUEST_DESTINATIONS';
export const RECEIVE_DESTINATIONS = 'RECEIVE_DESTINATIONS';
export const FETCH_DEST_FAILURE = 'FETCH_DEST_FAILURE';

const requestDestinations = () => ({
  type: REQUEST_DESTINATIONS,
});

const receiveDestinations = destinations => ({
  type: RECEIVE_DESTINATIONS,
  payload: {
    destinations,
  },
});

const fetchDestinationsError = message => ({
  type: FETCH_DEST_FAILURE,
  payload: {
    // TODO
  },
});

export const chooseDest = key => ({
  type: 'CHOOSE_DEST',
  payload: {
    key,
  },
});

export const clearAll = () => ({
  type: 'CLEAR_ALL',
});


// Redux-Thunk Middleware (see configureStore.js) allows us to return a function that
// can dispatch other actions. In this case, we return a function that:
// (1) dispatches an action that updates the isFetching boolean on the state
//     with the fact that we are making an API call
// (2) dispatches another action to GET destinations for the trip id
// (3) dispatches another action upon success to update destinations on state

export const fetchDestinations = (trip, goNext, userId) =>
  dispatch => {
    // update 'isFetching' state
    const token = cookie.load('token');
    dispatch(requestDestinations());
    return fetch(`/api/trips/${trip.id}/destinations`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token,
      },
    }).then(res => res.json())
      .then(destinations => {
        dispatch(receiveDestinations(destinations));
        Promise.all(destinations.map(destination =>
          dispatch(fetchEvents(destination, userId))))
          .then(() => goNext('/tripPlan'));
      })
      .catch(err => console.error(err)); // add proper error handling
  };
