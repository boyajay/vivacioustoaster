import React from 'react';
import Card from 'material-ui/lib/card/card';
import { setTripAndGetDestinations } from '../tripPlan/tripPlanActions';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Moment from 'moment';

const TripItem = ({ key, name, tripType, destinations, users }) => (
  <Card style={{ width: '50%', margin: '5%' }}>
    <ListItem primaryText="Add more friends" className="addFriendsButton"
      leftAvatar={<Avatar src={'../../assets/add.png'}
        style={{ width: '1em', height: '1em', marginTop: '7px' }}
      />}
      style={{ marginBottom:'-10px' }}
      onClick={ () => startSetTripAndGetDestinations(key)}
    />
    <CardHeader
      style={ { marginTop: '-15px', marginBottom: '-10px' }}
    >
      {users.map(user =>
        <FlatButton label={user.name} />
      )}
    </CardHeader>
    <CardMedia
      onClick={}
      overlay={<CardTitle title={name} />}
    >
      <img src="http://lorempixel.com/600/337/nature/" />
    </CardMedia>
    <CardTitle title="Destinations" />
    <CardText>
      {destinations.map(destination =>
        <FlatButton label={`${destination.location}:
          ${Moment(destination.startDate).format('MM/DD/YYYY')} -
          ${Moment(destination.endDate).format('MM/DD/YYYY')}`}
        />
      )}
    </CardText>
  </Card>
);

FriendList.propTypes = {
  friends: React.PropTypes.object.isRequired,
  onFriendClick: React.PropTypes.func.isRequired,
};

FriendList = connect(mapStateToProps, mapDispatchToProps)(FriendList);


TripItem.propTypes = {
  key: React.PropTypes.number,
  name: React.PropTypes.string.isRequired,
  tripType: React.PropTypes.string.isRequired,
  destinations: React.PropTypes.array.isRequired,
  users: React.PropTypes.array.isRequired,
};

export default TripItem;
