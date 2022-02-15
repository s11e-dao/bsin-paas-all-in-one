import React, { PureComponent } from 'react';
import Chart from '../../../utils/chart';
import { OfflinePortalOptions } from './options';

class OfflinePortal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      renderer: 'canvas',
    };
  }

  render() {
    const { renderer } = this.state;
    const { offlinePortalData } = this.props;
    return (
      <div
        style={{
          width: '100%',
          height: '30vh',
        }}
      >
        <Chart
          renderer={renderer}
          option={OfflinePortalOptions(offlinePortalData)}
        />
      </div>
    );
  }
}

export default OfflinePortal;
