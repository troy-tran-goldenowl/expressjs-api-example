const httpStatus = require('http-status');
const Post = require('../models/post.model');
const { postSerializer, postCollectionSerializer } = require('../serializers/post.serializer');

exports.listPost = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = 5;
    const totalPosts = await Post.countDocuments();
    const posts = await Post.find()
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.json({
      posts: postCollectionSerializer(posts),
      meta: { totalPosts },
    });
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();

    res.status(httpStatus.CREATED).json({ post: postSerializer(savedPost) });
  } catch (error) {
    next(error);
  }
};

exports.showPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    Post.checkIsValid(post);

    res.json(postSerializer(post));
  } catch (error) {
    next(error);
  }
};

exports.editPost = async (req, res, next) => {
  try {
    const filter = { _id: req.params.id };
    const post = await Post.findOneAndUpdate(filter, req.body, { new: true });
    Post.checkIsValid(post);

    res.json({ post: postSerializer(post) });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const filter = { _id: req.params.id };
    const post = await Post.findOneAndRemove(filter);
    Post.checkIsValid(post);

    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};
