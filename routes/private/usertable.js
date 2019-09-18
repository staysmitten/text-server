
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/verifyToken');
const userController = require('../../controllers/user.controller');


/**
 *  [GET] 
 *  @description: Testing purposes for a protected route.
 */
router.get('/', 
  verifyToken,
  (req, res) => {  
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
        const users = await userController.readMany();
        return res.status(201).json(users);
      }
    });
  }
);

module.exports = router;