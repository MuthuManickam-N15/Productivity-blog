const { validationResult } = require('express-validator');
const supabase = require('../config/supabase');

// @desc    Get comments for a post
// @route   GET /api/comments/:postId
// @access  Public
exports.getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const { data: comments, error } = await supabase
      .from('comments')
      .select('id,author,email,content,approved,created_at,post(title)')
      .eq('post_id', postId)
      .eq('approved', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create comment
// @route   POST /api/comments
// @access  Public
exports.createComment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { postSlug, author, email, content } = req.body;

    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('id')
      .eq('slug', postSlug)
      .maybeSingle();

    if (postError) {
      throw postError;
    }

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    const { data: comment, error } = await supabase
      .from('comments')
      .insert([
        {
          post_id: post.id,
          author,
          email,
          content,
          approved: false,
        },
      ])
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({
      success: true,
      data: comment,
      message: 'Comment submitted for approval',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve comment
// @route   PUT /api/comments/:id/approve
// @access  Private/Admin
exports.approveComment = async (req, res, next) => {
  try {
    const { data: comment, error } = await supabase
      .from('comments')
      .update({ approved: true })
      .eq('id', req.params.id)
      .select('*')
      .single();

    if (error || !comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
    }

    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private/Admin
exports.deleteComment = async (req, res, next) => {
  try {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all comments (admin only)
// @route   GET /api/comments/all
// @access  Private/Admin
exports.getAllComments = async (req, res, next) => {
  try {
    const { data: comments, error } = await supabase
      .from('comments')
      .select('id,author,email,content,approved,created_at,post(title)')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};
