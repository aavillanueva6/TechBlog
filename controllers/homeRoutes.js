const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll();

    // Serialize data so the template can read it
    const posts = postData.map((element) => element.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
