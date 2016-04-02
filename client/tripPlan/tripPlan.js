import React from 'react';

import DestList from './dest/destList';
import TripOverview from './tripOverview/tripOverview';

const TripPlan = () => (
  <div>
  <TripOverview />
  <DestList />
  </div>
);

export default TripPlan;
