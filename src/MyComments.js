// React packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import MyComment from './MyComment';
import { Comment, Form, Icon, Header } from 'semantic-ui-react';

class MyComments extends Component {
  state = { visible: true, showAddComment: false, expandComments: false };

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

  render() {
    const self = this;

    const comments = self.comments;

    return (
      <Comment.Group>
        <a
          className="add-comment"
          onClick={() =>
            self.setState({
              showAddComment: !self.state.showAddComment
            })
          }
        >
          <Icon name="comment outline" /> Comment
        </a>
        <Form
          loading={false}
          className={this.state.showAddComment ? ' is-visible' : ''}
          reply
        >
          <Form.Input
            fluid
            placeholder="Name"
            onChange={event => console.log(event.target.value)}
            required
          />
          <Form.TextArea placeholder="Tell us what you think..." required />
          <Form.Button color="green" size="tiny" loading={false}>
            <Icon name="comment outline" />Add Comment
          </Form.Button>
        </Form>
        <Header as="h4" dividing>
          {comments.length > 0 ? comments.length : 'No '} Comment{comments.length ===
          1
            ? ''
            : 's'}
          {comments.length > 1 && (
            <a
              className="more"
              onClick={() =>
                this.setState({
                  expandComments: !self.state.expandComments
                })
              }
            >
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
          <div
            className={`more-comments${
              self.state.expandComments ? ' is-visible' : ''
            }`}
          >
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
