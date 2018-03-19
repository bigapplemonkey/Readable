export function getPhoto(id, size) {
  return `https://api.adorable.io/avatars/${size ? size : '47'}/${id}.png`;
}

export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
