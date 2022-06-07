const BCRYPT = require("bcrypt");
const User = require("../models/user.model");
const { validateRegister } = require("../helpers/validateAuth");

const getUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.send({ message: err });
    }
    res.status(200).send({
      users,
      message: "Success",
    });
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  User.deleteOne({ _id: id }, (err, user) => {
    if (err) {
      return res.status(400).send({
        message: "Cannot delete user",
      });
    }
    res.status(201).send({
      message: `User ${user} get deleted`,
    });
  });
};

const getUserDetail = async (req, res) => {
  const { id } = req.params;
  User.findById(id, (err, user) => {
    if (err) {
      return res.status(400).send({
        message: "Cannot get user detail",
      });
    }
    res.status(200).send({
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  });
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, password } = req.body;

  const { error } = validateRegister(req.body);

  if (error) {
    return res.status(409).send({ message: error.details[0].message });
  }

  const salt = await BCRYPT.genSalt(10);

  const newUser = {
    first_name,
    last_name,
    email,
    password: await BCRYPT.hash(password, salt),
  };
  User.findOneAndUpdate({ _id: id }, newUser, (err, user) => {
    if (err) {
      return res.status(500).send({
        message: `${err}`,
      });
    }
    return res.status(200).send({
      message: "User data successfuly updated",
    });
  });
};

const addUser = async (req, res) => {
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
  deleteUser,
  getUsers,
  getUserDetail,
  editUser,
  addUser,
};
