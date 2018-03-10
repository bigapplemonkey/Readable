// React packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import Vote from './Vote';
import { Comment, Icon } from 'semantic-ui-react';

class MyComment extends Component {
  getPhoto(id) {
    return `https://api.adorable.io/avatars/35/${id}.png`;
  }

  render() {
    const self = this;

    const comment = self.props.comment;

    return (
      <Comment>
        <Vote count={comment.count} handleVote={console.log} />
        <Comment.Avatar src={self.getPhoto(comment.poster)} />
        <Comment.Content>
          <Comment.Author as="a">{comment.poster}</Comment.Author>
          <Comment.Metadata>
            <div>{comment.date}</div>
          </Comment.Metadata>
          <Comment.Text>{comment.body}</Comment.Text>
          <Comment.Actions>
            <Comment.Action
              children={<Icon name="edit" />}
              onClick={() => self.props.handleCommentAction('edit', comment)}
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
