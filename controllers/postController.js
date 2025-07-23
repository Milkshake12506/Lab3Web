const Post = require('../models/Post');

// GET all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Error getting posts' });
  }
};

// POST create new post
const createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ error: 'Error creating post' });
  }
};

// PUT update post
const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: 'Error updating post' });
  }
};

// DELETE post
const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: 'Error deleting post' });
  }
};

// GET post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID or error retrieving post' });
  }
};


module.exports = { getAllPosts, createPost, updatePost, deletePost, getPostById };
