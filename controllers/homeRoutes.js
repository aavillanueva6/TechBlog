const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
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

router.get('/dashboard', withAuth, async (req, res) => {
  // TODO: need to add login verification
  try {
    // Get all posts for the logged in user
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const userData = await User.findByPk(req.session.user_id);
    const username = userData.get({ plain: true }).username;
    console.log(username);

    // Serialize data so the template can read it
    const posts = postData.map((element) => element.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in,
      username,
    });
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
  res.render('newPost', { logged_in: req.session.logged_in });
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
  res.render('singlePost', {
    post,
    comments,
    logged_in: req.session.logged_in,
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
  res.render('editPost', { post, logged_in: req.session.logged_in });
});

module.exports = router;
