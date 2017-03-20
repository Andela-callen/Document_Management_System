const Helper = {
  transformUser(user)  {
    const details = {
      id: user.id,
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      roleId: user.roleId
    }
    return details;
  },

  pagination(result, offset, limit) {
    const paginated = {};

    paginated.page =  Math.floor(offset / limit) + 1;
    paginated.count = Math.ceil(result.count / limit);
    paginated.size = Number(limit);
    paginated.totalCount = result.count;

    return paginated;
  }
}




export default Helper;