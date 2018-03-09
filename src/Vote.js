// React packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import { Transition, Icon } from 'semantic-ui-react';

class Vote extends Component {
  state = { visible: true };

  updateCount(isIncrement) {
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
            <Icon name="thumbs up" />
          </Transition>
          {self.props.count}
        </div>
        <Icon name="triangle down" onClick={() => self.updateCount(false)} />
      </div>
    );
  }
}

Vote.propTypes = {
  count: PropTypes.number
};

export default Vote;
