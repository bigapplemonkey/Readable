// React packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Styles
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
// Redux Actions
import { addPost, updatePost, deletePost } from '../actions';

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
      isFeedVisible: false,
      deletedPost: ''
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.setState({ isAppReady: true, isFeedVisible: true });
  }

  onClick() {
    this.setState({ toggleSideBar: !this.state.toggleSideBar });
  }

  openModal(action, item) {
    if (action === 'delete')
      this.setState({ modalOpen: true, modalType: 'post', item });
    else if (action === 'edit')
      this.setState({ modalOpen2: true, item, isEdit: true });
  }

  closeConfirmationModal(toDelete) {
    this.setState({ modalOpen: false, modalType: '' });
    if (toDelete) {
      const { id } = this.state.item;
      this.setState({ deletedPost: id }, () => {
        setTimeout(() => this.props.deletePost({ id }), 800);
      });
    }
  }

  updateState(attribute, value) {
    if (attribute === 'category' && value.key !== this.state.category.key) {
      this.setState({ toggleSideBar: false, isFeedVisible: false }, () => {
        this.setState({ [attribute]: value }, () => {
          this.setState({ isFeedVisible: true });
        });
      });
    } else this.setState({ [attribute]: value });
  }

  handleModalAction(action, item) {
    console.log(action);
    console.log(item);

    const { title, body } = item;

    action === 'create'
      ? this.props.addPost({
          ...item,
          id: this.guid(),
          timestamp: Date.now()
        })
      : this.props.updatePost({
          ...item,
          title,
          body
        });

    this.setState({ modalOpen2: false, item: {} });
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4()
    );
  }

  render() {
    const self = this;

    let { posts } = self.props;
    if (self.state.category.key !== 'all')
      posts = posts.filter(post => post.category === self.state.category.key);
    posts = posts.sort((x, y) => y.timestamp - x.timestamp);
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
              onClick={() =>
                self.setState({ modalOpen2: true, isEdit: false, item: {} })
              }
            />
            <Transition
              visible={self.state.isFeedVisible}
              animation="fade up"
              duration={{ hide: 0, show: 500 }}
            >
              <div>
                <Header as="h3" className="section-title">
                  {self.state.category.value} Posts
                </Header>
                <div className="sorted-by">
                  <Icon name={self.state.sortBy.icon} />
                  {self.state.sortBy.value}
                </div>
                {posts.length === 0 && (
                  <Header
                    as="div"
                    icon="attention"
                    content="No posts in this category"
                    disabled
                  />
                )}
                <Feed>
                  {posts.map(post => (
                    <MyPost
                      post={post}
                      handlePostAction={self.openModal.bind(self)}
                      key={post.id}
                      category={self.state.category}
                      isLeaving={post.id === self.state.deletedPost}
                    />
                  ))}
                </Feed>
              </div>
            </Transition>
          </Segment>
          <MyConfirmationModal
            visible={self.state.modalOpen}
            type={self.state.modalType}
            onAction={self.closeConfirmationModal.bind(self)}
          />
          <MyEditModal
            visible={self.state.modalOpen2}
            onClose={() => self.setState({ modalOpen2: false, item: {} })}
            onAction={self.handleModalAction.bind(self)}
            item={self.state.item}
            isEdit={self.state.isEdit}
            categoryItems={menuItems.slice(1)}
          />
        </div>
      </Transition>
    );
  }
}

function mapStateToProps({ posts }) {
  const formattedPosts = Object.keys(posts).map(key => ({
    ...posts[key],
    id: key
  }));
  return { posts: formattedPosts };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: data => dispatch(addPost(data)),
    updatePost: data => dispatch(updatePost(data)),
    deletePost: data => dispatch(deletePost(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
