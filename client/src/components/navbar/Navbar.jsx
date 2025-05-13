import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NavbarItem from "./NavbarItem";
import SearchBar from "./SearchBar";
import logo from "../../assets/logo.webp";
import logoDark from "../../assets/logo-dark.webp";
import { FaUserTie, FaUser, FaShoppingCart, FaGamepad } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import { useCart } from "../../context/CartContext";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { itemCount } = useCart();
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("cart_price");
        localStorage.removeItem("cart_promo_total");
        localStorage.removeItem("cart_quantity");
        localStorage.removeItem("cart_shipping_costs");
        localStorage.removeItem("orderId");
        navigate("/login");
        window.location.reload();
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setIsLoggedIn(true);
            if (Array.isArray(user.roles)) {
                if (user.roles.includes("ROLE_ADMIN")) {
                    setUserRole("ROLE_ADMIN");
                } else if (user.roles.includes("ROLE_USER")) {
                    setUserRole("ROLE_USER");
                }
            }
        }
    }, []);

    const textColor = isDark ? "text-white" : "text-black";
    const BgColor = isDark ? "bg-slate-600/80" : "bg-gray-100/80";


    return (
        <nav className="top-0 z-50 w-full flex items-center justify-between flex-wrap bg-white/80 lg:bg-transparent py-2 px-4 lg:px-16 xl:px-48"  role="navigation">
            <div className="flex items-center flex-shrink-0 text-black mr-6">
                <Link to="/" aria-label="Accueil">
                    <img
                        src={ isDark ? logoDark : logo }
                        alt="Logo du site"
                        className="w-16 h-16 mr-2"
                    />
                </Link>
            </div>
            {userRole === "ROLE_USER" && (
                <div className="pt-2 ml-4 pl-4">
                    <NavbarItem
                        icon={<FaGamepad size={24} />}
                        text="Jouer au jeu de rythme"
                        href="/rhythm-game"
                        aria-label="Accéder au jeu de rythme"
                        textColor={textColor}
                    />
                </div>
            )}
            <div className="block lg:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-black hover:border-black"
                    aria-label="Ouvrir le menu de navigation"
                    aria-expanded={isOpen}
                >
                    <svg
                        className="fill-current h-5 w-5"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        focusable="false"
                    >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className={`fixed top-0 left-0 right-0 ${BgColor} lg:bg-transparent z-50 pb-4`}
                        >
                            <div className="flex items-center justify-between px-4 py-2 lg:px-16 xl:px-48">
                                <div className="flex items-center flex-shrink-0 text-black mr-6">
                                    <Link to="/">
                                        <img src={logo} alt="Logo" className="w-16 h-16 mr-2" />
                                    </Link>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center px-3 py-2 border rounded text-black border-black hover:text-black hover:border-black lg:hidden`}
                                >
                                    <svg
                                        className="fill-current h-5 w-5"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <title>Fermer</title>
                                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                                    </svg>
                                </button>
                            </div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col pt-3 lg:flex-row lg:items-center justify-center lg:space-x-8 lg:text-left lg:flex-grow lg:mt-0 space-y-4 lg:space-y-0"
                            >
                                <SearchBar />
                                {!isLoggedIn && (
                                    <>
                                        <NavbarItem text="Se connecter" href="/login" textColor={textColor} />
                                        <NavbarItem text="S'inscrire" href="/register" textColor={textColor} />
                                    </>
                                )}
                                <NavbarItem text="Produits" href="/products" textColor={textColor} />
                                {userRole === "ROLE_ADMIN" && (
                                    <NavbarItem
                                        icon={<FaUserTie size={24} />}
                                        href="/admin/user-card"
                                        text="Panel Admin"
                                        textColor={textColor}
                                    />
                                )}
                                {userRole === "ROLE_USER" && (
                                    <NavbarItem
                                        icon={<FaUser size={24} />}
                                        href="/profile/user-card"
                                        textColor={textColor}
                                    />
                                )}
                                <div className="relative">
                                    <NavbarItem
                                        icon={<FaShoppingCart size={24} />}
                                        href="/cart"
                                        text="Panier"
                                        textColor={textColor}
                                    />
                                    {itemCount > 0 && (
                                        <span className="absolute top-0 right-0 -translate-x-1/2 -translate-y-1/2 px-2 py-1 text-xs font-bold text-white bg-green-500 rounded-full">
                                            {itemCount}
                                        </span>
                                    )}
                                </div>
                                {isLoggedIn && (
                                    <NavbarItem
                                        icon={<IoLogInOutline size={24} />}
                                        onClick={handleLogout}
                                        text="Déconnexion"
                                        textColor={textColor}
                                    />
                                )}
                                <div className="flex justify-center items-center mb-4">
                                    <ThemeSwitcher />
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            <div
                className={`w-full flex-grow lg:flex lg:items-center lg:w-auto lg:justify-between ${
                    isOpen ? "hidden" : "hidden lg:block"
                } transition-all lg:bg-transparent duration-300 ease-in-out`}
            >
                <div className="flex flex-col pt-3 lg:flex-row lg:items-center justify-center lg:space-x-8 lg:text-left lg:flex-grow lg:mt-0 space-y-4 lg:space-y-0">
                    <SearchBar />
                    {!isLoggedIn && (
                        <>
                            <NavbarItem text="Se connecter" href="/login" textColor={textColor} aria-label="Se connecter"/>
                            <NavbarItem text="S'inscrire" href="/register" textColor={textColor} />
                        </>
                    )}
                    <NavbarItem text="Produits" href="/products" textColor={textColor}  aria-label="Accéder aux produits" />
                    {userRole === "ROLE_ADMIN" && (
                        <NavbarItem
                            icon={<FaUserTie size={24} />}
                            href="/admin/user-card"
                            text="Panel Admin"
                            aria-label="Accéder à l'administration des utilisateurs"
                            textColor={textColor}


                        />
                    )}
                    {userRole === "ROLE_USER" && (
                        <NavbarItem
                            icon={<FaUser size={24} />}
                            href="/profile/user-card"
                            textColor={textColor}

                        />
                    )}
                    <div className="relative">
                        <NavbarItem
                            icon={<FaShoppingCart size={24} />}
                            href="/cart"
                            text="Panier"
                            aria-label={`Panier, ${itemCount} article${itemCount > 1 ? "s" : ""}`}
                            textColor={textColor}
                        />
                        {itemCount > 0 && (
                            <span className="absolute top-0 right-0 -translate-x-1/2 -translate-y-1/2 px-2 py-1 text-xs font-bold text-white bg-green-500 rounded-full"
                                  aria-hidden="true"
                            >
                                {itemCount}
                            </span>
                        )}
                    </div>
                    {isLoggedIn && (
                        <NavbarItem
                            icon={<IoLogInOutline size={24} />}
                            onClick={handleLogout}
                            text="Déconnexion"
                            textColor={textColor}
                        />
                    )}
                    <div className="pt-2">
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;