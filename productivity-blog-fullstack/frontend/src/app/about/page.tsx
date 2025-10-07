import Image from 'next/image';
import { Metadata } from 'next';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about ProductivityHub and our mission to help you boost your productivity.',
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold font-heading mb-6">
            About <span className="text-gradient">ProductivityHub</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            We're on a mission to help professionals and entrepreneurs master their time
            and achieve their goals through proven productivity strategies.
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src="/images/about-hero.jpg"
                alt="About ProductivityHub"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                ProductivityHub was founded in 2023 with a simple belief: everyone deserves
                to work smarter, not harder. We've seen too many talented individuals
                struggle with time management and burnout.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Through research-backed articles, tool reviews, and actionable strategies,
                we help our readers reclaim their time and focus on what truly matters.
              </p>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-primary-50 dark:bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-400">
                To provide actionable, science-backed productivity insights that empower
                individuals to achieve more while maintaining work-life balance.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-400">
                A world where people work with purpose, manage their time effectively,
                and live fulfilling lives both professionally and personally.
              </p>
            </div>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Evidence-Based',
                  description: 'All our advice is backed by research and real-world testing.',
                },
                {
                  title: 'Practical',
                  description: 'We focus on actionable strategies you can implement today.',
                },
                {
                  title: 'Transparent',
                  description: 'Honest reviews and recommendations with no hidden agendas.',
                },
              ].map((value) => (
                <div key={value.title} className="text-center">
                  <h4 className="text-xl font-bold mb-3">{value.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'John Doe',
                role: 'Founder & Editor',
                image: '/images/team/john.jpg',
                bio: 'Productivity consultant with 10+ years of experience helping teams optimize their workflow.',
                social: {
                  twitter: 'https://twitter.com/johndoe',
                  linkedin: 'https://linkedin.com/in/johndoe',
                  github: 'https://github.com/johndoe',
                },
              },
              {
                name: 'Jane Smith',
                role: 'Content Writer',
                image: '/images/team/jane.jpg',
                bio: 'Former software engineer turned productivity writer. Passionate about time management.',
                social: {
                  twitter: 'https://twitter.com/janesmith',
                  linkedin: 'https://linkedin.com/in/janesmith',
                },
              },
              {
                name: 'Mike Johnson',
                role: 'Tool Reviewer',
                image: '/images/team/mike.jpg',
                bio: 'Tech enthusiast who has tested over 100 productivity apps and tools.',
                social: {
                  twitter: 'https://twitter.com/mikejohnson',
                  linkedin: 'https://linkedin.com/in/mikejohnson',
                },
              },
            ].map((member) => (
              <div
                key={member.name}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
              >
                <div className="relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-center mb-1">{member.name}</h3>
                <p className="text-primary-600 dark:text-primary-400 text-center mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm text-center mb-4">
                  {member.bio}
                </p>
                <div className="flex justify-center space-x-4">
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      <FaTwitter className="h-5 w-5" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      <FaLinkedin className="h-5 w-5" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      <FaGithub className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-20 text-center bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-primary-100 mb-6">
            Get weekly productivity tips and exclusive content delivered to your inbox.
          </p>
          <a href="/#newsletter" className="btn-secondary inline-block">
            Subscribe Now
          </a>
        </div>
      </div>
    </div>
  );
}