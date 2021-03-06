const _ = require('lodash');
const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  
  if (!cookies || !cookies.jwt) return res.sendStatus(401);
  console.log(cookies.jwt);

  const refreshToken = cookies.jwt; 

  // find user
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); // Forbidden

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decode) => {
      if (error || !_.isEqual(decode.username, foundUser.username)) return res.sendStatus(403);

      const roles = Object.values(foundUser.roles);
      const accessToken = jwt.sign(
        {
          "UserInfo": { 
            "username": foundUser.username,
            "roles": roles
          }
        }
        ,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' }
      );

      res.json({ accessToken });
    }
  )
}

module.exports = { handleRefreshToken };