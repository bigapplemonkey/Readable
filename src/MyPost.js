// React packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import { Feed, Icon, Dimmer, Loader } from 'semantic-ui-react';
import MyComments from './MyComments';
import Vote from './Vote';

class MyPost extends Component {
  getPhoto(id) {
    return `https://api.adorable.io/avatars/47/${id}.png`;
  }

  render() {
    const self = this;

    const { post } = self.props;

    return (
      <Feed.Event>
        <Dimmer active={false} inverted>
          <Loader />
        </Dimmer>
        <div className="feed-actions">
          <a onClick={() => self.props.handlePostAction('edit', post)}>
            <Icon name="edit" />
          </a>
          <a onClick={() => self.props.handlePostAction('delete', post)}>
            <Icon name="delete" />
          </a>
        </div>
        <Feed.Label
          children={
            <div>
              <img alt="" src={self.getPhoto(post.poster)} />
              <Vote count={post.count} handleVote={console.log} />
            </div>
          }
        />
        <Feed.Content>
          <Feed.Summary>
            <div className="poster-name">{post.poster} posted</div>
            <Feed.Date>{post.date}</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>
            <a>
              <h3>{post.title}</h3>
            </a>
            {post.body}
          </Feed.Extra>
          <MyComments />
        </Feed.Content>
      </Feed.Event>
    );
  }
}

MyPost.propTypes = {
  // comment: PropTypes.object.isRequired,
  // handleCommentAction: PropTypes.func.isRequired
};

export default MyPost;
