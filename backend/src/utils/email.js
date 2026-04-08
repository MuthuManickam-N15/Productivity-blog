const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send welcome email to newsletter subscriber
exports.sendWelcomeEmail = async (email) => {
  const mailOptions = {
    from: `"ProductivityHub" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Welcome to ProductivityHub Newsletter! 🎉',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; }
            .button { display: inline-block; background: #0ea5e9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to ProductivityHub!</h1>
            </div>
            <div class="content">
              <h2>Thanks for subscribing! 🎉</h2>
              <p>You're now part of our community of productivity enthusiasts.</p>
              <p>Here's what you can expect:</p>
              <ul>
                <li>📚 Weekly productivity tips and strategies</li>
                <li>🛠️ Tool reviews and recommendations</li>
                <li>💡 Expert insights on time management</li>
                <li>🎯 Exclusive content for subscribers</li>
              </ul>
              <a href="${process.env.FRONTEND_URL}/blog" class="button">Explore Our Blog</a>
              <p>Have questions? Just reply to this email – we'd love to hear from you!</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} ProductivityHub. All rights reserved.</p>
              <p><a href="${process.env.FRONTEND_URL}/unsubscribe">Unsubscribe</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Send contact form email to admin
exports.sendContactEmail = async ({ name, email, subject, message }) => {
  const mailOptions = {
    from: `"ProductivityHub Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    replyTo: email,
    subject: `Contact Form: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
            .header { background: #0ea5e9; color: white; padding: 20px; text-align: center; }
            .content { background: white; padding: 30px; margin: 20px 0; border-radius: 5px; }
            .info { background: #f0f9ff; padding: 15px; border-left: 4px solid #0ea5e9; margin: 15px 0; }
            .message { background: #fefefe; padding: 20px; border: 1px solid #e5e7eb; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="info">
                <p><strong>From:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              </div>
              <h3>Message:</h3>
              <div class="message">
                <p>${message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Send notification when new comment is posted
exports.sendCommentNotification = async (postTitle, commentAuthor) => {
  const mailOptions = {
    from: `"ProductivityHub" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Comment Awaiting Approval',
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>New Comment Received</h2>
            <p><strong>Post:</strong> ${postTitle}</p>
            <p><strong>Author:</strong> ${commentAuthor}</p>
            <p><a href="${process.env.FRONTEND_URL}/admin/comments">View in Admin Panel</a></p>
          </div>
        </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};