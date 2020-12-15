const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const Post = require('../models/post.model');
const { postSerializer, postCollectionSerializer } = require('../serializers/post.serializer');

exports.listPost = async (req, res, next) => {
  try {
    const { page } = req.query;
    const perPage = 5;
    const totalPosts = await Post.countDocuments();
    const posts = await Post.find()
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.json({
      message: 'Successfully',
      post: postCollectionSerializer(posts),
      totalPosts,
    });
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();

    res.json(postSerializer(savedPost));
  } catch (error) {
    next(error);
  }
};

exports.showPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        message: 'Post not found',
      });
    }
    res.json(postSerializer(post));
  } catch (error) {
    next(error);
  }
};

exports.editPost = async (req, res, next) => {
  try {
    const filter = { _id: req.params.id };
    const update = Object.entries(req.body)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    const post = await Post.findOneAndUpdate(filter, update, { new: true });
    res.json(postSerializer(post));
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const filter = { _id: req.params.id };
    const post = await Post.findOneAndRemove(filter);
    if (!post) {
      throw new APIError({
        status: httpStatus.NOT_FOUND,
        message: 'Post not found',
      });
    }

    const response = {
      message: 'Post successfully deleted',
      id: req.params.id,
    };
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};
