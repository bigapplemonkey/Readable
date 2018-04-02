import { guid } from './helpers';

const api = 'http://localhost:3001';

const headers = { Authorization: 'my-readable' };

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data);

export const getPosts = () =>
  fetch(`${api}/posts`, { headers }).then(res => res.json());

export const getPostsByCategory = category =>
  fetch(`${api}/${category}/posts`, { headers }).then(res => res.json());

export const createPost = post =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...post,
      id: guid(),
      timestamp: Date.now()
    })
  }).then(res => res.json());

export const votePost = (id, option) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ option })
  }).then(res => res.json());

export const updatePost = ({ id, title, body }) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body })
  }).then(res => res.json());

export const deletePost = id =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json());

export const getPostComments = id =>
  fetch(`${api}/posts/${id}/comments`, { headers }).then(res => res.json());

export const createComment = comment =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...comment,
      id: guid(),
      timestamp: Date.now()
    })
  }).then(res => res.json());

export const voteComment = (id, option) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ option })
  }).then(res => res.json());

export const updateComment = ({ id, body }) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ timestamp: Date.now(), body })
  }).then(res => res.json());

export const deleteComment = id =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json());
