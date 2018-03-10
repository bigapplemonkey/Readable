import React, { Component } from 'react';
import { Dropdown, Icon, Menu, Header, Input } from 'semantic-ui-react';

class Navigation extends Component {
  state = {
    isHamburgerActive: false,
    activeItem: 'date'
  };

  menuConfig = {
    projectName: 'Readable',
    author: 'Jorge Asuaje',
    link: 'https://bigapplemonkey.github.io/',
    dropdownItems: [
      { key: 'date', value: 'Date', icon: 'sort content ascending' },
      { key: 'name', value: 'Name', icon: 'sort alphabet ascending' },
      { key: 'title', value: 'Title', icon: 'sort alphabet ascending' },
      { key: 'vote', value: 'Vote', icon: 'sort numeric descending' }
    ]
  };

  toggleHamburger() {
    this.setState({ isHamburgerActive: !this.state.isHamburgerActive });
    this.props.onClick();
  }

  updateActiveItem(activeItem) {
    this.setState({ activeItem });
  }

  render() {
    const self = this;
    const menuConfig = self.menuConfig;

    return (
      <div>
        <Menu attached="top" className="my-nav fixed" inverted>
          <Menu.Item
            name="hamburger"
            className="hamburger-link"
            active={self.state.isHamburgerActive}
            onClick={self.toggleHamburger.bind(this)}
          >
            <Icon name="sidebar" />
          </Menu.Item>
          <Header as="h1" size="tiny" className="app-header" inverted>
            <Icon name="pin" />
            <Header.Content>
              {menuConfig.projectName}
              <Header.Subheader>By {menuConfig.author}</Header.Subheader>
            </Header.Content>
          </Header>
          <Menu.Menu position="right">
            <Dropdown item text="Sort By">
              <Dropdown.Menu>
                {menuConfig.dropdownItems.map(item => (
                  <Dropdown.Item
                    key={item.key}
                    active={item.key === self.state.activeItem}
                    onClick={() => {
                      self.updateActiveItem(item.key);
                    }}
                  >
                    {item.icon && <Icon name={item.icon} />}
                    <span className="text">{item.value}</span>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <div className="ui right aligned category search item">
              <Input
                icon={{ name: 'search', circular: true, link: false }}
                placeholder="Search..."
                onChange={event => console.log(event.target.value.trim())}
              />
              <div className="results" />
            </div>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default Navigation;
