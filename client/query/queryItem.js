import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

const QueryItem = ({ key, icon, name, address, rating, eventToggle, addedToDest }) => (
  <Card style={ { width: '90%', margin: '0% 5%' } }>
    <CardHeader
      title={name}
      subtitle={'Rating: ' + rating || 'Not Available'} // eslint-disable-line
      avatar={icon}
      onClick={eventToggle}
      style={{
        backgroundColor: addedToDest ? 'lightgrey' : 'white',
      }}
    />
    <CardText
      style={{
        color: 'rgba(0, 0, 0, 0.54)',
        backgroundColor: addedToDest ? 'lightgrey' : 'white',
      }}
    >
      {address}
    </CardText>
  </Card>
);


QueryItem.propTypes = {
  key: React.PropTypes.string,
  icon: React.PropTypes.string,
  name: React.PropTypes.string,
  address: React.PropTypes.string,
  rating: React.PropTypes.number,
  eventToggle: React.PropTypes.func,
  addedToDest: React.PropTypes.bool,
};

export default QueryItem;
