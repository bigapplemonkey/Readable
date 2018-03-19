// Post Actions
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const UP_VOTE_POST = 'UP_VOTE_POST';
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST';
// Comment Actions
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

export function addPost({ id, timestamp, author, category, title, body }) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    author,
    category,
    title,
    body
  };
}

export function deletePost({ id }) {
  return {
    type: DELETE_POST,
    id
  };
}

export function updatePost({ id, title, body }) {
  return {
    type: UPDATE_POST,
    id,
    title,
    body
  };
}

export function upVotePost({ id }) {
  return {
    type: UP_VOTE_POST,
    id
  };
}

export function downVotePost({ id }) {
  return {
    type: DOWN_VOTE_POST,
    id
  };
}

export function addComment({ id, parentId, timestamp, author, body }) {
  return {
    type: ADD_COMMENT,
    id,
    timestamp,
    parentId,
    author,
    body
  };
}

export function deleteComment({ id }) {
  return {
    type: DELETE_COMMENT,
    id
  };
}

export function updateComment({ id, title, body }) {
  return {
    type: UPDATE_COMMENT,
    id,
    body
  };
}

export function upVoteComment({ id }) {
  return {
    type: UP_VOTE_COMMENT,
    id
  };
}

export function downVoteComment({ id }) {
  return {
    type: DOWN_VOTE_COMMENT,
    id
  };
}

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
