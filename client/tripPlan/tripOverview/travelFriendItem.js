import React from 'react';
import Avatar from 'material-ui/lib/avatar';

const TravelFriendItem = ({ key, name, picUrl }) => (
  <div className="tooltip">
    <Avatar
      src={picUrl}
      children={<span className="tooltip-text">{name}</span>}
    />
  </div>
);

TravelFriendItem.propTypes = {
  key: React.PropTypes.number,
  name: React.PropTypes.string.isRequired,
  picUrl: React.PropTypes.string.isRequired,
};

export default TravelFriendItem;
