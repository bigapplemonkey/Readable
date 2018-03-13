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
  DOWN_VOTE_COMMENT
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

function comment(state = initialComments, action) {
  const { id, parentId, timestamp, author, body } = action;
  switch (action.type) {
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
      return { ...state, [id]: { ...state[id], deleted: true } };

    case UPDATE_COMMENT:
      return { ...state, [id]: { ...state[id], body } };

    default:
      return state;
  }
}

function post(state = initialPosts, action) {
  const { id, timestamp, author, category, title, body } = action;
  switch (action.type) {
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
      return { ...state, [id]: { ...state[id], deleted: true } };

    case UPDATE_POST:
      return { ...state, [id]: { ...state[id], title, body } };

    default:
      return state;
  }
}

export default combineReducers({
  comment,
  post
});
