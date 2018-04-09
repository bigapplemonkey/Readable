// React packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Components
import MyPost from './MyPost';
import {
  Transition,
  Modal,
  Feed,
  Dimmer,
  Loader,
  Icon,
  Header
} from 'semantic-ui-react';

class MyShowPostModal extends Component {
  state = { notFound: false, post: null };

  componentDidMount() {
    const { post } = this.props;
    if (post) this.setState({ post });

    setTimeout(() => {
      if (!this.props.post) this.setState({ notFound: true });
    }, 1500);
  }

  componentWillReceiveProps(nextProps) {
    const { post } = nextProps;
    if (nextProps.post) this.setState({ post });
  }

  render() {
    const self = this;

    const { notFound, post } = self.state;
    const { onPostAction, category } = self.props;

    return (
      <div>
        <Dimmer active={!post} inverted>
          <Loader />
        </Dimmer>
        <Transition
          visible={(post !== undefined && post !== null) || notFound}
          animation="fade down"
          unmountOnHide={true}
          duration={500}
        >
          <Modal
            className="view"
            dimmer="inverted"
            open={true}
            closeOnDimmerClick={false}
            closeIcon={
              <Link
                className="close-link"
                to={`${process.env.PUBLIC_URL}/${category}`}
              >
                <Icon name="close" />
              </Link>
            }
          >
            <Modal.Header>Post</Modal.Header>
            <Modal.Content scrolling={false}>
              {post ? (
                <Feed>
                  <MyPost
                    post={post}
                    onPostAction={() => onPostAction('edit', post)}
                    category={{}}
                    onCategoryClick={category =>
                      self.updateState('category', category)
                    }
                    isClickable={false}
                    onOpenPost={self.handleOpenPost}
                  />{' '}
                </Feed>
              ) : (
                <Header
                  as="div"
                  icon="attention"
                  content="No post found"
                  disabled
                />
              )}
            </Modal.Content>
          </Modal>
        </Transition>
      </div>
    );
  }
}

MyShowPostModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onPostAction: PropTypes.func.isRequired,
  post: PropTypes.object,
  category: PropTypes.string.isRequired
};

function mapStateToProps({ posts }, myProps) {
  return {
    post: posts[myProps.postId] ? posts[myProps.postId] : null
  };
}

export default connect(mapStateToProps)(MyShowPostModal);
