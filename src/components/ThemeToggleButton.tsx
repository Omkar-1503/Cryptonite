"use client";

import React from 'react';
import { useTheme } from '@/context/theme-context';

const ThemeToggleButton: React.FC = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    const handleClick = () => {
        toggleTheme();
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    };

    return (
        <button
            onClick={handleClick}
            className="p-2 border rounded-md bg-[#FF3B3F] text-[#EFEFEF] hover:bg-[#A9A9A9] transition-colors"
        >
            {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
    );
};

export default ThemeToggleButton;
