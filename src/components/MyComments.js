// React packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import MyComment from './MyComment';
import { Comment, Form, Icon, Header } from 'semantic-ui-react';

class MyComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      comments: [],
      showForm: false,
      showComments: false,
      author: '',
      body: ''
    };
    this.toggle = this.toggle.bind(this);
  }

  // comments = [
  //   {
  //     author: 'Matt',
  //     date: 'Today at 5:42PM',
  //     body: `How artistic!`,
  //     count: 5
  //   },
  //   {
  //     author: 'Elliot Fu',
  //     date: 'Yesterday at 12:30AM',
  //     body: `This has been very useful for my research. Thanks as
  //             well! This has been very useful for my research.
  //             Thanks as well! This has been very useful for my
  //             research. Thanks as well!`,
  //     count: 3
  //   },
  //   {
  //     author: 'Joe Henderson',
  //     date: '5 days ago',
  //     body: `Dude, this is awesome. Thanks so much`,
  //     count: -10
  //   }
  // ];

  componentDidMount() {
    this.getComments(this.props.post, comments => this.setState({ comments }));
  }

  getComments(postID, callback) {
    fetch(`http://localhost:3001/posts/${postID}/comments`, {
      headers: { Authorization: 'monkey' }
    }).then(response => response.json().then(data => callback(data)));
  }

  toggle(attribute) {
    this.setState({ [attribute]: !this.state[attribute] });
  }

  handleChange(event, attribute) {
    this.setState({ [attribute]: event.target.value });
  }

  render() {
    const self = this;

    const { author, body, comments } = self.state;

    const isEnabled = author.length > 0 && body.length > 0;

    // Dynamic classes
    const showCommentForm = self.state.showForm ? ' is-visible' : '';
    const showMoreComments = self.state.showComments ? ' is-visible' : '';

    // Commnet message
    const commentMessage = `${
      comments.length > 0 ? comments.length : 'No '
    } Comment${comments.length === 1 ? '' : 's'}`;

    return (
      <Comment.Group>
        <a className="add-comment" onClick={() => self.toggle('showForm')}>
          <Icon name="comment outline" /> Comment
        </a>
        <Form loading={false} className={showCommentForm} reply>
          <Form.Input
            fluid
            placeholder="Name"
            value={self.state.author}
            onChange={event => self.handleChange(event, 'author')}
            required
          />
          <Form.TextArea
            placeholder="Tell us what you think..."
            value={self.state.body}
            onChange={event => self.handleChange(event, 'body')}
            required
          />
          <Form.Button
            color="green"
            size="tiny"
            loading={false}
            disabled={!isEnabled}
          >
            <Icon name="comment outline" />Add Comment
          </Form.Button>
        </Form>
        <Header as="h4" dividing>
          {commentMessage}
          {comments.length > 1 && (
            <a className="more" onClick={() => self.toggle('showComments')}>
              ...{self.state.showComments ? 'less' : 'more'}
            </a>
          )}
        </Header>
        {comments.length > 0 && (
          <MyComment
            key={comments[0].author}
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
                  key={comment.author}
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

MyComments.propTypes = {};

export default MyComments;
