import React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui';
import { changeTripType } from './homeActions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  onTripTypeChange: tripType => dispatch(changeTripType(tripType)),
});

let TripTypeList = ({ onTripTypeChange }) => (
  <div style={ { width: '90%', margin: '3% 20%' } }>
    <RadioButtonGroup defaultSelected="Group" onChange={(event, tripType) => {
      onTripTypeChange(tripType);
    }}
    >
      <RadioButton label="Group" value="Group" />
      <RadioButton label="Solo" value="Solo" />
    </RadioButtonGroup>
  </div>
);

TripTypeList.propTypes = {
  onTripTypeChange: React.PropTypes.func.isRequired,
};

TripTypeList = connect(null, mapDispatchToProps)(TripTypeList);
export default TripTypeList;
