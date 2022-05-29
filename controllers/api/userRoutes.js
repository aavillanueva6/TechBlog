const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    // create a new user from body of request
    const userData = await User.create(req.body);

    // set new user to logged in.
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
    });

    res.status(200).json({ user: userData, message: 'You are now logged in!' });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
  } else {
    res.status(404).end();
  }
});

module.exports = router;
