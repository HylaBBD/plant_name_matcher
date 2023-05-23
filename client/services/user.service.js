module.exports.userService = {
  login: async (username, password) => {
    const loginDetails = await fetch(`http://localhost:8000/user/${username}`);
    console.log(loginDetails);
    return loginDetails;
  },
  register: async () => {},
};
