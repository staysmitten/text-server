
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/verifyToken');


/**
 *  [GET] /
 *  @description: Testing purposes for a protected route.
 */
router.get('/', 
  verifyToken,
  (req, res) => {  
    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
        res
          .status(200)
          .send(
            'This is a protected route. You should only see this if you are authenticated in.'
          );
      }
    });
  }
  );

// // Route to use once authentication is working
// router.get(
//   '/',
//   asyncWrapper(async (req, res) => {
//     const users = await userController.readMany();
//     return res.status(201).json(users);
//   })
// );

module.exports = router;