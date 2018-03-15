// React packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import { Sidebar, Menu, Icon } from 'semantic-ui-react';

class MySidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleSideBar: true,
      sidebarDirection: 'horizontal',
      activeItem: 'all'
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    const width = window.innerWidth;
    if (width < 731) {
      if (this.state.sidebarDirection !== 'horizontal')
        this.setState({ sidebarDirection: 'horizontal' });
      if (this.state.toggleSideBar) this.setState({ toggleSideBar: false });
    } else {
      if (this.state.sidebarDirection !== 'vertical')
        this.setState({ sidebarDirection: 'vertical' });
      if (!this.state.toggleSideBar) this.setState({ toggleSideBar: true });
    }
  }

  updateActiveItem(activeItem) {
    this.setState({ activeItem: activeItem.key });
    this.props.onItemSelect(activeItem);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item) this.setState({ activeItem: nextProps.item });
  }

  render() {
    const self = this;

    const { sidebarDirection } = self.state;
    const { menuItems, visible } = self.props;

    return (
      <Sidebar
        as={Menu}
        animation={sidebarDirection === 'horizontal' ? 'overlay' : 'push'}
        width="thin"
        visible={self.state.toggleSideBar || visible}
        icon="labeled"
        direction={sidebarDirection === 'horizontal' ? 'top' : 'left'}
        vertical={sidebarDirection === 'vertical'}
        inverted
      >
        {menuItems.map(item => (
          <Menu.Item
            name={item.hey}
            key={item.key}
            active={item.key === self.state.activeItem}
            onClick={() => {
              self.updateActiveItem(item);
            }}
          >
            <Icon name={item.icon} />
            {item.value}
          </Menu.Item>
        ))}
      </Sidebar>
    );
  }
}

MySidebar.propTypes = {
  // comment: PropTypes.object.isRequired,
  // handleCommentAction: PropTypes.func.isRequired
};

export default MySidebar;
