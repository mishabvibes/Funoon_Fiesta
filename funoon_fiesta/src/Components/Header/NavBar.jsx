import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../AdminLogin/AdminLogin';
import logoLogo from '../../assets/img/lightlogo.png'
import logoDark from '../../assets/img/darklogo.png'

// motion
import { motion } from 'framer-motion'
// variants
import { fadeIn } from '../FrameMotion/variants'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen &&
        navRef.current &&
        !navRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const menus = [
    { name: 'HOME', path: '/' },
    { name: 'RESULT', path: '/result' },
    { name: 'SCORE BOARD', path: '/scoretable' },
    ...(user ? [
      { name: 'ADD RESULT', path: '/addresult' },
      { name: 'CART', path: '/cart' }
    ] : [])
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleAuthAction = () => {
    if (user) {
      logout();
      navigate('/login');
    } else {
      navigate('/login');
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="flex items-center justify-between pt-8 px-6 relative">
      {/* Animated Mobile Menu Toggle */}
      <motion.button
        variants={fadeIn("left", 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
        ref={buttonRef}
        className="md:hidden cursor-pointer z-20"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <div className={`transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}>
          <div className={`w-6 h-0.5 bg-black dark:bg-white mb-1.5 transition-all duration-300 ${isMenuOpen ? 'translate-y-1.5' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-black dark:bg-white mb-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-90 -translate-y-1.5' : ''}`}></div>
        </div>
      </motion.button>

      {/* Logo */}
      <motion.div
        variants={fadeIn("right", 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
        onClick={() => handleNavigation('/')} className="ml-7 cursor-pointer">
        <div className='w-10 h-10 p-1.5 bg-secondery rounded-xl overflow-hidden'>
          <img
            src={logoLogo}
            alt="logo"
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>

      {/* Menu Items - Keeping your original blur styling */}
      <ul
        ref={navRef}
        className={`
          md:pl-10 md:static fixed 
          duration-500 ease-linear top-0 
          md:h-auto h-screen z-10 mt-3 md:mt-0
          w-2/3 text-start md:text-center
          ${!isMenuOpen ? "right-[-100%]" : "right-0"}
          bg-transparent
          md:bg-transparent
          backdrop-blur-lg
          shadow-lg md:shadow-none
        `}
      >
        {menus.map((menu, index) => (
          <li
            key={index}
            onClick={() => handleNavigation(menu.path)}
            className="
              md:inline-block md:ml-10 ml-5 
              md:my-0 my-6
              border-b-2 border-transparent 
              hover:border-black dark:hover:border-white
              duration-300
              cursor-pointer
            "
          >
            <motion.span
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.7 }}
              className="
                text-black dark:text-white 
                font-Barlow 
                font-normal text-sm 
                inline-block md:py-5 py-3
                hover:text-gray-600 dark:hover:text-gray-300
                transition-colors
              "
            >
              {menu.name}
            </motion.span>
          </li>
        ))}

        {/* Mobile Auth Controls */}
        <motion.li
          variants={fadeIn("left", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.7 }}
          className="md:hidden ml-5 my-6" onClick={handleAuthAction}>
          <button
            className="
              flex items-center space-x-2 
              text-black dark:text-white
              hover:text-gray-600 
              transition-colors
            "
          >
            {user ? <LogOut className="mr-2" /> : <LogIn className="mr-2" />}
            {user ? 'Logout' : 'Login'}
          </button>
        </motion.li>

        {/* Mobile Dark Mode Toggle */}
        <motion.li
          variants={fadeIn("left", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.7 }}
          className="md:hidden ml-5 my-6 py-3">
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              setIsMenuOpen(false);
            }}
            className="
              flex items-center space-x-2
              text-black dark:text-white
              hover:text-gray-600 
              transition-colors
            "
          >
            {darkMode ?
              <Sun className="text-yellow-500" /> :
              <Moon className="text-gray-800 dark:text-white" />
            }
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </motion.li>
      </ul>

      {/* Desktop Auth and Dark Mode Actions */}
      <motion.div
        variants={fadeIn("left", 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
        className="hidden md:flex items-center space-x-4">
        <button
          onClick={handleAuthAction}
          className="
            flex items-center 
            p-2 rounded-full 
            hover:bg-gray-100 dark:hover:bg-gray-700 
            transition-colors
            text-black dark:text-white
          "
        >
          {user ? <LogOut className="mr-2" /> : <LogIn className="mr-2" />}
          {user ? '' : ''}
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="
            p-2 rounded-full 
            hover:bg-gray-100 dark:hover:bg-gray-700 
            transition-colors
          "
        >
          {darkMode ?
            <Sun className="text-yellow-500" /> :
            <Moon className="text-gray-800 dark:text-white" />
          }
        </button>
      </motion.div>
    </nav>
  );
};

export default NavBar;