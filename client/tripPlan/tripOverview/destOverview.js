import React from 'react';
import { connect } from 'react-redux';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';

const mapStateToProps = state => ({
  destinations: state.tripPlan.dest.get('destinations'),
});

let DestOverview = ({ destinations }) => (
  <Card>
    <CardText>
      <strong>Destinations: </strong>
      {
        destinations.map(destination => destination.location)
        .join(' ✈ ')
      }
    </CardText>
  </Card>
);

DestOverview.propTypes = {
  destinations: React.PropTypes.object.isRequired,
};

DestOverview = connect(mapStateToProps)(DestOverview);

export default DestOverview;
