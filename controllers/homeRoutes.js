const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // TODO: fix query to pull all required data (username associated with post)
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((element) => element.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  // TODO: need to add login verification
  try {
    // TODO: add logic to only pull posts by logged in user
    // Get all posts for the logged in user
    const postData = await Post.findAll();

    // Serialize data so the template can read it
    const posts = postData.map((element) => element.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dashboard', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/newpost', (req, res) => {
  res.render('newPost');
});

router.get('/singlepost/:id', async (req, res) => {
  const postData = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  });
  const post = postData.get({ plain: true });
  console.log(post);
  res.render('singlePost', post);
});

router.get('/editpost/:id', async (req, res) => {
  const postData = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  });
  const post = postData.get({ plain: true });
  console.log(post);
  res.render('editPost', post);
});

module.exports = router;
