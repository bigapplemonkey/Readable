import * as API from '../utils/api';

// Post Actions
export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const UP_VOTE_POST = 'UP_VOTE_POST';
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST';
// Comment Actions
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT';
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT';
// UI Actions
export const OPEN_CONFIRMATION_MODAL = 'OPEN_CONFIRMATION_MODAL';
export const CLOSE_CONFIRMATION_MODAL = 'CLOSE_CONFIRMATION_MODAL';
export const CONFIRM_CONFIRMATION_MODAL = 'CONFIRM_CONFIRMATION_MODAL';
export const CLEAR_CONFIRMATION_MODAL = 'CLEAR_CONFIRMATION_MODAL';

// Post Actions
export const getPosts = () => dispatch =>
  API.getPosts().then(posts =>
    dispatch({
      type: GET_POSTS,
      posts
    })
  );

export const addPost = ({ author, category, title, body }) => dispatch =>
  API.createPost({ author, category, title, body }).then(post =>
    dispatch({
      type: ADD_POST,
      post
    })
  );

export const updatePost = ({ id, title, body }) => dispatch =>
  API.updatePost({ id, title, body }).then(post =>
    dispatch({
      type: UPDATE_POST,
      post
    })
  );

export const deletePost = ({ id }) => dispatch =>
  API.deletePost(id).then(post =>
    dispatch({
      type: DELETE_POST,
      id: post.id
    })
  );

export const upVotePost = ({ id }) => dispatch =>
  API.votePost(id, 'upVote').then(post =>
    dispatch({
      type: UP_VOTE_POST,
      id: post.id
    })
  );

export const downVotePost = ({ id }) => dispatch =>
  API.votePost(id, 'downVote').then(post =>
    dispatch({
      type: DOWN_VOTE_POST,
      id: post.id
    })
  );

// Comment Actions
export const getPostComments = id => dispatch =>
  API.getPostComments(id).then(comments =>
    dispatch({
      type: GET_POST_COMMENTS,
      comments
    })
  );

export const addComment = ({ parentId, timestamp, author, body }) => dispatch =>
  API.createComment({ parentId, timestamp, author, body }).then(comment =>
    dispatch({
      type: ADD_COMMENT,
      comment
    })
  );

export const deleteComment = ({ id }) => dispatch =>
  API.deleteComment(id).then(comment =>
    dispatch({
      type: DELETE_COMMENT,
      id: comment.id
    })
  );

export const updateComment = ({ id, title, body }) => dispatch =>
  API.updateComment({ id, title, body }).then(comment =>
    dispatch({
      type: UPDATE_COMMENT,
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body
    })
  );

export const upVoteComment = ({ id }) => dispatch =>
  API.voteComment(id, 'upVote').then(comment =>
    dispatch({
      type: UP_VOTE_COMMENT,
      id: comment.id
    })
  );

export const downVoteComment = ({ id }) => dispatch =>
  API.voteComment(id, 'downVote').then(comment =>
    dispatch({
      type: DOWN_VOTE_COMMENT,
      id: comment.id
    })
  );

// UI Actions
export function openConfirmationModal({ elementType, id }) {
  return {
    type: OPEN_CONFIRMATION_MODAL,
    elementType,
    id
  };
}

export function closeConfirmationModal() {
  return {
    type: CLOSE_CONFIRMATION_MODAL
  };
}

export function confirmConfirmationModal() {
  return {
    type: CONFIRM_CONFIRMATION_MODAL
  };
}

export function clearConfirmationModal() {
  return {
    type: CLEAR_CONFIRMATION_MODAL
  };
}
