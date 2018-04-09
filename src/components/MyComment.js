// React packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
// Components
import MyVote from './MyVote';
import {
  Comment,
  Form,
  TextArea,
  Button,
  Icon,
  Dimmer,
  Loader
} from 'semantic-ui-react';
// Redux Actions
import {
  upVoteComment,
  downVoteComment,
  updateComment,
  openConfirmationModal
} from '../actions';
// Helpers
import { getPhoto } from '../utils/helpers';

class MyComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
      isProcessing: false,
      isLoading: true,
      body: ''
    };

    this.handleVote = this.handleVote.bind(this);
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  // remmove loader when image is ready
  handleImageLoaded() {
    this.setState({ isLoading: false });
  }

  handleToggleEditMode(comment) {
    const editMode = !this.state.isEditable;
    editMode
      ? this.setState({ isEditable: editMode, body: this.props.comment.body })
      : this.setState({ isEditable: editMode });
  }

  handleVote(isUpVote) {
    const { comment, upVoteComment, downVoteComment } = this.props;
    isUpVote
      ? upVoteComment({ id: comment.id })
      : downVoteComment({ id: comment.id });
  }

  handleUpdate() {
    const { comment } = this.props;

    // prevent update if no changes
    if (comment.body !== this.state.body) {
      this.setState({ isProcessing: true }, () => {
        setTimeout(() => {
          this.props.updateComment({ id: comment.id, body: this.state.body });
          this.setState({ isEditable: false }, () =>
            this.setState({ isProcessing: false })
          );
        }, 400); // small delay to display loader
      });
    } else this.setState({ isEditable: false });
  }

  handleChange(event) {
    this.setState({ body: event.target.value });
  }

  render() {
    const self = this;

    const {
      comment,
      confirmationModalElement,
      confirmed,
      openConfirmationModal
    } = self.props;
    const { body, isEditable, isLoading, isProcessing } = self.state;

    const showCommentForm = isEditable ? ' is-visible' : '';

    const isLeaving = comment.id === confirmationModalElement && confirmed;

    const hiddenClass = isLeaving ? ' is-leaving' : '';

    return (
      <Comment className={`my-comment${hiddenClass}`}>
        <Dimmer active={isLeaving || isLoading} inverted>
          <Loader />
        </Dimmer>
        <MyVote count={comment.voteScore} onVote={self.handleVote} />
        <Comment.Avatar
          src={getPhoto(comment.author, '35')}
          onLoad={self.handleImageLoaded}
        />
        <Comment.Content className={showCommentForm}>
          <Comment.Author as="span">{comment.author}</Comment.Author>
          <Comment.Metadata>
            <div>
              <Moment fromNow>{new Date(comment.timestamp)}</Moment>
            </div>
          </Comment.Metadata>
          <Comment.Text>{comment.body}</Comment.Text>
          <Form loading={isProcessing}>
            <Form.Field>
              <TextArea
                value={body}
                rows="2"
                onChange={event => self.handleChange(event)}
              />
            </Form.Field>
            <Form.Group className="comment-buttons">
              <Button
                basic
                color="grey"
                size="tiny"
                content="Cancel"
                onClick={() => self.handleToggleEditMode(comment)}
              />
              <Form.Button
                color="green"
                size="mini"
                onClick={self.handleUpdate}
                disabled={body === ''}
              >
                <Icon name="comment outline" />Update
              </Form.Button>
            </Form.Group>
          </Form>
          <Comment.Actions>
            <Comment.Action
              children={<Icon name="edit" />}
              onClick={() => self.handleToggleEditMode(comment)}
            />
            <Comment.Action
              children={<Icon name="trash" />}
              onClick={() =>
                openConfirmationModal({
                  elementType: 'comment',
                  id: comment.id
                })
              }
            />
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    );
  }
}

MyComment.propTypes = {
  comment: PropTypes.object.isRequired
};

function mapStateToProps({ confirmationModal }) {
  return {
    confirmationModalElement: confirmationModal.id,
    confirmed: confirmationModal.confirmed
  };
}

function mapDispatchToProps(dispatch) {
  return {
    upVoteComment: data => dispatch(upVoteComment(data)),
    downVoteComment: data => dispatch(downVoteComment(data)),
    updateComment: data => dispatch(updateComment(data)),
    openConfirmationModal: data => dispatch(openConfirmationModal(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyComment);
