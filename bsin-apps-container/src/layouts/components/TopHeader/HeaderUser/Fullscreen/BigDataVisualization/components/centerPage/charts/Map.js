import React, { PureComponent } from 'react';
import Chart from '../../../utils/chart';
import { mapOptions } from './options';

class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      renderer: 'canvas',
    };
  }

  render() {
    const { renderer } = this.state;
    const { mapData } = this.props;
    return (
      <div
        style={{
          width: '50vw',
          height: '60vh',
        }}
      >
        {mapData ? (
          <Chart renderer={renderer} option={mapOptions(mapData)} />
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default Map;
