// React packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Components
import MyComment from './MyComment';
import { Comment, Form, Icon, Header, Button } from 'semantic-ui-react';
// Actions
import { addComment } from '../actions';
// Helpers
import { sortBy } from '../utils/helpers';

class MyComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      showComments: false,
      isProcessing: false,
      author: '',
      body: ''
    };
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // togle comment form, toggle more comments
  toggle(attribute) {
    const isShown = !this.state[attribute];

    if (attribute === 'showForm' && isShown) {
      this.setState({
        [attribute]: isShown,
        author: '',
        body: ''
      });
    } else this.setState({ [attribute]: isShown });
  }

  // update state based on inputs
  handleChange(event, attribute) {
    this.setState({ [attribute]: event.target.value });
  }

  handleSubmit() {
    this.setState({ isProcessing: true }, () => {
      const { body, author } = this.state;
      const { postId } = this.props;

      setTimeout(() => {
        this.props.addComment({ parentId: postId, body, author });
        this.setState({
          author: '',
          body: '',
          isProcessing: false,
          showForm: false
        });
      }, 200); // small delay to display loader
    });
  }

  render() {
    const self = this;

    const { author, body, showForm, showComments, isProcessing } = self.state;
    let { comments } = self.props;

    const isEnabled = author.length > 0 && body.length > 0;

    // Dynamic classes
    const showCommentForm = showForm ? ' is-visible' : '';
    const showMoreComments = showComments ? ' is-visible' : '';

    // Commnet message
    const commentMessage = `${
      comments.length > 0 ? comments.length : 'No '
    } Comment${comments.length === 1 ? '' : 's'}`;

    comments = sortBy(comments);

    return (
      <Comment.Group>
        <a className="add-comment" onClick={() => self.toggle('showForm')}>
          <Icon name="comment outline" /> Comment
        </a>
        <Form loading={isProcessing} className={showCommentForm} reply>
          <Form.Input
            fluid
            placeholder="Name"
            value={author}
            onChange={event => self.handleChange(event, 'author')}
          />
          <Form.TextArea
            placeholder="Tell us what you think..."
            value={body}
            onChange={event => self.handleChange(event, 'body')}
          />
          <Form.Group>
            <Button
              basic
              color="grey"
              size="tiny"
              content="Cancel"
              onClick={() => self.toggle('showForm')}
            />
            <Form.Button
              color="green"
              size="tiny"
              disabled={!isEnabled}
              onClick={self.handleSubmit}
            >
              <Icon name="comment outline" />Add Comment
            </Form.Button>
          </Form.Group>
        </Form>
        <Header as="h4" dividing>
          {commentMessage}
          {comments.length > 1 && (
            <a className="more" onClick={() => self.toggle('showComments')}>
              ...{showComments ? 'less' : 'more'}
            </a>
          )}
        </Header>
        {comments.length > 0 && (
          <MyComment
            key={comments[0].id}
            comment={comments[0]}
            handleCommentAction={console.log}
          />
        )}
        {comments.length > 1 && (
          <div className={`more-comments${showMoreComments}`}>
            {comments
              .slice(1)
              .map(comment => (
                <MyComment
                  key={comment.id}
                  comment={comment}
                  handleCommentAction={console.log}
                />
              ))}
          </div>
        )}
      </Comment.Group>
    );
  }
}

MyComments.propTypes = {
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired
};

function mapStateToProps({ comments }, myProps) {
  let formattedComments = [];
  Object.keys(comments).forEach(key => {
    if (comments[key].parentId === myProps.postId)
      formattedComments.push({
        ...comments[key],
        id: key
      });
  });
  return { comments: formattedComments };
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: data => dispatch(addComment(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyComments);
