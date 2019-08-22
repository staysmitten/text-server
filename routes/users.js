// var express = require('express');
// var router = express.Router();
const router = require('express').Router();
const asyncWrapper = require('../middleware/asyncWrapper');
const userController = require('../controllers/user.controller');

// GET users listing. WITH ASYNC WRAPPER
router.get(
  '/',
  asyncWrapper(async (req, res) => {
    const users = await userController.readMany();
    return res.status(201).json(users);
  })
);

router.post(
  '/add',
  asyncWrapper(async (req, res) => {
    const user = {
      fullName: req.body.fullName,
      number: req.body.number,
      partnerFullName: req.body.partnerFullName,
      partnerNumber: req.body.partnerNumber,
      email: req.body.email,
    };

    const createdUser = await userController.createOne(user);

    const userObj = createdUser.toObject();
    return res.status(201).json({ message: 'User successfully created', user: userObj });
  })
);

module.exports = router;
