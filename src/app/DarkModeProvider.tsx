"use client";

import React, { useState, useEffect } from "react";

export default function DarkModeProvider({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const isDarkMode = localStorage.getItem("darkMode") === "true";
        setDarkMode(isDarkMode);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.setItem("darkMode", darkMode.toString());
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <div className={darkMode ? "dark" : ""}>
            <button
                onClick={toggleDarkMode}
                className="fixed top-4 right-4 p-2 rounded-full bg-opacity-50 backdrop-blur-sm transition-colors duration-300 z-50"
            >
                {darkMode ? "🌞" : "🌙"}
            </button>
            {children}
        </div>
    );
}