import { combineReducers } from 'redux';
import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  UP_VOTE_POST,
  DOWN_VOTE_POST,
  GET_POST_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  UP_VOTE_COMMENT,
  DOWN_VOTE_COMMENT,
  OPEN_CONFIRMATION_MODAL,
  CLOSE_CONFIRMATION_MODAL,
  CONFIRM_CONFIRMATION_MODAL,
  CLEAR_CONFIRMATION_MODAL
} from '../actions';

const confirmationModalState = {
  show: false,
  elementType: '',
  id: '',
  confirmed: false
};

// Comment reducer
function comments(state = {}, action) {
  const { id, comment, timestamp, body, type, comments } = action;
  switch (type) {
    case GET_POST_COMMENTS:
      const fetchedComments = comments.reduce((accumulator, item) => {
        accumulator[item.id] = item;
        return accumulator;
      }, {});
      return Object.assign(fetchedComments, state);

    case ADD_COMMENT:
      return {
        ...state,
        [comment.id]: comment
      };

    case DELETE_COMMENT:
      let newState = Object.assign({}, state);
      delete newState[id];
      return newState;

    case UPDATE_COMMENT:
      return { ...state, [id]: { ...state[id], timestamp, body } };

    case UP_VOTE_COMMENT:
      return {
        ...state,
        [id]: { ...state[id], voteScore: ++state[id]['voteScore'] }
      };

    case DOWN_VOTE_COMMENT:
      return {
        ...state,
        [id]: { ...state[id], voteScore: --state[id]['voteScore'] }
      };

    default:
      return state;
  }
}

// Post reducer
function posts(state = {}, action) {
  const { type, id, post, posts } = action;
  switch (type) {
    case GET_POSTS:
      return posts.reduce((accumulator, item) => {
        accumulator[item.id] = item;
        return accumulator;
      }, {});

    case ADD_POST:
      return {
        ...state,
        [post.id]: post
      };

    case UPDATE_POST:
      return {
        ...state,
        [post.id]: post
      };

    case DELETE_POST:
      let newState = Object.assign({}, state);
      delete newState[id];
      return newState;

    case UP_VOTE_POST:
      return {
        ...state,
        [id]: { ...state[id], voteScore: ++state[id]['voteScore'] }
      };

    case DOWN_VOTE_POST:
      return {
        ...state,
        [id]: { ...state[id], voteScore: --state[id]['voteScore'] }
      };

    default:
      return state;
  }
}

// UI reducer
function confirmationModal(state = confirmationModalState, action) {
  const { type, id, elementType } = action;
  switch (type) {
    case OPEN_CONFIRMATION_MODAL:
      return {
        ...state,
        elementType,
        id,
        show: true
      };
    case CLOSE_CONFIRMATION_MODAL:
      return {
        ...state,
        show: false
      };
    case CONFIRM_CONFIRMATION_MODAL:
      return {
        ...state,
        confirmed: true
      };
    case CLEAR_CONFIRMATION_MODAL:
      return {
        ...state,
        confirmed: false,
        elementType: '',
        id: ''
      };
    default:
      return state;
  }
}

export default combineReducers({
  comments,
  posts,
  confirmationModal
});
