import React, { Component } from 'react';
import './App.css';
import './semantic/dist/semantic.min.css';
import './Custom.css';
// Components
import MyNavigation from './MyNavigation';
import MySidebar from './MySidebar';
import MyPost from './MyPost';
import MyConfirmationModal from './MyConfirmationModal';
import MyEditModal from './MyEditModal';
import {
  Segment,
  Icon,
  Header,
  Feed,
  Button,
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
    title: 'This is my title 1',
    body: `Ours is a life of constant reruns. We're always circling back to where we'd we started, then starting all over again. Even if we don't run extra laps that day, we surely will come back for more of the same another day soon.`,
    category: 'redux',
    count: -25
  },
  {
    poster: 'Kim Fu',
    date: '5 days ago',
    title: 'This is my title 2',
    body: `Strength does not come from winning. Your struggles develop your strengths. When you go through hardships and decide not to surrender, that is strength.`,
    category: 'udacity',
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
      modalType: '',
      modalOpen2: false,
      item: {},
      isEdit: false,
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

  openModal(action, item) {
    console.log(action);
    console.log(item);
    if (action === 'delete')
      this.setState({ modalOpen: true, modalType: 'post' });
    else if (action === 'edit')
      this.setState({ modalOpen2: true, item: item, isEdit: true });
  }

  closeConfirmationModal(toDelete) {
    this.setState({ modalOpen: false, modalType: '' });
    console.log(toDelete);
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
              onClick={() => self.setState({ modalOpen2: true, isEdit: false })}
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
                <MyPost
                  post={post}
                  handlePostAction={self.openModal.bind(self)}
                />
              ))}
            </Feed>
          </Segment>
          <MyConfirmationModal
            visible={self.state.modalOpen}
            type={self.state.modalType}
            onAction={self.closeConfirmationModal.bind(self)}
          />
          <MyEditModal
            visible={self.state.modalOpen2}
            onClose={() => self.setState({ modalOpen2: false, item: {} })}
            item={self.state.item}
            isEdit={self.state.isEdit}
            categoryItems={menuItems.slice(1)}
          />
        </div>
      </Transition>
    );
  }
}

export default App;
