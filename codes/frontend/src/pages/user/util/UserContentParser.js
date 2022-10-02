/**
 * 
 * @param {Object} content Content of the paged response
 * @returns parsed content list
 */
export function UserContentParser(content) {
  const newContent = content.map((user, index) => {

    const readList = user.readList.map((book, index) => {
      return {
        ...book,
        key: index,
        publicationDate: book.publicationDate.slice(0, 10)
      }
    });

    const favoriteList = user.favoriteList.map((book, index) => {
      return {
        ...book,
        key: index,
        publicationDate: book.publicationDate.slice(0, 10)
      }
    });

    const roles = user.roles.map((role, index) => {
      return {
        ...role,
        key: index
      }
    });

    return ({
      ...user,
      key: index,
      readList: readList,
      favoriteList: favoriteList,
      roles: roles
    });
  });

  return newContent;
}

/**
 * 
 * @param {Object} users list of users
 * @returns new user list
 */
export function UserListParser(users) {
  const newList = users.map((user, index) => {
    
    const readList = user.readList.map((book, index) => {
      return {
        ...book,
        key: index,
        publicationDate: book.publicationDate.slice(0, 10)
      }
    });

    const favoriteList = user.favoriteList.map((book, index) => {
      return {
        ...book,
        key: index,
        publicationDate: book.publicationDate.slice(0, 10)
      }
    });

    const roles = user.roles.map((role, index) => {
      return {
        ...role,
        key: index
      }
    });

    return ({
      ...user,
      key: index,
      readList: readList,
      favoriteList: favoriteList,
      roles: roles
    });
  });

  return newList;
}