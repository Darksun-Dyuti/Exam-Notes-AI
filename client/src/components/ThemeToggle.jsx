import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { LuMoon, LuSun } from "react-icons/lu";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial preference from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Default to dark if no preference is saved
    const isDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDark) || !savedTheme;
    
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white shadow-sm hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 360 : 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {isDark ? (
          <LuMoon className="text-xl text-indigo-400" />
        ) : (
          <LuSun className="text-xl text-amber-500" />
        )}
      </motion.div>
    </motion.button>
  );
}

export default ThemeToggle;
