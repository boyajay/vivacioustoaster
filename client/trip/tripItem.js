import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Moment from 'moment';

const TripItem = ({ key, name, tripType, destinations, users, goGetTripInfo }) => (
  <Card style={ { width: '90%', margin: '5% 5%' } }>
    <CardHeader>
      {users.map(user =>
        <FlatButton label={user.name} />
      )}
    </CardHeader>
    <CardMedia
      onClick={ goGetTripInfo }
      overlay={<CardTitle title={name} />}
    >
      <img src={ destinations[0].photoUrl || '../assets/abstract-large.jpg' }
        className="dest-item"
      />
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

TripItem.propTypes = {
  key: React.PropTypes.number,
  name: React.PropTypes.string.isRequired,
  tripType: React.PropTypes.string.isRequired,
  destinations: React.PropTypes.array.isRequired,
  users: React.PropTypes.array.isRequired,
  goGetTripInfo: React.PropTypes.func.isRequired,
};

export default TripItem;
