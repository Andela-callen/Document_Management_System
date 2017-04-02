const Helper = {
  transformUser(user)  {
    const details = {
      userId: user.id,
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      roleId: user.roleId
    }
    return details;
  },

  /**
   * @desc checkUser search users result from query
   * @param {Object} result object containing result from database
   * @param {String} key string  property from result
   * @param {String} value string value to search for in result
   * @returns {Boolean} true if value is found else returns false
   */
  checkUser(result, key, value) {
    return result.some((hasEmail) => {
      const obj = hasEmail.dataValues;
      return Object.prototype.hasOwnProperty.call(obj, key) && obj[key] === value;
    });
  },

  transfromDocument(document) {
    const docDetails = {
     userId: document.userId,
     title: document.title,
     content: document.content,
     access: document.access,
     createdAt: document.createdAt,
     updateAt: document.updatedAt
    };
    return docDetails;
  },

  pagination(result, offset, limit) {
    const paginated = {};

    paginated.page =  Math.floor(offset / limit) + 1;
    paginated.page_count = Math.ceil(result.count / limit);
    paginated.page_size = Number(limit > result.count ? result.count : limit);
    paginated.totalCount = result.count;
    

    return paginated;
  }
}




export default Helper;