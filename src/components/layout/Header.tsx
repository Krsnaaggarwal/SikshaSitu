import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, BookOpen, Building2, Target, Brain, Sparkles, MessageSquare, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { member, isAuthenticated, actions } = useMember();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navigation = [
    { name: 'Assessments', href: '/assessments', icon: Brain },
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Colleges', href: '/colleges', icon: Building2 },
    { name: 'Jobs', href: '/jobs', icon: Target },
    { name: 'Engineering Exams', href: '/engineering-exams', icon: Sparkles },
    { name: 'Interview Prep', href: '/interview-prep', icon: MessageSquare },
    { name: 'Email Templates', href: '/email-templates', icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg border-b border-primary/20 shadow-lg' 
          : 'bg-white/80 backdrop-blur-md border-b border-primary/10 shadow-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Enhanced Logo - Better responsive sizing */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="flex-shrink-0"
          >
            <Link to="/" className="flex items-center space-x-2 lg:space-x-3">
              <motion.div 
                className="relative w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image 
                  src="https://static.wixstatic.com/media/9b0f10_7ca75b197a16431a85e695d88f2bd9c2~mv2.png" 
                  alt="Shiksha Setu Logo" 
                  className="w-full h-full object-contain" 
                  width={48}
                  height={48}
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-base lg:text-lg bg-gradient-to-r from-primary to-icon-secondary-medium bg-clip-text text-transparent">
                  Shiksha Setu
                </span>
                <span className="font-paragraph text-xs text-gray-500 -mt-1 hidden sm:block">AI-Powered</span>
              </div>
            </Link>
          </motion.div>

          {/* Enhanced Desktop Navigation - Better spacing and responsive design */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Link
                    to={item.href}
                    className={`relative flex items-center space-x-2 px-3 xl:px-4 py-2 rounded-xl font-paragraph text-sm transition-all duration-300 group ${
                      isActive(item.href)
                        ? 'text-white bg-gradient-to-r from-primary to-icon-secondary-medium shadow-lg'
                        : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive(item.href) ? 'text-white' : 'group-hover:text-primary'}`} />
                    <span className="hidden xl:inline">{item.name}</span>
                    <span className="xl:hidden">{item.name.split(' ')[0]}</span>
                    {isActive(item.href) && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-icon-secondary-medium/20 rounded-xl"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Enhanced Auth Section - Better responsive design */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {isAuthenticated ? (
              <motion.div 
                className="flex items-center space-x-2 lg:space-x-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-2 lg:px-3 py-2 rounded-lg text-gray-600 hover:text-primary hover:bg-primary/5 transition-all duration-300"
                  >
                    <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-br from-primary to-icon-secondary-medium rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 lg:w-3 lg:h-3 text-white" />
                    </div>
                    <span className="font-paragraph text-sm font-medium hidden lg:inline">
                      {member?.profile?.nickname || 'Profile'}
                    </span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={actions.logout}
                    className="font-paragraph border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                  >
                    <span className="hidden lg:inline">Sign Out</span>
                    <span className="lg:hidden">Out</span>
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={actions.login}
                  className="font-paragraph bg-gradient-to-r from-primary to-icon-secondary-medium hover:from-primary/90 hover:to-icon-secondary-medium/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  size="sm"
                >
                  <Sparkles className="w-4 h-4 mr-1 lg:mr-2" />
                  <span className="hidden lg:inline">Sign In</span>
                  <span className="lg:hidden">Sign In</span>
                </Button>
              </motion.div>
            )}
          </div>

          {/* Enhanced Mobile menu button - Better positioning */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-primary/5 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Enhanced Mobile Navigation - Better structure and spacing */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="lg:hidden py-4 border-t border-primary/10 bg-white/95 backdrop-blur-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="space-y-1">
                {navigation.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-paragraph text-sm transition-all duration-300 ${
                          isActive(item.href)
                            ? 'text-white bg-gradient-to-r from-primary to-icon-secondary-medium shadow-lg'
                            : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}
                
                {/* Mobile Auth Section */}
                <motion.div 
                  className="pt-3 border-t border-primary/10 space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:text-primary hover:bg-primary/5 transition-all duration-300 font-paragraph text-sm"
                      >
                        <div className="w-5 h-5 bg-gradient-to-br from-primary to-icon-secondary-medium rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-white" />
                        </div>
                        <span>{member?.profile?.nickname || 'Profile'}</span>
                      </Link>
                      <button
                        onClick={() => {
                          actions.logout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 rounded-xl text-gray-600 hover:text-primary hover:bg-primary/5 transition-all duration-300 font-paragraph text-sm"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        actions.login();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-icon-secondary-medium text-white hover:from-primary/90 hover:to-icon-secondary-medium/90 transition-all duration-300 font-paragraph text-sm font-medium shadow-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4" />
                        <span>Sign In</span>
                      </div>
                    </button>
                  )}
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}