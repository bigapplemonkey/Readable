// React packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
// Components
import Vote from './Vote';
import { Comment, Form, TextArea, Button, Icon } from 'semantic-ui-react';

class MyComment extends Component {
  state = {
    editable: false
  };

  getPhoto(id) {
    return `https://api.adorable.io/avatars/35/${id}.png`;
  }

  toggleEditMode(comment) {
    this.setState({ editable: !this.state.editable });
    this.props.handleCommentAction('edit', comment);
  }

  render() {
    const self = this;

    const comment = self.props.comment;

    const showCommentForm = self.state.editable ? ' is-visible' : '';

    return (
      <Comment>
        <Vote count={comment.voteScore} handleVote={console.log} />
        <Comment.Avatar src={self.getPhoto(comment.author)} />
        <Comment.Content className={showCommentForm}>
          <Comment.Author as="a">{comment.author}</Comment.Author>
          <Comment.Metadata>
            <div>
              <Moment fromNow>{new Date(comment.timestamp)}</Moment>
            </div>
          </Comment.Metadata>
          <Comment.Text>{comment.body}</Comment.Text>
          <Form loading={false}>
            <Form.Field>
              <TextArea defaultValue={comment.body} rows="2" />
            </Form.Field>
            <Form.Button color="green" size="mini" loading={false}>
              <Icon name="comment outline" />Update
            </Form.Button>
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

export default MyComment;
