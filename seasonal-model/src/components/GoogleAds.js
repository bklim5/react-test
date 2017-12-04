/**
 * Created by BoonKhaiLim on 30/11/2016.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './GoogleAds.css';


class GoogleAds extends Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <div className="adsDiv">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={this.props.client}
          data-ad-slot={this.props.slot}
          data-ad-format={this.props.format}
        >
        </ins>
      </div>
    );
  }
}

GoogleAds.propTypes = {
  client: PropTypes.string,
  slot: PropTypes.string,
  format: PropTypes.string,
};

GoogleAds.defaultProps = {
  client: 'ca-pub-4810050267945909',
  slot: '5726347873',
  format: 'auto',
};

export default GoogleAds;
