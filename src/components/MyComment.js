// React packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
// Components
import Vote from './Vote';
import { Comment, Form, TextArea, Button, Icon } from 'semantic-ui-react';
// Redux Actions
import { upVoteComment, downVoteComment, updateComment } from '../actions';

class MyComment extends Component {
  state = {
    editable: false,
    isProcessing: false,
    body: ''
  };

  getPhoto(id) {
    return `https://api.adorable.io/avatars/35/${id}.png`;
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

    return (
      <Comment>
        <Vote
          count={comment.voteScore}
          handleVote={self.handleVote.bind(self)}
        />
        <Comment.Avatar src={self.getPhoto(comment.author)} />
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
              onClick={() => self.props.handleCommentAction('delete', comment)}
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

function mapDispatchToProps(dispatch) {
  return {
    upVoteComment: data => dispatch(upVoteComment(data)),
    downVoteComment: data => dispatch(downVoteComment(data)),
    updateComment: data => dispatch(updateComment(data))
  };
}

export default connect(null, mapDispatchToProps)(MyComment);
