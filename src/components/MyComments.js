// React packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Components
import MyComment from './MyComment';
import { Comment, Form, Icon, Header, Button } from 'semantic-ui-react';
import { addComment } from '../actions';

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

  // componentDidMount() {
  //   this.getComments(this.props.post, comments => {
  //     // console.log(comments);
  //     this.setState({ comments });
  //   });
  // }

  // getComments(postID, callback) {
  //   fetch(`http://localhost:3001/posts/${postID}/comments`, {
  //     headers: { Authorization: 'monkey' }
  //   }).then(response => response.json().then(data => callback(data)));
  // }

  toggle(attribute) {
    const isShown = !this.state[attribute];
    if (attribute === 'showForm') {
      isShown
        ? this.setState({
            [attribute]: isShown,
            author: '',
            body: ''
          })
        : this.setState({ [attribute]: isShown });
    } else this.setState({ [attribute]: isShown });
  }

  handleChange(event, attribute) {
    this.setState({ [attribute]: event.target.value });
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4()
    );
  }

  onSubmit() {
    console.log('here');
    this.setState({ isProcessing: true }, () => {
      console.log(this.props.post);
      const { body, author } = this.state;
      setTimeout(() => {
        this.props.addComment({
          timestamp: Date.now(),
          id: this.guid(),
          parentId: this.props.post,
          body,
          author
        });
        this.setState({
          author: '',
          body: '',
          isProcessing: false,
          showForm: false
        });
      }, 200);
    });
  }

  render() {
    const self = this;

    const { author, body } = self.state;
    let { comments } = self.props;

    const isEnabled = author.length > 0 && body.length > 0;

    // Dynamic classes
    const showCommentForm = self.state.showForm ? ' is-visible' : '';
    const showMoreComments = self.state.showComments ? ' is-visible' : '';

    // Commnet message
    const commentMessage = `${
      comments.length > 0 ? comments.length : 'No '
    } Comment${comments.length === 1 ? '' : 's'}`;

    comments = comments.sort((x, y) => y.timestamp - x.timestamp);

    return (
      <Comment.Group>
        <a className="add-comment" onClick={() => self.toggle('showForm')}>
          <Icon name="comment outline" /> Comment
        </a>
        <Form
          loading={self.state.isProcessing}
          className={showCommentForm}
          reply
        >
          <Form.Input
            fluid
            placeholder="Name"
            value={self.state.author}
            onChange={event => self.handleChange(event, 'author')}
          />
          <Form.TextArea
            placeholder="Tell us what you think..."
            onChange={event => self.handleChange(event, 'body')}
          />
          <Form.Group>
            <Button
              basic
              color="grey"
              size="tiny"
              loading={false}
              content="Cancel"
              onClick={() => self.toggle('showForm')}
            />
            <Form.Button
              color="green"
              size="tiny"
              loading={false}
              disabled={!isEnabled}
              onClick={self.onSubmit.bind(self)}
            >
              <Icon name="comment outline" />Add Comment
            </Form.Button>
          </Form.Group>
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

function mapStateToProps({ comments }, myProps) {
  let formattedComments = [];
  Object.keys(comments).forEach(key => {
    if (comments[key].parentId === myProps.post)
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
