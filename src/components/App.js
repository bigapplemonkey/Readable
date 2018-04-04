// React packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Styles
import '../semantic/dist/semantic.min.css';
import '../Custom.css';
// Components
import MyNavigation from './MyNavigation';
import MySidebar from './MySidebar';
import MyPost from './MyPost';
import MyConfirmationModal from './MyConfirmationModal';
import MyEditModal from './MyEditModal';
import MyShowPostModal from './MyShowPostModal';
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
  getPosts,
  addPost,
  updatePost,
  deletePost,
  deleteComment,
  closeConfirmationModal,
  confirmConfirmationModal,
  clearConfirmationModal
} from '../actions';
// Helpers
import { sortBy } from '../utils/helpers';

// TODO: Remove, retrieve from API
const menuItems = [
  { key: 'all', value: 'All', icon: 'home' },
  { key: 'react', value: 'React', icon: 'react' },
  { key: 'redux', value: 'Redux', image: './redux-logo-opt.png' },
  { key: 'udacity', value: 'Udacity', image: './udacity-logo-opt.png' }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAppReady: false,
      isSideBarVisible: false,
      isCreateModalOpen: false,
      isCreateModalEdit: false,
      isShowPostModalOpen: false,
      isFeedVisible: false,
      isProcessing: false,
      showItem: {},
      actionItem: {},
      sortedBy: { key: 'date', value: 'Date', icon: 'sort content ascending' },
      category: { key: 'all', value: 'All', icon: 'home' },
      query: ''
    };
    this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeConfirmationModal = this.closeConfirmationModal.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handleModalAction = this.handleModalAction.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleOpenPost = this.handleOpenPost.bind(this);
    this.handleSorting = this.handleSorting.bind(this);
  }

  // when app is ready
  componentDidMount() {
    this.props.getPosts();
    this.setState({ isAppReady: true, isFeedVisible: true });
  }

  handleHamburgerClick() {
    this.setState({ isSideBarVisible: !this.state.isSideBarVisible });
  }

  openCreateModal(actionItem = {}, isCreateModalEdit) {
    this.setState({
      isCreateModalOpen: true,
      actionItem,
      isCreateModalEdit
    });
  }

  closeConfirmationModal(toDelete) {
    const { confirmationModalType } = this.props;
    this.props.closeConfirmationModal();

    if (toDelete) {
      const { confirmationModalElement } = this.props;
      this.props.confirmConfirmationModal();

      if (confirmationModalType === 'post')
        this.setState({ isShowPostModalOpen: false });
      setTimeout(() => {
        if (confirmationModalType === 'post')
          this.props.deletePost({ id: confirmationModalElement });
        else if (confirmationModalType === 'comment')
          this.props.deleteComment({ id: confirmationModalElement });
        this.props.clearConfirmationModal();
      }, 900);
    }
  }

  // handle state updates
  updateState(attribute, value) {
    if (attribute === 'category' && value.key !== this.state.category.key) {
      this.setState({ isSideBarVisible: false, isFeedVisible: false }, () => {
        this.setState({ [attribute]: value }, () => {
          this.setState({ isFeedVisible: true });
        });
      });
    } else this.setState({ [attribute]: value });
  }

  handleModalAction(action, actionItem) {
    const { title, body } = actionItem;
    action === 'create'
      ? this.props.addPost(actionItem)
      : this.props.updatePost({ ...actionItem, title, body });

    this.setState({ isCreateModalOpen: false, actionItem: {} });
  }

  handleOpenPost(showItem) {
    this.setState({ isShowPostModalOpen: true, showItem });
  }

  handleSearch(query) {
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

  handleSorting(sortedBy) {
    if (sortedBy.key !== this.state.sortedBy.key) {
      this.setState({ isProcessing: true }, () => {
        setTimeout(() => {
          this.updateState('sortedBy', sortedBy);
          this.setState({ isProcessing: false });
        }, 300);
      });
    }
  }

  render() {
    const self = this;

    let {
      posts,
      confirmationModalElement,
      confirmed,
      showConfirmationModal,
      confirmationModalType
    } = self.props;

    const {
      category,
      query,
      isAppReady,
      isSideBarVisible,
      isFeedVisible,
      sortedBy,
      isProcessing,
      isCreateModalOpen,
      isShowPostModalOpen,
      showItem,
      actionItem,
      isCreateModalEdit
    } = self.state;

    if (category.key !== 'all')
      posts = posts.filter(post => post.category === category.key);
    posts = sortBy(posts, sortedBy.key);

    if (query && query !== '')
      posts = posts.filter(post =>
        [post.body, post.title, post.author, post.category]
          .join(' ')
          .toLowerCase()
          .includes(query.toLowerCase())
      );

    return (
      <Transition
        visible={isAppReady}
        animation="fade"
        unmountOnHide={true}
        duration={2000}
      >
        <div>
          <MyNavigation
            onHamburgerClick={self.handleHamburgerClick}
            onSort={self.handleSorting}
            onSearch={self.handleSearch}
          />
          <MySidebar
            visible={isSideBarVisible}
            menuItems={menuItems}
            item={category.key}
            onItemSelect={category => self.updateState('category', category)}
          />
          <Segment basic className={isSideBarVisible ? ' dimmed' : ''}>
            <Button
              circular
              className="add-post"
              color="green"
              icon="pin"
              size="big"
              onClick={() => self.openCreateModal({}, false)}
            />
            <Transition
              visible={isFeedVisible}
              animation="fade up"
              duration={{ hide: 0, show: 500 }}
            >
              <div>
                <Header as="h3" className="section-title">
                  {category.value} Posts
                </Header>
                <div className="sorted-by">
                  <Icon name={sortedBy.icon} />
                  {sortedBy.value}
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
                    active={isProcessing}
                    inverted
                  >
                    <Loader />
                  </Dimmer>
                  {posts.map(post => (
                    <MyPost
                      post={post}
                      onPostAction={(action, actionItem) =>
                        self.openCreateModal(actionItem, true)
                      }
                      key={post.id}
                      category={category}
                      onCategoryClick={category =>
                        self.updateState('category', category)
                      }
                      isLeaving={
                        post.id === confirmationModalElement && confirmed
                      }
                      isClickable={true}
                      onOpenPost={self.handleOpenPost}
                    />
                  ))}
                </Feed>
              </div>
            </Transition>
          </Segment>
          <MyConfirmationModal
            isVisible={showConfirmationModal}
            type={confirmationModalType}
            onAction={self.closeConfirmationModal}
          />
          <MyEditModal
            isVisible={isCreateModalOpen}
            onClose={() => self.updateState('isCreateModalOpen', false)}
            onAction={self.handleModalAction}
            item={actionItem}
            isEdit={isCreateModalEdit}
            categoryItems={menuItems.slice(1)}
          />
          <MyShowPostModal
            isVisible={isShowPostModalOpen}
            postId={showItem.id}
            onClose={() => self.updateState('isShowPostModalOpen', false)}
            onAction={self.handleModalAction}
            item={actionItem}
            isEdit={isCreateModalEdit}
            onPostAction={(action, actionItem) =>
              self.openCreateModal(actionItem, true)
            }
          />
        </div>
      </Transition>
    );
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
  showConfirmationModal: PropTypes.bool.isRequired,
  confirmationModalType: PropTypes.string.isRequired,
  confirmationModalElement: PropTypes.string.isRequired,
  confirmed: PropTypes.bool.isRequired,
  getPosts: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  closeConfirmationModal: PropTypes.func.isRequired,
  confirmConfirmationModal: PropTypes.func.isRequired,
  clearConfirmationModal: PropTypes.func.isRequired
};

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
    getPosts: data => dispatch(getPosts()),
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
