export const toggleAddFriend = id => ({
  type: 'TOGGLE_ADD_FRIEND',
  payload: {
    id,
  },
});

export const clearFriends = () => ({
  type: 'CLEAR_FRIENDS',
});

export const addFriends = friends => ({
  type: 'ADD_FRIENDS',
  payload: friends,
});
