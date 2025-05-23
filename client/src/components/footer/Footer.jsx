import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";

const Footer = () => {
    return (
        <footer className="text-gray-600 body-font bg-white w-full bg-opacity-50 mt-16" aria-label="Pied de page">
            <div className="container px-5 py-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
                    <a
                        className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
                        href="/"
                        aria-label="Accueil"
                    >
                        <div className="w-2/5 h-2/5">
                            <img
                                src={logo}
                                alt="EpiMusic logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </a>
                    <p className="mt-2 text-2xl font-black">Your Music, Your World.</p>
                </div>
                <div className="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first justify-center">
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4" aria-label="Navigation produits">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-xl mb-3">
                            <a href="/products">Produits</a>
                        </h2>
                        <div className="list-none mb-10">
                            <li>
                                <a
                                    href="/products/instruments/1"
                                    className="text-gray-600 hover:text-gray-800"
                                    aria-label="Voir Instruments"
                                >
                                    Instruments
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/products/vinyle/2"
                                    className="text-gray-600 hover:text-gray-800"
                                    aria-label="Voir Vinyles"
                                >
                                    Vinyles
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/products/goodies/3"
                                    className="text-gray-600 hover:text-gray-800"
                                    aria-label="Voir Goodies"
                                >
                                    Goodies
                                </a>
                            </li>
                        </div>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4" aria-label="Navigation profil">
                        <a href="/profile/user-card">
                            <h2 className="title-font font-medium text-gray-900 tracking-widest text-xl mb-3">
                                Profil
                            </h2>
                        </a>
                        <div className="list-none mb-10">
                            <li>
                                <a
                                    href="/login"
                                    className="text-gray-600 hover:text-gray-800"
                                    aria-label="Connexion"
                                >
                                    Connexion
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/register"
                                    className="text-gray-600 hover:text-gray-800"
                                    aria-label="Inscription"
                                >
                                    Inscription
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/profile/orders"
                                    className="text-gray-600 hover:text-gray-800"
                                    aria-label="Mes commandes"
                                >
                                    Vos dernières commandes
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/profile/user-card"
                                    className="text-gray-600 hover:text-gray-800"
                                    aria-label="Mes informations"
                                >
                                    Vos informations
                                </a>
                            </li>
                        </div>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4" aria-label="Navigation panier">
                        <a href="/cart">
                            <h2 className="title-font font-medium text-gray-900 tracking-widest text-xl mb-3">
                                Panier
                            </h2>
                        </a>
                    </div>
                </div>
            </div>
            <div className="bg-white bg-opacity-50">
                <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                    <p className="text-gray-500 text-sm text-center sm:text-left">
                        © 2025 EpiMusic
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a className="text-gray-500" aria-label="Facebook">
              <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500" aria-label="Twitter">
              <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500" aria-label="Instagram">
              <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500" aria-label="LinkedIn">
              <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="0"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
              >
                <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
