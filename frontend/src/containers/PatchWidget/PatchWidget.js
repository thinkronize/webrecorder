import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRemoteArchiveStats } from 'redux/selectors';

import { PatchWidgetUI } from 'components/controls';


class PatchWidget extends Component {
  static propTypes = {
    params: PropTypes.object,
    stats: PropTypes.object
  };

  render() {
    const { params: { rec, ts }, stats } = this.props;

    return (
      <div className="input-group-btn patch-selector">
        <PatchWidgetUI
          toRecording={rec}
          timestamp={ts}
          stats={stats} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stats: getRemoteArchiveStats(state)
  };
};

export default connect(
  mapStateToProps
)(PatchWidget);
