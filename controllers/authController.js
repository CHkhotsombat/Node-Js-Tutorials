const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.users = data }
}

const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({
      "message": "username and password are required."
    })
  }

  // find user
  const foundUser = usersDB.users.find(user => user.username === username);
  if (!foundUser) return res.sendStatus(401); // Unauthorized

  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    res.status(200).json({
      "message": `User ${username} logged in`
    })
  } else {
    res.sendStatus(401);
  }
}

module.exports = { handleLogin };