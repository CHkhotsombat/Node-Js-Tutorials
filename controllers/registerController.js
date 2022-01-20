const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({
      "message": "username and password are required."
    })
  }

  // check for duplicate username in the DB
  const duplicate = await User.findOne({ username: username }).exec();
  if (duplicate) return res.sendStatus(409);

  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);

    // create and store the new user
    const result = await User.create({
      "username": username,
      "password": hashedPwd
    });
    
    console.log(result);

    res.status(201).json({
      "message": `New users ${username} created.`
    })
  } catch (error) {
    res.status(500).json({
      "message": error.message
    })
  }
}

module.exports = { handleNewUser };
