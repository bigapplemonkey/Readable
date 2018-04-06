// React packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Components
import { Feed, Icon, Dimmer, Loader } from 'semantic-ui-react';
import MyComments from './MyComments';
import MyVote from './MyVote';
// Redux Actions
import {
  upVotePost,
  downVotePost,
  getPostComments,
  openConfirmationModal
} from '../actions';
// Helpers
import { getPhoto, capitalize } from '../utils/helpers';

class MyPost extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    const { post, getPostComments } = this.props;
    getPostComments(post.id);
  }

  // remove loader when image loaded
  imageLoaded() {
    this.setState({ isLoading: false });
  }

  // handle votes
  handleVote(isUpVote) {
    const { post, upVotePost, downVotePost } = this.props;
    isUpVote ? upVotePost({ id: post.id }) : downVotePost({ id: post.id });
  }

  render() {
    const self = this;

    const {
      post,
      category,
      isLeaving,
      onPostAction,
      openConfirmationModal,
      onCategoryClick,
      onOpenPost,
      isClickable
    } = self.props;

    const { isLoading } = self.state;

    // Dynamic class
    const hiddenClass = isLeaving ? ' is-leaving' : '';

    return (
      <Feed.Event className={hiddenClass}>
        <Dimmer active={isLeaving || isLoading} inverted>
          <Loader />
        </Dimmer>
        <div className="feed-actions">
          <a onClick={() => onPostAction('edit', post)}>
            <Icon name="edit" />
          </a>
          <a
            onClick={() =>
              openConfirmationModal({
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
                alt="User"
                src={getPhoto(post.author, '47')}
                onLoad={self.imageLoaded.bind(self)}
              />
              <MyVote
                count={post.voteScore}
                onVote={self.handleVote.bind(self)}
                otherClass="post-vote"
              />
            </div>
          }
        />
        <Feed.Content>
          <Feed.Summary>
            <div className="poster-name">
              {post.author} posted{category.key === 'all' && (
                <span>
                  {' '}
                  in{' '}
                  <Link
                    to={`${process.env.PUBLIC_URL}/${post.category}`}
                    onClick={() =>
                      onCategoryClick({
                        key: post.category,
                        value: capitalize(post.category)
                      })
                    }
                  >
                    {' '}
                    {capitalize(post.category)}
                  </Link>
                </span>
              )}
            </div>
            <Feed.Date>
              <Moment fromNow>{new Date(post.timestamp)}</Moment>
            </Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>
            {isClickable ? (
              <Link
                to={`${process.env.PUBLIC_URL}/${category.key}/${post.id}`}
                onClick={() => onOpenPost(post)}
              >
                <h3>{post.title}</h3>
              </Link>
            ) : (
              <h3>{post.title}</h3>
            )}
            {post.body}
          </Feed.Extra>
          <MyComments postId={post.id} />
        </Feed.Content>
      </Feed.Event>
    );
  }
}

MyPost.propTypes = {
  post: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  isLeaving: PropTypes.bool,
  onPostAction: PropTypes.func.isRequired,
  openConfirmationModal: PropTypes.func.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
  onOpenPost: PropTypes.func,
  isClickable: PropTypes.bool,
  getPostComments: PropTypes.func.isRequired,
  upVotePost: PropTypes.func.isRequired,
  downVotePost: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    getPostComments: data => dispatch(getPostComments(data)),
    upVotePost: data => dispatch(upVotePost(data)),
    downVotePost: data => dispatch(downVotePost(data)),
    openConfirmationModal: data => dispatch(openConfirmationModal(data))
  };
}

export default connect(null, mapDispatchToProps)(MyPost);
