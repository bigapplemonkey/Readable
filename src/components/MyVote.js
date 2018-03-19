// React packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import { Transition, Icon } from 'semantic-ui-react';

class MyVote extends Component {
  state = { visible: true };

  updateCount(isIncrement) {
    this.props.onVote(isIncrement);
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const self = this;

    const { visible } = self.state;

    return (
      <div className="voting">
        <Icon name="triangle up" onClick={() => self.updateCount(true)} />
        <div className="count">
          <Transition animation="jiggle" duration={500} visible={visible}>
            <div>
              <Icon name="thumbs up" />
              {self.props.count}
            </div>
          </Transition>
        </div>
        <Icon name="triangle down" onClick={() => self.updateCount(false)} />
      </div>
    );
  }
}

MyVote.propTypes = {
  count: PropTypes.number.isRequired,
  onVote: PropTypes.func.isRequired
};

export default MyVote;
