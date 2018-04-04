// React packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Components
import MyPost from './MyPost';
import { Transition, Modal, Feed } from 'semantic-ui-react';

class MyShowPostModal extends Component {
  render() {
    const self = this;

    const { isVisible, onClose, post, onPostAction } = self.props;

    return (
      <Transition
        visible={isVisible}
        animation="fade down"
        unmountOnHide={true}
        duration={{ show: 350, hide: 250 }}
      >
        <Modal
          className="view"
          dimmer="inverted"
          open={true}
          onClose={onClose}
          closeOnDimmerClick={false}
          closeIcon
        >
          <Modal.Header>Post</Modal.Header>
          <Modal.Content scrolling={false}>
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
              />
            </Feed>
          </Modal.Content>
        </Modal>
      </Transition>
    );
  }
}

MyShowPostModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPostAction: PropTypes.func.isRequired,
  post: PropTypes.object
};

function mapStateToProps({ posts }, myProps) {
  return {
    post: posts[myProps.postId]
  };
}

export default connect(mapStateToProps)(MyShowPostModal);
