import React, { Component } from 'react';
import '../semantic/dist/semantic.min.css';
import '../Custom.css';
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
      category: { key: 'all', value: 'All', icon: 'home' },
      posts: []
    };
  }

  componentDidMount() {
    this.setState({ isAppReady: true });
    this.getPosts('all', posts => this.setState({ posts }));
  }

  getPosts(category, callback) {
    let promises1 = [];
    let categories =
      category === 'all' ? ['react', 'redux', 'udacity'] : [category];
    categories.forEach(category =>
      promises1.push(
        fetch(`http://localhost:3001/${category}/posts`, {
          headers: { Authorization: 'monkey' }
        })
      )
    );

    Promise.all(promises1).then(responses => {
      let promises2 = responses.map(response => response.json());
      Promise.all(promises2).then(data => {
        let finalData = [];
        data.forEach(values => (finalData = finalData.concat(values)));
        //console.log(finalData);
        callback(finalData);
      });
    });

    // .then(response => response.json())
    // .then(data => console.log('response', data));
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
      this.setState({ modalOpen: true, modalType: 'post', item: item });
    else if (action === 'edit')
      this.setState({ modalOpen2: true, item: item, isEdit: true });
  }

  closeConfirmationModal(toDelete) {
    this.setState({ modalOpen: false, modalType: '' });
    if (toDelete) {
      const posts = this.state.posts.filter(
        post => post.author !== this.state.item.author
      );
      this.setState({ posts });
    }
  }

  updateState(attribute, value) {
    this.setState({ [attribute]: value });
    if (attribute === 'category') {
      this.setState({ toggleSideBar: false });
      this.getPosts(value.key, posts => this.setState({ posts }));
    }
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
            {self.state.posts.length === 0 && (
              <Header
                as="div"
                icon="attention"
                content="No posts in this category"
                disabled
              />
            )}
            <Feed>
              {self.state.posts.map(post => (
                <MyPost
                  post={post}
                  handlePostAction={self.openModal.bind(self)}
                  key={post.id}
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
