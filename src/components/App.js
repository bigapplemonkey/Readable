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
  Transition,
  Dimmer,
  Loader
} from 'semantic-ui-react';
// Redux Actions
import {
  addPost,
  updatePost,
  deletePost,
  deleteComment,
  closeConfirmationModal,
  confirmConfirmationModal,
  clearConfirmationModal
} from '../actions';

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
      modalOpen2: false,
      item: {},
      isEdit: false,
      sortBy: { key: 'date', value: 'Date', icon: 'sort content ascending' },
      category: { key: 'all', value: 'All', icon: 'home' },
      isFeedVisible: false,
      query: '',
      isProcessing: false
    };
  }

  componentDidMount() {
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
    const { confirmationModalType } = this.props;
    this.props.closeConfirmationModal();

    if (toDelete) {
      const { confirmationModalElement } = this.props;
      this.props.confirmConfirmationModal();

      setTimeout(() => {
        if (confirmationModalType === 'post')
          this.props.deletePost({ id: confirmationModalElement });
        else if (confirmationModalType === 'comment')
          this.props.deleteComment({ id: confirmationModalElement });
        this.props.deleteComment({ id: confirmationModalElement });
        this.props.clearConfirmationModal();
      }, 900);
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

  handleSearch(query) {
    console.log(query);
    this.setState({ isProcessing: true }, () => {
      setTimeout(
        () =>
          this.setState({ query }, () =>
            this.setState({ isProcessing: false })
          ),
        300
      );
    });
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
    const { category, query } = self.state;

    if (category.key !== 'all')
      posts = posts.filter(post => post.category === category.key);
    posts = posts.sort((x, y) => y.timestamp - x.timestamp);

    if (query && query !== '')
      posts = posts.filter(post =>
        [post.body, post.title, post.author, post.category]
          .join(' ')
          .toLowerCase()
          .includes(query.toLowerCase())
      );

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
            onSearch={self.handleSearch.bind(self)}
          />
          <MySidebar
            visible={this.state.toggleSideBar}
            menuItems={menuItems}
            item={self.state.category.key}
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
                    content={`No posts in this category${
                      query && query !== '' ? ` for '${query}'` : ''
                    }`}
                    disabled
                  />
                )}
                <Feed>
                  <Dimmer
                    className="search-processing"
                    active={self.state.isProcessing}
                    inverted
                  >
                    <Loader />
                  </Dimmer>
                  {posts.map(post => (
                    <MyPost
                      post={post}
                      onPostAction={self.openModal.bind(self)}
                      key={post.id}
                      category={self.state.category}
                      onCategoryClick={category =>
                        self.updateState.bind(self)('category', category)
                      }
                      isLeaving={
                        post.id === self.props.confirmationModalElement &&
                        self.props.confirmed
                      }
                    />
                  ))}
                </Feed>
              </div>
            </Transition>
          </Segment>
          <MyConfirmationModal
            isVisible={self.props.showConfirmationModal}
            type={self.props.confirmationModalType}
            onAction={self.closeConfirmationModal.bind(self)}
          />
          <MyEditModal
            isVisible={self.state.modalOpen2}
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

function mapStateToProps({ posts, confirmationModal }) {
  const formattedPosts = Object.keys(posts).map(key => ({
    ...posts[key],
    id: key
  }));
  return {
    posts: formattedPosts,
    showConfirmationModal: confirmationModal.show,
    confirmationModalType: confirmationModal.elementType,
    confirmationModalElement: confirmationModal.id,
    confirmed: confirmationModal.confirmed
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: data => dispatch(addPost(data)),
    updatePost: data => dispatch(updatePost(data)),
    deletePost: data => dispatch(deletePost(data)),
    deleteComment: data => dispatch(deleteComment(data)),
    closeConfirmationModal: () => dispatch(closeConfirmationModal()),
    confirmConfirmationModal: () => dispatch(confirmConfirmationModal()),
    clearConfirmationModal: () => dispatch(clearConfirmationModal())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
