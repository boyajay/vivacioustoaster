import React from 'react';
import { connect } from 'react-redux';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import Avatar from 'material-ui/lib/avatar';
import TravelFriendItem from './travelFriendItem';
import FriendItem from '../../friend/friendItem';
import ContentAddCircle
from 'material-ui/lib/svg-icons/content/add-circle';
import ContentRemoveCircle
from 'material-ui/lib/svg-icons/content/remove-circle';
import { RaisedButton } from 'material-ui';
import { toggleList } from './travelFriendActions';
import { addFriends } from './travelFriendActions';
import { toggleAddFriend } from '../../friend/friendActions';

const mapStateToProps = state => ({
  travelFriends: state.tripPlan.tripOverview.get('travelFriends'),
  trip: state.tripPlan.selectedTrip,
  friends: state.friend.get('friends'),
  addedFriends: state.friend.get('friends').filter(friend => friend.addedToTrip),
  listToggle: state.tripPlan.tripOverview.get('showList'),
});

const mapDispatchToProps = dispatch => ({
  onClickToggleList: () => dispatch(toggleList()),
  onFriendClick: id => dispatch(toggleAddFriend(id)),
  onClickAddFriends: (friends, trip) => dispatch(addFriends(friends, trip)),
});

let TravelFriendList = ({ travelFriends, friends, listToggle, onClickToggleList, onFriendClick, addedFriends, trip, onClickAddFriends }) => ( // eslint-disable-line
  <Card>
    <CardText>
      <strong>Who is Going?</strong>
    </CardText>
    <div className="friendsRow">
      {travelFriends.map(friend =>
        <TravelFriendItem key={ friend.id } {...friend} />
      )}
    </div>

    <Card>
      <CardHeader
        title={listToggle ? 'Hide List' : 'Add More Friends!'}
        actAsExpander
        showExpandableButton
        avatar={listToggle ?
          <ContentRemoveCircle
            color="#00bcd4"
            hoverColor="red"
          /> :
          <ContentAddCircle
            color="#00bcd4"
            hoverColor="green"
          />
        }
        onClick={() => onClickToggleList()}
      />
      <CardActions expandable>
        { friends.filter(friend => {
          let needsInvite = true;
          travelFriends.forEach(travelFriend => {
            if (travelFriend.name === friend.name) {
              needsInvite = false;
            }
          });
          return needsInvite;
        })
        .map(friend =>
          <FriendItem className="friendsItems"
            key={ friend.id } {...friend}
            onClick={ () => onFriendClick(friend.id) }
          />)
        }
        <RaisedButton
          secondary label="Add Friends"
          onClick={ () => onClickAddFriends(addedFriends, trip.id) }
          style = { { margin: '8px' } }
        />
      </CardActions>
    </Card>
  </Card>
);

TravelFriendList.propTypes = {
  travelFriends: React.PropTypes.object.isRequired,
  friends: React.PropTypes.object.isRequired,
  addedFriends: React.PropTypes.object.isRequired,
  trip: React.PropTypes.object.isRequired,
  listToggle: React.PropTypes.bool.isRequired,
  onClickToggleList: React.PropTypes.func.isRequired,
  onFriendClick: React.PropTypes.func.isRequired,
  onClickAddFriends: React.PropTypes.func.isRequired,
};

TravelFriendList = connect(mapStateToProps, mapDispatchToProps)(TravelFriendList);


export default TravelFriendList;
