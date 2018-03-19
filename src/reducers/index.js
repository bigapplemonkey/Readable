import { combineReducers } from 'redux';
import {
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  UP_VOTE_POST,
  DOWN_VOTE_POST,
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

const initialPosts = {
  '8xf0y6ziyjabvozdd253nd': {
    author: 'thingtwo',
    body: 'Everyone says so after all.',
    category: 'react',
    deleted: false,
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    voteScore: 6
  },
  '6ni6ok3ym7mf1p33lnez': {
    author: 'thingone',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    category: 'redux',
    deleted: false,
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    voteScore: -5
  }
};

const initialComments = {
  '894tuq4ut84ut8v4t8wun89g': {
    author: 'thingtwo',
    body: 'Hi there! I am a COMMENT.',
    deleted: false,
    parentDeleted: false,
    parentId: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1468166872634,
    voteScore: 6
  },
  '8tu4bsun805n8un48ve89': {
    author: 'thingone',
    body: 'Comments. Are. Cool.',
    deleted: false,
    parentDeleted: false,
    parentId: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1469479767190,
    voteScore: -5
  }
};

const confirmationModalState = {
  show: false,
  elementType: '',
  id: '',
  confirmed: false
};

// Comment reducer
function comments(state = initialComments, action) {
  const { id, parentId, timestamp, author, body, type } = action;
  switch (type) {
    case ADD_COMMENT:
      return {
        ...state,
        [id]: {
          parentId,
          timestamp,
          author,
          body,
          deleted: false,
          parentDeleted: false,
          voteScore: 1
        }
      };

    case DELETE_COMMENT:
      let newState = Object.assign({}, state);
      delete newState[id];
      console.log(newState);
      return newState;

    case UPDATE_COMMENT:
      return { ...state, [id]: { ...state[id], body } };

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
function posts(state = initialPosts, action) {
  const { id, timestamp, author, category, title, body, type } = action;
  switch (type) {
    case ADD_POST:
      return {
        ...state,
        [id]: {
          timestamp,
          author,
          category,
          title,
          body,
          deleted: false,
          voteScore: 1
        }
      };

    case DELETE_POST:
      let newState = Object.assign({}, state);
      delete newState[id];
      console.log(newState);
      return newState;

    case UPDATE_POST:
      return { ...state, [id]: { ...state[id], title, body } };

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
