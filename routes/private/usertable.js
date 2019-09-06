const router = require('express').Router();
const passport = require('passport'); 

/**
 *  [GET] /
 *  @description: Testing purposes for a protected route.
 */
// router.get('/', (req, res) => {
//   res
//     .status(200)
//     .send(
//       'This is a protected route. You should only see this if you are authenticated in.'
//     );
// });
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ message: 'You made it!' });
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