import React from 'react';
import TravelFriendList from './travelFriendList';
import DestOverview from './destOverview';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';

const TripOverview = () => (
  <div>
    <Card style={ { width: '60%', margin: '2.5% 20%' } }>
      <CardTitle title="Let's Take Off!" style={{ textAlign: 'center' }} />
      <DestOverview />
      <TravelFriendList />
    </Card>
  </div>
);

export default TripOverview;
