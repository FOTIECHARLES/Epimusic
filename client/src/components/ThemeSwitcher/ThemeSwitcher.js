import React from "react";
import { useTheme } from "../../context/ThemeContext";

const ThemeSwitcher = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className="flex items-center">
            <label htmlFor="theme-toggle" className="flex items-center cursor-pointer">
                <span className="mr-2 text-m text-gray-600 dark:text-gray-300">☀️</span>
                <div className="relative">

                    <input
                        type="checkbox"
                        id="theme-toggle"
                        className="hidden"
                        checked={isDark}
                        onChange={toggleTheme}
                    />
                    <div className="toggle-background w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <div
                        className={`toggle-dot absolute top-0 left-0 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                            isDark ? "transform translate-x-6" : ""
                        }`}
                    ></div>
                </div>
                <span className="ml-2 text-m text-gray-600 dark:text-gray-300">🌙</span>
            </label>
        </div>
    );
};

export default ThemeSwitcher;
