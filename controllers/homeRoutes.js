const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    console.log(req.session.logged_in);

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
    const posts = await postData.map((element) => element.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { posts, logged_in: req.session.logged_in });
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
    res.render('dashboard', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
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
      {
        model: Comment,
        include: [User],
      },
    ],
  });

  const post = postData.get({ plain: true });
  const comments = post.comments;
  console.log(post);
  console.log(comments);
  res.render('singlePost', {
    post,
    comments,
  });
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
