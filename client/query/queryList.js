import React from 'react';
import QueryItem from './queryItem';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import { Link } from 'react-router';
import { save, toggleEvent, nextQuery, updateEvents, reset, startLoad, endLoad }
  from './queryActions';
import { Map } from 'immutable';
import List from 'material-ui/lib/lists/list';
import _ from 'lodash';
import { push } from 'react-router-redux';
import { clearDest } from '../tripPlan/dest/destActions';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';

const mapStateToProps = state => ({
  destinations: state.home.get('destinations'),
  tripType: state.home.get('tripType'),
  friends: state.friend.get('friends').filter(friend =>
    friend.addedToTrip),
  events: state.query.get('events'),
  trip: state.tripPlan.selectedTrip,
  dest: state.tripPlan.dest.get('destinations'),
  currPage: state.query.get('currPage'),
  destId: state.tripPlan.dest.get('key'),
  loading: state.query.get('loadingTrip'),
  user: state.auth.get('user'),
});

const mapDispatchToProps = dispatch => ({
  onClickSave: (destinations, tripType, friends, events, goNext, user) =>
    dispatch(save(destinations, tripType, friends, events, goNext, user)),
  onClickToggle: event => dispatch(toggleEvent(event)),
  onClickUpdate: (events, trip, goNext, destId) => dispatch(updateEvents(events, trip, goNext, destId)),// eslint-disable-line
  onNextQuery: () => {
    dispatch(nextQuery());
    window.scrollTo(0, 0);
  },
  goNext: name => dispatch(push(name)),
  onClickReset: () => dispatch(reset()),
  goStartLoad: () => dispatch(startLoad()),
  goEndLoad: () => dispatch(endLoad()),
});

let QueryList = ({ destinations, tripType, onClickSave, friends, events, onClickToggle, currPage, onNextQuery, onNextEvents, goNext, trip, onClickUpdate, dest, currEvents, destId, onClickReset, loading, goEndLoad, goStartLoad, user }) => ( // eslint-disable-line
  <div>
    <img src="../assets/spinning-globe.gif"
      style={{
        position: 'fixed',
        height: '10%',
        top: '42.5%',
        left: '48%',
        visibility: loading ? 'visible' : 'hidden',
        zIndex: '1',
        backgroundColor: 'transparent',
      }}
    />
    <Card style={{
      width: '60%',
      margin: '5% 20%',
      visibility: loading ? 'hidden' : 'visible',
      padding: '1.5%',
    }}
    >
      <CardHeader
        title={destinations.getIn([currPage, 'location'])}
        subtitle = {'Choose the places you want to go!'}
      />
        <List style={ { visibility: loading ? 'hidden' : 'visible' } }>
          { events[currPage].map(event =>
            <QueryItem key={ event.id } { ...event }
              eventToggle={ () => onClickToggle(event) }
              style={{
                visibility: loading ? 'hidden' : 'visible',
              }}
            />
          )}
      </List>
      <Link to="tag">
        <RaisedButton label="Back" style={ { marginTop: '16px' } } />
      </Link>
      <RaisedButton secondary
        label="Next"
        style={ { float: 'right', marginTop: '16px' } }
        onMouseDown={ () => {
          if (trip.id === undefined) {
            onNextQuery();
            if (currPage === destinations.length - 1) {
              goStartLoad();
              onClickSave(destinations, tripType, friends, events, goNext, user);
              onClickReset();
            }
          } else {
            goStartLoad();
            onClickUpdate(events, dest, goNext, destId);
          }
          setTimeout(goEndLoad, 4000);
        }}
      />
    </Card>
  </div>
);

QueryList.propTypes = {
  destinations: React.PropTypes.array,
  tripType: React.PropTypes.string,
  friends: React.PropTypes.array,
  onClickSave: React.PropTypes.func,
  onClickToggle: React.PropTypes.func,
  events: React.PropTypes.array,
  trip: React.PropTypes.object,
  onClickUpdate: React.PropTypes.func,
  dest: React.PropTypes.array,
  currPage: React.PropTypes.number,
  onNextQuery: React.PropTypes.func,
  goNext: React.PropTypes.func,
  destId: React.PropTypes.number,
  onClickReset: React.PropTypes.func,
  goStartLoad: React.PropTypes.func,
  goEndLoad: React.PropTypes.func,
  loading: React.PropTypes.bool,
  user: React.PropTypes.object,
};

QueryList = connect(mapStateToProps, mapDispatchToProps)(QueryList);
export default QueryList;
