const { validationResult } = require('express-validator');
const supabase = require('../config/supabase');
const { sendWelcomeEmail } = require('../utils/email');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
exports.subscribe = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email } = req.body;

    const { data: existingSubscriber, error: existingError } = await supabase
      .from('newsletter')
      .select('id,active')
      .eq('email', email)
      .maybeSingle();

    if (existingError) {
      throw existingError;
    }

    if (existingSubscriber) {
      if (existingSubscriber.active) {
        return res.status(400).json({
          success: false,
          message: 'Email already subscribed',
        });
      }

      const { error: reactivateError } = await supabase
        .from('newsletter')
        .update({ active: true, subscribed_at: new Date().toISOString() })
        .eq('id', existingSubscriber.id);

      if (reactivateError) {
        throw reactivateError;
      }

      return res.status(200).json({
        success: true,
        message: 'Subscription reactivated',
      });
    }

    const { error: insertError } = await supabase
      .from('newsletter')
      .insert([
        {
          email,
          active: true,
          subscribed_at: new Date().toISOString(),
        },
      ]);

    if (insertError) {
      throw insertError;
    }

    try {
      await sendWelcomeEmail(email);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Unsubscribe from newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
exports.unsubscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    const { data: subscriber, error } = await supabase
      .from('newsletter')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email not found',
      });
    }

    const { error: updateError } = await supabase
      .from('newsletter')
      .update({ active: false })
      .eq('id', subscriber.id);

    if (updateError) {
      throw updateError;
    }

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all subscribers (admin only)
// @route   GET /api/newsletter/subscribers
// @access  Private/Admin
exports.getSubscribers = async (req, res, next) => {
  try {
    const { data: subscribers, error } = await supabase
      .from('newsletter')
      .select('id,email,active,subscribed_at')
      .order('subscribed_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error) {
    next(error);
  }
};
