import React from 'react';
import { connect } from 'react-redux';
import DestItem from './destItem';
import List from 'material-ui/lib/lists/list';

const mapStateToProps = state => ({
  destinations: state.tripPlan.dest.get('destinations'),
});

let DestList = ({ destinations }) => (
  <div>
    <List>
      {destinations.map((destination, destIdx) =>
        <DestItem
          destIdx={destIdx}
          key={ destination.id } {...destination}
        />
      )}
    </List>
  </div>
);

DestList.propTypes = {
  destinations: React.PropTypes.object.isRequired,
};

DestList = connect(mapStateToProps)(DestList);


export default DestList;
