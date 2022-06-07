const JWT = require("jsonwebtoken");
const BCRYPT = require("bcrypt");
const CONFIG = require("../config/auth.config");
const User = require("../models/user.model");
const { validateRegister, validateLogin } = require("../helpers/validateAuth");

const login = async (req, res) => {
  const { error } = validateLogin(req.body);

  if (error) {
    return res
      .status(409)
      .send({ message: `${error.details[0].message}`, status: 400 });
  }

  const { email, password } = req.body;

  User.findOne(
    {
      email,
    },
    async (err, user) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      let passwordIsValid = await BCRYPT.compareSync(password, user.password);

      if (!passwordIsValid) {
        return res.status(409).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      let token = JWT.sign({ id: user.id }, CONFIG.secret, {
        expiresIn: "1h",
      });

      res.status(200).send({
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        accessToken: token,
      });
    }
  );
};

const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  const { error } = validateRegister(req.body);

  if (error) {
    return res.status(409).send({ message: error.details[0].message });
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).send({ message: "Email already exists!!" });
  }

  const salt = await BCRYPT.genSalt(10);

  const newUser = await new User({
    first_name,
    last_name,
    email,
    password: await BCRYPT.hash(password, salt),
  });

  await newUser.save((err, user) => {
    if (err) {
      return res.status(500).send({
        message: `Error::Auth controller::${err.name} cannot save user`,
      });
    }
    res.status(200).send({
      id: user._id,
      message: "Success",
    });
  });
};

module.exports = {
  login,
  register,
};
