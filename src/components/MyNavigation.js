// React packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import { Dropdown, Icon, Menu, Header, Input } from 'semantic-ui-react';

class MyNavigation extends Component {
  state = {
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

  updateActiveItem(activeItem) {
    this.setState({ activeItem: activeItem.key });
    this.props.onSort(activeItem);
  }

  render() {
    const self = this;

    const menuConfig = self.menuConfig;

    const { onHamburgerClick, onSearch } = self.props;
    const { activeItem } = self.state;

    return (
      <div>
        <Menu attached="top" className="my-nav fixed" inverted>
          <Menu.Item
            name="hamburger"
            className="hamburger-link"
            onClick={onHamburgerClick}
          >
            <Icon name="sidebar" />
          </Menu.Item>
          <Header as="h1" size="tiny" className="app-header" inverted>
            <Icon name="pin" />
            <Header.Content>
              {menuConfig.projectName}
              <Header.Subheader>
                By{' '}
                <a className="author-link" href={menuConfig.link}>
                  {menuConfig.author}
                </a>
              </Header.Subheader>
            </Header.Content>
          </Header>
          <Menu.Menu position="right">
            <Dropdown item text="Sort By">
              <Dropdown.Menu>
                {menuConfig.dropdownItems.map(item => (
                  <Dropdown.Item
                    key={item.key}
                    active={item.key === activeItem}
                    onClick={() => {
                      self.updateActiveItem(item);
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
                onKeyUp={event => onSearch(event.target.value.trim())}
              />
              <div className="results" />
            </div>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

MyNavigation.propTypes = {
  onHamburgerClick: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired
};

export default MyNavigation;
