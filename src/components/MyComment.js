// React packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
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
        <Vote count={comment.voteScore} handleVote={console.log} />
        <Comment.Avatar src={self.getPhoto(comment.author)} />
        <Comment.Content>
          <Comment.Author as="a">{comment.author}</Comment.Author>
          <Comment.Metadata>
            <div>
              <Moment fromNow>{new Date(comment.timestamp)}</Moment>
            </div>
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
