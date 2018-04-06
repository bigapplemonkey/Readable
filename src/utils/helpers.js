const REPOSITORY_NAME = window.location.origin.includes('localhost')
  ? ''
  : 'Readable';

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

export function sortBy(array, type = 'date') {
  switch (type) {
    case 'date':
      return array.sort((x, y) => y.timestamp - x.timestamp);
    case 'vote':
      return array.sort((x, y) => y.voteScore - x.voteScore);
    case 'name':
      return array.sort((x, y) => {
        const text1 = x.author.toUpperCase();
        const text2 = y.author.toUpperCase();
        return text1 < text2 ? -1 : text1 > text2 ? 1 : 0;
      });
    case 'title':
      return array.sort((x, y) => {
        const text1 = x.title.toUpperCase();
        const text2 = y.title.toUpperCase();
        return text1 < text2 ? -1 : text1 > text2 ? 1 : 0;
      });
    default:
      return array;
  }
}

export function getParams(originalPath) {
  console.log(originalPath);
  let path;
  if (originalPath.includes('/')) {
    path = REPOSITORY_NAME
      ? originalPath.replace(`/${REPOSITORY_NAME}`, '')
      : originalPath;
    path = path.replace('/', '');
  } else path = originalPath;

  const params = path.split('/');

  console.log({
    category: params[0] ? params[0] : 'all',
    postId: params[1] ? params[1] : null
  });
  return {
    category: params[0] ? params[0] : 'all',
    postId: params[1] ? params[1] : null
  };
}
