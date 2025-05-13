import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";


const UserTabs = () => {
    const location = useLocation();
    const tabs = [
        { name: "Mes Informations", path: "/profile/user-card" },
        { name: "Mes Commandes", path: "/profile/orders" },
        { name: "Carnet d'Adresses", path: "/profile/address-book" },
    ];

    const { isDark } = useTheme();

    const activeTabBg = isDark ? "bg-slate-700" : "bg-gray-200";
    const inactiveTabBg = isDark ? "bg-slate-600" : "bg-gray-100";
    const textColor = isDark ? "text-slate-200" : "text-black";

    return (
        <div className="flex space-x-4 mb-4" role="tablist" aria-label="Navigation par onglets du profil utilisateur">
            {tabs.map((tab) => {
                const isSelected = location.pathname === tab.path;

                return (
                    <Link
                        key={tab.name}
                        to={tab.path}
                        role="tab"
                        aria-selected={isSelected ? "true" : "false"}
                        className={`p-2 rounded ${isSelected ? activeTabBg : inactiveTabBg} ${textColor}`}
                    >
                        {tab.name}
                    </Link>
                );
            })}

        </div>
    );
};

export default UserTabs;
