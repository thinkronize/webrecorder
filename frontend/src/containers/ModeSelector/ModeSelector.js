import React from 'react';
import { connect } from 'react-redux';

import { getActiveRemoteBrowser } from 'redux/selectors';

import { ModeSelector } from 'components/controls';


const mapStateToProps = (state) => {
  return {
    remoteBrowserSelected: getActiveRemoteBrowser(state)
  };
};

export default connect(
  mapStateToProps
)(ModeSelector);
