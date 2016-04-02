import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import ListItem from 'material-ui/lib/lists/list-item';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';

const FriendItem = ({ key, name, picUrl, addedToTrip, onClick }) => (
   <Card>
    <CardHeader
      title={name}
      avatar={picUrl}
      onClick={onClick}
      style={{
        backgroundColor: addedToTrip ? 'lightgrey' : 'white',
      }}
    />
  </Card>
);

FriendItem.propTypes = {
  key: React.PropTypes.number,
  name: React.PropTypes.string.isRequired,
  picUrl: React.PropTypes.string.isRequired,
  addedToTrip: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default FriendItem;
