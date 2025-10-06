const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  featuredImage: { type: String },
  author: {
    name: String,
    avatar: String,
    bio: String
  },
  category: { type: String, required: true },
  tags: [String],
  readTime: Number,
  published: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);