import React, { Component } from 'react';
import { Dropdown, Icon, Menu, Header, Input } from 'semantic-ui-react'

class Navigation extends Component {
  state = {
    activeItem: 'gamepad'
  }

  render() {
    return (
      <div>
        <Menu attached='top' className="my-nav" inverted>
          <Menu.Item name='gamepad' className="hamburger-link" active={false} onClick={this.props.onClick}>
            <Icon name='sidebar' />
          </Menu.Item>
          <Header as='h1' size='tiny' className="app-header" inverted>
            <Icon name='pin' />
            <Header.Content>
              Readable
              <Header.Subheader>
                By Jorge Asuaje
              </Header.Subheader>
            </Header.Content>
          </Header>
          <Menu.Menu position='right'>
            <Dropdown item text='Sort By'>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Icon name='dropdown' />
                  <span className='text'>New</span>

                  <Dropdown.Menu>
                    <Dropdown.Item>Document</Dropdown.Item>
                    <Dropdown.Item>Image</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>Open</Dropdown.Item>
                <Dropdown.Item>Save...</Dropdown.Item>
                <Dropdown.Item>Edit Permissions</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Export</Dropdown.Header>
                <Dropdown.Item>Share</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className='ui right aligned category search item'>
              <Input
                icon={{ name: 'search', circular: true, link: true }}
                placeholder='Search...'
              />
              <div className='results' />
            </div>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default Navigation;
