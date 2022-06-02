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

      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    if (err.errors[0].path === 'username') {
      console.log(err.errors[0].path);
      res.status(409).json(err);
    } else if (err.errors[0].path === 'password') {
      console.log(err.errors[0].path);
      res.status(406).json(err);
    } else {
      res.status(400).json(err);
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    // check if entered username exists
    if (!userData) {
      res
        .status(406)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // check password against db
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(406)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
