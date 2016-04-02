import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import auth from '../auth/authReducers';
import friend from '../friend/friendReducers';
import home from '../home/homeReducers';
import query from '../query/queryReducers';
import tag from '../tag/tagReducers';
import trip from '../trip/tripReducers';
import dest from '../tripPlan/dest/destReducers';
import event from '../tripPlan/event/eventReducers';
import tripPlan from '../tripPlan/tripPlanReducers';

const rootReducer = combineReducers({
  auth,
  friend,
  home,
  query,
  tag,
  trip,
  tripPlan,
  routing: routerReducer,
});

export default rootReducer;
