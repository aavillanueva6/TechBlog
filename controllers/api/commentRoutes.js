const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const user_id = req.session.user_id;
    req.body.user_id = user_id;

    const commentData = await Comment.create(req.body);

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
