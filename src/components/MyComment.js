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

class MyComment extends Component {
  state = {
    editable: false,
    isProcessing: false,
    isLoading: true,
    body: ''
  };

  getPhoto(id) {
    return `https://api.adorable.io/avatars/35/${id}.png`;
  }

  imageLoaded() {
    this.setState({ isLoading: false });
  }

  toggleEditMode(comment) {
    const editMode = !this.state.editable;
    editMode
      ? this.setState({ editable: editMode, body: this.props.comment.body })
      : this.setState({ editable: editMode });
  }

  handleVote(isUpVote) {
    const { comment, upVoteComment, downVoteComment } = this.props;
    isUpVote
      ? upVoteComment({ id: comment.id })
      : downVoteComment({ id: comment.id });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ body: nextProps.comment.body });
  }

  handleUpdate() {
    const comment = this.props.comment;
    if (comment.body !== this.state.body) {
      this.setState({ isProcessing: true }, () => {
        setTimeout(() => {
          this.props.updateComment({ id: comment.id, body: this.state.body });
          this.setState({ editable: false }, () =>
            this.setState({ isProcessing: false })
          );
        }, 400);
      });
    } else this.setState({ editable: false });
  }

  render() {
    const self = this;

    const comment = self.props.comment;

    const showCommentForm = self.state.editable ? ' is-visible' : '';

    const isLeaving =
      comment.id === self.props.confirmationModalElement &&
      self.props.confirmed;

    const hiddenClass = isLeaving ? ' is-leaving' : '';

    return (
      <Comment className={`my-comment${hiddenClass}`}>
        <Dimmer active={isLeaving || self.state.isLoading} inverted>
          <Loader />
        </Dimmer>
        <MyVote count={comment.voteScore} onVote={self.handleVote.bind(self)} />
        <Comment.Avatar
          src={self.getPhoto(comment.author)}
          onLoad={self.imageLoaded.bind(self)}
        />
        <Comment.Content className={showCommentForm}>
          <Comment.Author as="a">{comment.author}</Comment.Author>
          <Comment.Metadata>
            <div>
              <Moment fromNow>{new Date(comment.timestamp)}</Moment>
            </div>
          </Comment.Metadata>
          <Comment.Text>{comment.body}</Comment.Text>
          <Form loading={self.state.isProcessing}>
            <Form.Field>
              <TextArea
                value={self.state.body}
                rows="2"
                onChange={event => self.setState({ body: event.target.value })}
              />
            </Form.Field>
            <Form.Group>
              <Button
                basic
                color="grey"
                size="tiny"
                loading={false}
                content="Cancel"
                onClick={() => self.toggleEditMode(comment)}
              />
              <Form.Button
                color="green"
                size="mini"
                loading={false}
                onClick={self.handleUpdate.bind(self)}
              >
                <Icon name="comment outline" />Update
              </Form.Button>
            </Form.Group>
          </Form>
          <Comment.Actions>
            <Comment.Action
              children={<Icon name="edit" />}
              onClick={() => self.toggleEditMode(comment)}
            />
            <Comment.Action
              children={<Icon name="delete" />}
              onClick={() =>
                self.props.openConfirmationModal({
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
  comment: PropTypes.object.isRequired,
  handleCommentAction: PropTypes.func.isRequired
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
