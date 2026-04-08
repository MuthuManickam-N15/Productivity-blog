const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Post = require('../models/Post');

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany();
    await Post.deleteMany();
    console.log('Cleared existing data');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@productivityhub.com',
      password: 'password123', // Change this!
      role: 'admin',
      bio: 'Admin of ProductivityHub',
    });
    console.log('Created admin user');

    // Create sample posts
    const samplePosts = [
      {
        title: '10 Time Management Tips to Boost Your Productivity',
        slug: '10-time-management-tips',
        excerpt: 'Discover proven strategies to manage your time effectively.',
        content: '# Content here...',
        category: 'Time Management',
        tags: ['productivity', 'time management', 'tips'],
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200',
        author: admin._id,
        readTime: '5 min',
        published: true,
        featured: true,
      },
      {
        title: 'Best Productivity Tools for 2024',
        slug: 'best-productivity-tools-2024',
        excerpt: 'Explore the top productivity tools that can transform how you work.',
        content: '# Content here...',
        category: 'Productivity Tools',
        tags: ['tools', 'software', 'apps'],
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200',
        author: admin._id,
        readTime: '8 min',
        published: true,
        featured: true,
      },
      {
        title: 'How to Build a Morning Routine for Success',
        slug: 'morning-routine-success',
        excerpt: 'Learn how to create a powerful morning routine.',
        content: '# Content here...',
        category: 'Habits',
        tags: ['morning routine', 'habits', 'wellness'],
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200',
        author: admin._id,
        readTime: '6 min',
        published: true,
        featured: false,
      },
    ];

    await Post.insertMany(samplePosts);
    console.log('Created sample posts');

    console.log('\n✅ Database seeded successfully!');
    console.log('\nAdmin credentials:');
    console.log(`Email: ${admin.email}`);
    console.log('Password: password123');
    console.log('\n⚠️  Remember to change the password!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();