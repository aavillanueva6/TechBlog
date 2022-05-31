const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
  try {
    // create a new post from body of request

    // add the user_id to the request body object so that it can be passed in to the create method.
    const user_id = req.session.user_id;
    req.body.user_id = user_id;

    const postData = await Post.create(req.body);

    res.status(200).json({ post: postData, message: 'post created!' });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    const postData = await Post.update(
      { title: `${req.body.title}`, body: `${req.body.body}` },
      { where: { id: req.params.id } }
    );
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    console.log(req.session.user_id);
    const response = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!response) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
