import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const AdminTabs = () => {
    const location = useLocation();
    const tabs = [
        { name: "Mes Informations", path: "/admin/user-card" },
        { name: "Clients", path: "/admin/users" },
        { name: "Produits", path: "/admin/products" },
        { name: "Livraison", path: "/admin/orders" },
        { name: "Catégories", path: "/admin/categories" },
        { name: "Réapprovisionnement", path: "/admin/stock-management" },
        { name: "Prestataires", path: "/admin/providers" }
    ];

    const { isDark } = useTheme();

    const activeTabBg = isDark ? "bg-slate-700" : "bg-gray-200";
    const inactiveTabBg = isDark ? "bg-slate-600" : "bg-gray-100";
    const textColor = isDark ? "text-slate-200" : "text-black";

    return (
        <div className="flex space-x-4 mb-4">
            {tabs.map((tab) => (
                <Link
                    key={tab.name}
                    to={tab.path}
                    className={`p-2 rounded ${location.pathname === tab.path ? activeTabBg : inactiveTabBg} ${textColor}`}
                    aria-label={`Accéder à la section ${tab.name}`}
                    aria-current={location.pathname === tab.path ? "page" : undefined}
                >
                    {tab.name}
                </Link>
            ))}
        </div>
    );
};

export default AdminTabs;