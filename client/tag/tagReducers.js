import { TOGGLE_TAG } from './tagActions';
import Immutable from 'immutable';

const initialState = Immutable.Map({
  tags: Immutable.List([
    {
      name: 'Romance',
      img: '../assets/romance.jpg',
      addedToTrip: false,
    },
    {
      name: 'Relaxation',
      img: '../assets/relaxation.jpg',
      addedToTrip: false,
    },
    {
      name: 'Food',
      img: '../assets/food.jpg',
      addedToTrip: false,
    },
    {
      name: 'Family',
      img: '../assets/family.jpg',
      addedToTrip: false,
    },
    {
      name: 'Outdoor',
      img: '../assets/outdoor.jpg',
      addedToTrip: false,
    },
    {
      name: 'Culture',
      img: '../assets/culture.jpg',
      addedToTrip: false,
    },
    {
      name: 'Nightlife',
      img: '../assets/nightlife.jpg',
      addedToTrip: false,
    },
    {
      name: 'Shopping',
      img: '../assets/shopping.jpg',
      addedToTrip: false,
    },
  ]),
  loadingEvents: false,
});

const tag = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_TAG':
      if (state.name !== action.payload.tagName) {
        return state;
      }
      return Object.assign({}, state, {
        addedToTrip: !state.addedToTrip,
      });
    case 'CLEAR_TAGS':
      return Object.assign({}, state, {
        addedToTrip: false,
      });
    default:
      return state;
  }
};

const tags = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_TAG':
      const oldTags = state.get('tags');
      const updatedTags = oldTags.map(t => tag(t, action));
      return state.set('tags', updatedTags);
    case 'CLEAR_TAGS':
      const Tags = state.get('tags');
      const clearedTags = Tags.map(t => tag(t, action));
      return state.set('tags', clearedTags);
    case 'START_LOAD':
      return state.set('loadingEvents', true);
      // console.log('STARTLOAD STATE IS NOW', state);
      // return state;
    case 'END_LOAD':
      return state.set('loadingEvents', false);
    default:
      return state;
  }
};

export default tags;
