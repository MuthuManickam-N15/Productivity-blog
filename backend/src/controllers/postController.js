const { validationResult } = require('express-validator');
const supabase = require('../config/supabase');

const normalizeSlug = (value) =>
  value
    .toString()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\x00-\x7F]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const formatTags = (input) => {
  if (Array.isArray(input)) {
    return input.map((tag) => tag?.toString().trim()).filter(Boolean);
  }

  if (typeof input === 'string') {
    return input
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
exports.getPosts = async (req, res, next) => {
  try {
    const { category, tag, search, featured, page = 1, limit = 10 } = req.query;
    let query = supabase
      .from('posts')
      .select('*, author:users(name, avatar, bio)', { count: 'exact' })
      .eq('published', true);

    if (category) query = query.eq('category', category);
    if (tag) query = query.contains('tags', [tag]);
    if (featured) query = query.eq('featured', featured === 'true');
    if (search) query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);

    const pageNumber = Number(page) || 1;
    const pageSize = Number(limit) || 10;
    const from = (pageNumber - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data: posts, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      count: posts.length,
      total: count || posts.length,
      totalPages: Math.ceil((count || posts.length) / pageSize),
      currentPage: pageNumber,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single post by slug
// @route   GET /api/posts/:slug
// @access  Public
exports.getPost = async (req, res, next) => {
  try {
    const { data: post, error } = await supabase
      .from('posts')
      .select('*, author:users(name, avatar, bio)')
      .eq('slug', req.params.slug)
      .single();

    if (error || !post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    const { error: updateError } = await supabase
      .from('posts')
      .update({ views: Number(post.views || 0) + 1 })
      .eq('id', post.id);

    if (updateError) {
      console.warn('Unable to increment post views:', updateError.message);
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single post by ID
// @route   GET /api/posts/id/:id
// @access  Private/Admin
exports.getPostById = async (req, res, next) => {
  try {
    const { data: post, error } = await supabase
      .from('posts')
      .select('*, author:users(name, avatar, bio)')
      .eq('id', req.params.id)
      .single();

    if (error || !post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create post
// @route   POST /api/posts
// @access  Private/Admin
exports.createPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const slug = normalizeSlug(req.body.title || req.body.slug || '');
    const tags = formatTags(req.body.tags);

    const { data: post, error } = await supabase
      .from('posts')
      .insert([
        {
          title: req.body.title,
          slug,
          excerpt: req.body.excerpt,
          content: req.body.content,
          category: req.body.category,
          tags,
          image: req.body.image,
          author_id: req.user.id,
          read_time: req.body.readTime || req.body.read_time || '',
          featured: req.body.featured || false,
          published: req.body.published || false,
        },
      ])
      .select('*, author:users(name, avatar, bio)')
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update post
// @route   PUT /api/posts/id/:id
// @access  Private/Admin
exports.updatePost = async (req, res, next) => {
  try {
    const { data: existingPost, error: fetchError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (fetchError || !existingPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    if (existingPost.author_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this post',
      });
    }

    const tags = formatTags(req.body.tags).length ? formatTags(req.body.tags) : existingPost.tags || [];
    const slug = req.body.title ? normalizeSlug(req.body.title) : existingPost.slug;

    const updates = {
      title: req.body.title || existingPost.title,
      slug,
      excerpt: req.body.excerpt || existingPost.excerpt,
      content: req.body.content || existingPost.content,
      category: req.body.category || existingPost.category,
      tags,
      image: req.body.image || existingPost.image,
      read_time: req.body.readTime || req.body.read_time || existingPost.read_time,
      featured: req.body.featured ?? existingPost.featured,
      published: req.body.published ?? existingPost.published,
      updated_at: new Date().toISOString(),
    };

    const { data: updatedPost, error: updateError } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', req.params.id)
      .select('*, author:users(name, avatar, bio)')
      .single();

    if (updateError) {
      throw updateError;
    }

    res.status(200).json({
      success: true,
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/id/:id
// @access  Private/Admin
exports.deletePost = async (req, res, next) => {
  try {
    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (fetchError || !post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    if (post.author_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this post',
      });
    }

    const { error: deleteError } = await supabase
      .from('posts')
      .delete()
      .eq('id', req.params.id);

    if (deleteError) {
      throw deleteError;
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
