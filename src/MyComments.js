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
      showForm: false,
      showComments: false,
      poster: '',
      body: ''
    };
    this.toggle = this.toggle.bind(this);
  }

  comments = [
    {
      poster: 'Matt',
      date: 'Today at 5:42PM',
      body: `How artistic!`,
      count: 5
    },
    {
      poster: 'Elliot Fu',
      date: 'Yesterday at 12:30AM',
      body: `This has been very useful for my research. Thanks as
              well! This has been very useful for my research.
              Thanks as well! This has been very useful for my
              research. Thanks as well!`,
      count: 3
    },
    {
      poster: 'Joe Henderson',
      date: '5 days ago',
      body: `Dude, this is awesome. Thanks so much`,
      count: -10
    }
  ];

  toggle(attribute) {
    this.setState({ [attribute]: !this.state[attribute] });
  }

  handleChange(event, attribute) {
    this.setState({ [attribute]: event.target.value });
  }

  render() {
    const self = this;

    const comments = self.comments;
    const { poster, body } = self.state;

    const isEnabled = poster.length > 0 && body.length > 0;

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
            value={self.state.poster}
            onChange={event => self.handleChange(event, 'poster')}
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
              ...more
            </a>
          )}
        </Header>
        {comments.length > 0 && (
          <MyComment
            key={comments[0].poster}
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
                  key={comment.poster}
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
