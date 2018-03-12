// React packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
// Components
import { Feed, Icon, Dimmer, Loader } from 'semantic-ui-react';
import MyComments from './MyComments';
import Vote from './Vote';

class MyPost extends Component {
  state = {
    isLeaving: false
  };
  getPhoto(id) {
    return `https://api.adorable.io/avatars/47/${id}.png`;
  }

  componentWillUnmount() {
    this.setState({ isLeaving: true });
    //console.log(this.props.post.author);
  }

  render() {
    const self = this;

    const { post } = self.props;

    return (
      <Feed.Event>
        <Dimmer active={self.state.isLeaving} inverted>
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
              <img alt="" src={self.getPhoto(post.author)} />
              <Vote count={post.voteScore} handleVote={console.log} />
            </div>
          }
        />
        <Feed.Content>
          <Feed.Summary>
            <div className="poster-name">{post.author} posted</div>
            <Feed.Date>
              <Moment fromNow>{new Date(post.timestamp)}</Moment>
            </Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>
            <a>
              <h3>{post.title}</h3>
            </a>
            {post.body}
          </Feed.Extra>
          <MyComments post={post.id} />
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
