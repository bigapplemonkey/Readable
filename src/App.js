import React, { Component } from 'react';
import './App.css';
import './semantic/dist/semantic.min.css';
import './Custom.css';
// Components
import Navigation from './Navigation';
import MyComments from './MyComments';
import Vote from './Vote';
import {
  Sidebar,
  Segment,
  Menu,
  Icon,
  Header,
  Feed,
  Modal,
  Button,
  Form,
  Transition
} from 'semantic-ui-react';

const options = [
  { key: 'react', text: 'React', value: 'react' },
  { key: 'redux', text: 'Redux', value: 'redux' },
  { key: 'udacity', text: 'Udacity', value: 'udacity' }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAppReady: false,
      expandComments: false,
      toggleSideBar: true,
      modalOpen: false,
      modalOpen2: false,
      showAddComment: false
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    console.log('here!');
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.setState({ isAppReady: true });
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
    //this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  getRandomPhoto(size) {
    let animals = ['cat', 'dog', 'monkey', 'ape', 'squirrel', 'beaver'];
    const randAnimal = animals[Math.floor(Math.random() * animals.length)];
    return `https://api.adorable.io/avatars/${
      size ? size : '35'
    }/${randAnimal}.png`;
  }

  onClick() {
    this.setState({ toggleSideBar: !this.state.toggleSideBar });
  }

  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  render() {
    const self = this;
    const { sidebarDirection } = this.state;

    return (
      <Transition
        visible={this.state.isAppReady}
        animation="fade"
        unmountOnHide={true}
        duration={2000}
      >
        <div>
          <Navigation onClick={this.onClick.bind(this)} />
          <Sidebar
            as={Menu}
            animation={sidebarDirection === 'horizontal' ? 'overlay' : 'push'}
            width="thin"
            visible={this.state.toggleSideBar}
            icon="labeled"
            direction={sidebarDirection === 'horizontal' ? 'top' : 'left'}
            vertical={sidebarDirection === 'vertical'}
            inverted
          >
            <Menu.Item name="home">
              <Icon name="home" />
              All
            </Menu.Item>
            <Menu.Item name="gamepad">
              <Icon name="react" />
              React
            </Menu.Item>
            <Menu.Item name="camera">
              <Icon name="camera" />
              Redux
            </Menu.Item>
            <Menu.Item name="camera">
              <Icon name="camera" />
              Udacity
            </Menu.Item>
          </Sidebar>
          <Segment basic className={this.state.toggleSideBar ? ' dimmed' : ''}>
            <Button
              circular
              className="add-post"
              color="green"
              icon="pin"
              size="big"
              onClick={() => this.setState({ modalOpen2: true })}
            />
            <Header as="h3">Application Content</Header>
            <Feed>
              <Feed.Event>
                <div className="feed-actions">
                  <a>
                    <Icon name="edit" />
                  </a>
                  <a onClick={this.toggleModal.bind(this)}>
                    <Icon name="delete" />
                  </a>
                </div>
                <Feed.Label
                  children={
                    <div>
                      <img alt="" src={self.getRandomPhoto()} />
                      <Vote count={5} />
                    </div>
                  }
                />
                <Feed.Content>
                  <Feed.Summary>
                    <div className="poster-name">Joe Henderson posted</div>
                    <Feed.Date>3 days ago</Feed.Date>
                  </Feed.Summary>
                  <Feed.Extra text>
                    <a>
                      <h3>This is my post</h3>
                    </a>
                    Ours is a life of constant reruns. We're always circling
                    back to where we'd we started, then starting all over again.
                    Even if we don't run extra laps that day, we surely will
                    come back for more of the same another day soon.
                  </Feed.Extra>
                  <MyComments />
                </Feed.Content>
              </Feed.Event>
              <Feed.Event>
                <Feed.Label image={this.getRandomPhoto()} />
                <Feed.Content>
                  <Feed.Summary>
                    <a>Joe Henderson</a> posted on his page
                    <Feed.Date>3 days ago</Feed.Date>
                  </Feed.Summary>
                  <Feed.Extra text>
                    Ours is a life of constant reruns. We're always circling
                    back to where we'd we started, then starting all over again.
                    Even if we don't run extra laps that day, we surely will
                    come back for more of the same another day soon.
                  </Feed.Extra>
                  <Feed.Meta>
                    <Feed.Like>
                      <Icon name="like" />
                      5 Likes
                    </Feed.Like>
                  </Feed.Meta>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Segment>
          <Transition
            visible={this.state.modalOpen}
            animation="fade down"
            unmountOnHide={true}
            duration={350}
          >
            <Modal open={true} basic size="small" style={{ marginTop: '30vh' }}>
              <Header icon="trash" content="Delete Comment" />
              <Modal.Content>
                <p>Are you sure you want to delete this comment?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  basic
                  color="red"
                  onClick={this.toggleModal.bind(this)}
                  inverted
                >
                  <Icon name="remove" /> No
                </Button>
                <Button
                  color="green"
                  onClick={this.toggleModal.bind(this)}
                  inverted
                >
                  <Icon name="checkmark" /> Yes
                </Button>
              </Modal.Actions>
            </Modal>
          </Transition>

          <Transition
            visible={this.state.modalOpen2}
            animation="fade down"
            unmountOnHide={true}
            duration={350}
          >
            <Modal
              className="view"
              dimmer="inverted"
              open={true}
              onClose={() => this.setState({ modalOpen2: false })}
              closeOnDimmerClick={false}
              closeIcon={true}
            >
              <Modal.Header icon="pin">Add Post</Modal.Header>
              <Modal.Content scrolling={false}>
                <Form
                  onSubmit={event => console.log('hereee', event.target.value)}
                  loading={false}
                >
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      label="Name"
                      placeholder="Name"
                      onChange={event => console.log(event.target.value)}
                      required
                    />
                    <Form.Select
                      fluid
                      label="Category"
                      options={options}
                      placeholder="Category"
                      required
                    />
                  </Form.Group>
                  <Form.Input
                    fluid
                    label="Title"
                    placeholder="Title"
                    required
                  />
                  <Form.TextArea
                    label="Content"
                    placeholder="Tell us more about it..."
                    rows="5"
                    required
                  />
                  <Form.Group>
                    <Button basic color="grey">
                      Cancel
                    </Button>
                    <Form.Button basic color="green">
                      <Icon name="pin" />Create
                    </Form.Button>
                  </Form.Group>
                </Form>
              </Modal.Content>
            </Modal>
          </Transition>
        </div>
      </Transition>
    );
  }
}

export default App;
