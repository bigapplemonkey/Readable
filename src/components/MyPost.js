// React packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
// Components
import { Feed, Icon, Dimmer, Loader } from 'semantic-ui-react';
import MyComments from './MyComments';
import Vote from './Vote';
// Redux Actions
import { upVotePost, downVotePost, openConfirmationModal } from '../actions';

class MyPost extends Component {
  state = {
    isLoading: true
  };
  getPhoto(id) {
    return `https://api.adorable.io/avatars/47/${id}.png`;
  }

  imageLoaded() {
    this.setState({ isLoading: false });
  }

  componentWillUnmount() {
    //this.setState({ isLeaving: true });
    //console.log(this.props.post.author);
  }

  handleVote(isUpVote) {
    const { post, upVotePost, downVotePost } = this.props;
    isUpVote ? upVotePost({ id: post.id }) : downVotePost({ id: post.id });
  }

  render() {
    const self = this;

    const { post } = self.props;

    const hiddenClass = self.props.isLeaving ? ' is-leaving' : '';

    return (
      <Feed.Event className={hiddenClass}>
        <Dimmer active={self.props.isLeaving || self.state.isLoading} inverted>
          <Loader />
        </Dimmer>
        <div className="feed-actions">
          <a onClick={() => self.props.handlePostAction('edit', post)}>
            <Icon name="edit" />
          </a>
          <a
            onClick={() =>
              self.props.openConfirmationModal({
                elementType: 'post',
                id: post.id
              })
            }
          >
            <Icon name="delete" />
          </a>
        </div>
        <Feed.Label
          children={
            <div>
              <img
                alt=""
                src={self.getPhoto(post.author)}
                onLoad={self.imageLoaded.bind(self)}
              />
              <Vote
                count={post.voteScore}
                handleVote={self.handleVote.bind(self)}
              />
            </div>
          }
        />
        <Feed.Content>
          <Feed.Summary>
            <div className="poster-name">
              {post.author} posted{self.props.category.key === 'all' && (
                <span>
                  {' '}
                  in{' '}
                  <a
                    onClick={() =>
                      self.props.categoryClick({
                        key: post.category,
                        value:
                          post.category.charAt(0).toUpperCase() +
                          post.category.slice(1)
                      })
                    }
                  >
                    {post.category.charAt(0).toUpperCase() +
                      post.category.slice(1)}
                  </a>
                </span>
              )}
            </div>
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

function mapDispatchToProps(dispatch) {
  return {
    upVotePost: data => dispatch(upVotePost(data)),
    downVotePost: data => dispatch(downVotePost(data)),
    openConfirmationModal: data => dispatch(openConfirmationModal(data))
  };
}

export default connect(null, mapDispatchToProps)(MyPost);
