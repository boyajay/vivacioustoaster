import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';

const receiveFriendsInTrip = friends => ({
  type: 'RECEIVE_FRIENDS_IN_TRIP',
  payload: {
    friends,
  },
});

export const fetchFriends = trip =>
  dispatch =>
    fetch(`/api/trips/${trip.id}/users`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then(friends => {
        dispatch(receiveFriendsInTrip(friends));
      })
      .catch(err => console.error(err));

export const toggleList = () => ({
  type: 'TOGGLE_LIST',
});

export const addFriends = (friends, tripId) =>
  dispatch => {
    const token = cookie.load('token');
    return fetch(`api/trips/${tripId}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify({
        friends,
      }),
    })
      .then(res => res.json())
      .then(trip => dispatch(fetchFriends(trip)))
      .catch(err => console.error(err));
  };
