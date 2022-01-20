const User = require('../model/User');

const handleLogout = async (req, res) => {
  // delete access token
  const cookies = req.cookies;
  if (!cookies || !cookies.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt; 

  // Is refresh token in DB?
  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true });
    return res.sendStatus(204);
  }
  
  // Delete refresh token in DB
  foundUser.refreshToken = null;
  result = await foundUser.save();

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