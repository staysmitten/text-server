
const router = require('express').Router();
const jwt = require('jsonwebtoken');
// const passport = require('passport');
const verifyToken = require('../../middleware/verifyToken');

const asyncWrapper = require('../../middleware/asyncWrapper');


/**
 *  [GET] /
 *  @description: Testing purposes for a protected route.
 */
router.get('/', 
  // passport.authenticate('jwt', { session: false }),
  // asyncWrapper((req, res) => {
  //   res
  //     .status(200)
  //     .send(
  //       'This is a protected route. You should only see this if you are authenticated in.'
  //     );
  // })
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