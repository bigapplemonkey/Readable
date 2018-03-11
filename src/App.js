import React, { Component } from 'react';
import './App.css';
import './semantic/dist/semantic.min.css';
import './Custom.css';
// Components
import MyNavigation from './MyNavigation';
import MySidebar from './MySidebar';
import MyPost from './MyPost';
import {
  Segment,
  Icon,
  Header,
  Feed,
  Modal,
  Button,
  Form,
  Transition
} from 'semantic-ui-react';

const menuItems = [
  { key: 'all', value: 'All', icon: 'home' },
  { key: 'react', value: 'React', icon: 'react' },
  { key: 'redux', value: 'Redux', icon: 'camera' },
  { key: 'udacity', value: 'Udacity', icon: 'camera' }
];

const posts = [
  {
    poster: 'Peter Jhon',
    date: 'Yesterday at 12:30AM',
    body: `Ours is a life of constant reruns. We're always circling
            back to where we'd we started, then starting all over again.
            Even if we don't run extra laps that day, we surely will
            come back for more of the same another day soon.`,
    count: -25
  },
  {
    poster: 'Kim Fu',
    date: '5 days ago',
    body: `Strength does not come from winning. Your struggles develop your strengths. When you go through hardships and decide not to surrender, that is strength.`,
    count: 9
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAppReady: false,
      toggleSideBar: false,
      modalOpen: false,
      modalOpen2: false,
      sortBy: { key: 'date', value: 'Date', icon: 'sort content ascending' },
      category: { key: 'all', value: 'All', icon: 'home' }
    };
  }

  componentDidMount() {
    this.setState({ isAppReady: true });
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

  updateState(attribute, value) {
    this.setState({ [attribute]: value });
    if (attribute === 'category') this.setState({ toggleSideBar: false });
  }

  render() {
    const self = this;

    return (
      <Transition
        visible={self.state.isAppReady}
        animation="fade"
        unmountOnHide={true}
        duration={2000}
      >
        <div>
          <MyNavigation
            onHamburgerClick={self.onClick.bind(self)}
            onSort={sortBy => self.updateState.bind(self)('sortBy', sortBy)}
          />
          <MySidebar
            visible={this.state.toggleSideBar}
            menuItems={menuItems}
            onItemSelect={category =>
              self.updateState.bind(self)('category', category)
            }
          />
          <Segment basic className={self.state.toggleSideBar ? ' dimmed' : ''}>
            <Button
              circular
              className="add-post"
              color="green"
              icon="pin"
              size="big"
              onClick={() => self.setState({ modalOpen2: true })}
            />
            <Header as="h3" className="section-title">
              {self.state.category.value} Posts
            </Header>
            <div className="sorted-by">
              <Icon name={self.state.sortBy.icon} />
              {self.state.sortBy.value}
            </div>
            <Feed>
              {posts.map(post => (
                <MyPost post={post} handlePostAction={console.log} />
              ))}
            </Feed>
          </Segment>
          <Transition
            visible={self.state.modalOpen}
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
                  onClick={self.toggleModal.bind(self)}
                  inverted
                >
                  <Icon name="remove" /> No
                </Button>
                <Button
                  color="green"
                  onClick={self.toggleModal.bind(self)}
                  inverted
                >
                  <Icon name="checkmark" /> Yes
                </Button>
              </Modal.Actions>
            </Modal>
          </Transition>

          <Transition
            visible={self.state.modalOpen2}
            animation="fade down"
            unmountOnHide={true}
            duration={350}
          >
            <Modal
              className="view"
              dimmer="inverted"
              open={true}
              onClose={() => self.setState({ modalOpen2: false })}
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
                      options={menuItems.slice(1).map(item => {
                        const obj = {
                          key: item.key,
                          text: item.value,
                          value: item.key
                        };
                        return obj;
                      })}
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
