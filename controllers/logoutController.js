const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
  // delete access token
  const cookies = req.cookies;
  if (!cookies || !cookies.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt; 

  // Is refresh token in DB?
  const foundUser = usersDB.users.find(user => user.refreshToken === refreshToken);
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true });
    return res.sendStatus(204);
  }
  
  // Delete refresh token in DB
  const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
  const currentUser = { ...foundUser, refreshToken: '' };
  usersDB.setUsers([...otherUsers, currentUser]);

  await fsPromises.writeFile(
    path.join(__dirname, '..', 'model', 'users.json'),
    JSON.stringify(usersDB.users)
  );

  res.clearCookie(
    'jwt', 
    {
      httpOnly: true, 
      sameSite: 'None',
      // secure: true, // only serve on https
    }
  );
  res.sendStatus(204);
}

module.exports = { handleLogout };