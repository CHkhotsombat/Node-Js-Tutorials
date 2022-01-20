const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({
      "message": "username and password are required."
    })
  }

  // find user
  const foundUser = await User.findOne({ username: username }).exec();
  if (!foundUser) return res.sendStatus(401); // Unauthorized

  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    // create JWT
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
    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    
    // Saving refresh token
    try {
      foundUser.refreshToken = refreshToken
      result = await foundUser.save();
    } catch (error) {
      return res.status(500).send(error);
    }
    
    res.cookie(
      'jwt', 
      refreshToken, 
      { 
        httpOnly: true, 
        sameSite: 'None',
        // secure: true,
        maxAge: (24 * 60 * 60 * 1000)
      }
    );
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
}

module.exports = { handleLogin };