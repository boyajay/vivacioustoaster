import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import FriendItem from './friendItem';
import { toggleAddFriend } from './friendActions';
import List from 'material-ui/lib/lists/list';
import { Link } from 'react-router';
import { RaisedButton } from 'material-ui';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';


const mapStateToProps = state => ({ friends: state.friend.get('friends') });

const mapDispatchToProps = dispatch => ({
  onFriendClick: id => dispatch(toggleAddFriend(id)),
});

let FriendList = ({ friends, onFriendClick }) => (
  <div>
    <Card style={ { width: '60%', margin: '5% 20%', padding: '1.5%' } }>
      <CardHeader
        title={
          friends.length ? 'Choose the friends you want to travel with!' :
          'You have no friends using Voyager :( Invite them to join, or travel solo!'
        }
      />
      <List>
        {friends.map(friend =>
          <FriendItem key={ friend.id } {...friend} onClick={() => onFriendClick(friend.id)} />
        )}
      </List>
      <Link to="home">
        <RaisedButton label="Back" style={{ marginTop: '16px' }} />
      </Link>
      <Link to="tag">
        <RaisedButton secondary label="Next" style={ { float: 'right', marginTop: '16px' } } />
      </Link>
    </Card>
  </div>
);

FriendList.propTypes = {
  friends: React.PropTypes.object.isRequired,
  onFriendClick: React.PropTypes.func.isRequired,
};

FriendList = connect(mapStateToProps, mapDispatchToProps)(FriendList);

export default FriendList;
