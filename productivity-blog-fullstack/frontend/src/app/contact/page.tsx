import { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';
import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { FaTwitter, FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the ProductivityHub team. We\'d love to hear from you!',
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold font-heading mb-6">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Have a question, suggestion, or just want to say hello? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <ContactForm />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <EnvelopeIcon className="h-6 w-6 text-primary-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:hello@productivityhub.com"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600"
                    >
                      hello@productivityhub.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPinIcon className="h-6 w-6 text-primary-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      San Francisco, CA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="space-y-3">
                {[
                  { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com' },
                  { name: 'LinkedIn', icon: FaLinkedin, url: 'https://linkedin.com' },
                  { name: 'GitHub', icon: FaGithub, url: 'https://github.com' },
                  { name: 'YouTube', icon: FaYoutube, url: 'https://youtube.com' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                  >
                    <social.icon className="h-5 w-5 mr-3" />
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-primary-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-2">Response Time</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We typically respond within 24-48 hours during business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}