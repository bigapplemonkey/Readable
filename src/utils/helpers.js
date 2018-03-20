export function getPhoto(id, size) {
  return `https://api.adorable.io/avatars/${size ? size : '47'}/${id}.png`;
}

export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Create GUID
// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export function guid() {
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

export function sortBy(array, type = 'date', attribute = 'timestamp') {
  switch (type) {
    case 'date':
      return array.sort((x, y) => y[attribute] - x[attribute]);
    default:
      return array;
  }
}
