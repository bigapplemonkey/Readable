// React packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Components
import { Sidebar, Menu, Icon, Image } from 'semantic-ui-react';

class MySidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleSideBar: true,
      sidebarDirection: 'horizontal'
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

  // if active item coming in props from parent
  componentWillReceiveProps(nextProps) {
    if (nextProps.item) this.setState({ activeItem: nextProps.item });
  }

  // handle sidebar visibility according to viewport size
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

  render() {
    const self = this;

    const { sidebarDirection, toggleSideBar } = self.state;
    const { menuItems, visible, activeItemKey } = self.props;

    return (
      <Sidebar
        as={Menu}
        animation={sidebarDirection === 'horizontal' ? 'overlay' : 'push'}
        width="thin"
        visible={toggleSideBar || visible}
        icon="labeled"
        direction={sidebarDirection === 'horizontal' ? 'top' : 'left'}
        vertical={sidebarDirection === 'vertical'}
        inverted
      >
        {menuItems.map(item => (
          <Link to={`${process.env.PUBLIC_URL}/${item.key}`} key={item.key}>
            <Menu.Item
              name={item.hey}
              key={item.key}
              as="div"
              active={item.key === activeItemKey}
            >
              {item.icon ? (
                <Icon name={item.icon} />
              ) : (
                <Image src={item.image} centered />
              )}
              {item.value}
            </Menu.Item>
          </Link>
        ))}
      </Sidebar>
    );
  }
}

MySidebar.propTypes = {
  menuItems: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  activeItemKey: PropTypes.string.isRequired
};

export default MySidebar;
