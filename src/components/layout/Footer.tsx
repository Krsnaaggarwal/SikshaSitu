import { Link } from 'react-router-dom';
import { ExternalLink, Mail, Phone, MapPin, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const quickLinks = [
    { name: 'Assessments', href: '/assessments' },
    { name: 'Courses', href: '/courses' },
    { name: 'Colleges', href: '/colleges' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Interview Prep', href: '/interview-prep' },
    { name: 'Email Templates', href: '/email-templates' },
  ];

  const governmentPortals = [
    { name: 'NSP - National Scholarship Portal', href: 'https://scholarships.gov.in/', external: true },
    { name: 'SWAYAM - Study Webs of Active Learning', href: 'https://swayam.gov.in/', external: true },
    { name: 'DIKSHA - Digital Infrastructure for Knowledge Sharing', href: 'https://diksha.gov.in/', external: true },
    { name: 'NCS - National Career Service', href: 'https://www.ncs.gov.in/', external: true },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-secondary via-secondary to-primary overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-secondary-foreground/5 rounded-full"
            style={{
              left: `${10 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Enhanced Brand Section - Better responsive layout */}
          <motion.div 
            className="space-y-4 lg:space-y-6 sm:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div 
                className="relative w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-foreground to-white rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-primary font-heading font-bold text-base lg:text-lg">SS</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 to-icon-secondary-medium/20 rounded-xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg lg:text-xl text-secondary-foreground">Siksha Situ</span>
                <motion.div 
                  className="flex items-center space-x-1"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-3 h-3 text-secondary-foreground/60" />
                  <span className="font-paragraph text-xs text-secondary-foreground/60">AI-Powered Platform</span>
                </motion.div>
              </div>
            </motion.div>
            
            <p className="font-paragraph text-sm text-secondary-foreground/80 leading-relaxed">
              Empowering rural and semi-urban students with personalized career guidance and educational opportunities through government institutions.
            </p>
            
            <div className="space-y-3 text-sm font-paragraph">
              {[
                { icon: Mail, text: 'support@sikshasitu.gov.in' },
                { icon: Phone, text: '1800-XXX-XXXX (Toll Free)' },
                { icon: MapPin, text: 'Uttar Pradesh, India' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-3 group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="w-8 h-8 bg-secondary-foreground/10 rounded-lg flex items-center justify-center group-hover:bg-secondary-foreground/20 transition-colors">
                    <item.icon className="w-4 h-4 text-secondary-foreground/70" />
                  </div>
                  <span className="text-secondary-foreground/80 group-hover:text-secondary-foreground transition-colors">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Quick Links - Better responsive grid */}
          <motion.div 
            className="space-y-4 lg:space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading font-bold text-lg lg:text-xl text-secondary-foreground flex items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-primary to-icon-secondary-medium rounded-full mr-3"></div>
              Quick Links
            </h3>
            <nav className="grid grid-cols-1 gap-2 lg:gap-3">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  whileHover={{ x: 5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link
                    to={link.href}
                    className="block font-paragraph text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-all duration-300 py-1 px-2 rounded-lg hover:bg-secondary-foreground/5"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Enhanced Government Portals - Better responsive layout */}
          <motion.div 
            className="space-y-4 lg:space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading font-bold text-lg lg:text-xl text-secondary-foreground flex items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-icon-secondary-medium to-icon-accent-light rounded-full mr-3"></div>
              Government Portals
            </h3>
            <nav className="space-y-2 lg:space-y-3">
              {governmentPortals.map((portal, index) => (
                <motion.div
                  key={portal.name}
                  whileHover={{ x: 5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <a
                    href={portal.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 font-paragraph text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-all duration-300 py-1 px-2 rounded-lg hover:bg-secondary-foreground/5 group"
                  >
                    <span className="flex-1 line-clamp-2">{portal.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all flex-shrink-0" />
                  </a>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Enhanced Support - Better responsive design */}
          <motion.div 
            className="space-y-4 lg:space-y-6 sm:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading font-bold text-lg lg:text-xl text-secondary-foreground flex items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-icon-accent-light to-icon-accent-warm rounded-full mr-3"></div>
              Support
            </h3>
            <div className="space-y-3 lg:space-y-4">
              {[
                {
                  title: 'Offline Support',
                  description: 'Visit your nearest Common Service Center (CSC) for assistance',
                  gradient: 'from-primary/10 to-icon-secondary-medium/10'
                },
                {
                  title: 'Multi-Language',
                  description: 'Available in Hindi, English, and regional languages',
                  gradient: 'from-icon-secondary-medium/10 to-icon-accent-light/10'
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className={`p-3 lg:p-4 bg-gradient-to-br ${item.gradient} backdrop-blur-sm rounded-xl border border-secondary-foreground/10 hover:border-secondary-foreground/20 transition-all duration-300`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <p className="font-paragraph text-sm font-semibold mb-2 text-secondary-foreground">{item.title}</p>
                  <p className="font-paragraph text-xs text-secondary-foreground/80 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Bottom Section */}
        <motion.div 
          className="mt-12 pt-8 border-t border-secondary-foreground/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <motion.div 
              className="flex items-center space-x-2"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p className="font-paragraph text-sm text-secondary-foreground/70">
                © 2024 Career Advisor Platform. Made with
              </p>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-400 fill-current" />
              </motion.div>
              <p className="font-paragraph text-sm text-secondary-foreground/70">
                for India's future
              </p>
            </motion.div>
            
            <div className="flex items-center space-x-8">
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Accessibility', href: '/accessibility' }
              ].map((link, index) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.05, y: -1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link
                    to={link.href}
                    className="font-paragraph text-sm text-secondary-foreground/60 hover:text-secondary-foreground transition-all duration-300 px-2 py-1 rounded-lg hover:bg-secondary-foreground/5"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}