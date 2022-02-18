import React, { PureComponent } from 'react';
import Chart from '../../../utils/chart';
import { FeedbackOptions } from './options';

class Feedback extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      renderer: 'canvas',
      option: '',
    };
  }

  render() {
    const { renderer } = this.state;
    const { FeedbackData } = this.props;
    return (
      <div
        style={{
          width: '100%',
          height: '6vh',
        }}
      >
        <Chart renderer={renderer} option={FeedbackOptions(FeedbackData)} />
      </div>
    );
  }
}

export default Feedback;
