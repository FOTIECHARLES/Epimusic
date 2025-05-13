import React from "react";
import { useTheme } from "../../context/ThemeContext";


const UsersAdminList = () => {
    const { isDark } = useTheme();
    const textColor = isDark ? "text-slate-200" : "text-black";

    return (
        <div>
            <h2 className={`text-1xl font-bold mb-6 text-center ${textColor}`}>Liste des clients</h2>
        </div>
    );
};

export default UsersAdminList;