import React from 'react';
import { Link } from 'react-router-dom';

function NavbarItem({ text, href, onClick, icon, textColor }) {
    return (
        <Link
            to={href}
            onClick={onClick}
            className={`flex items-center justify-center px-4 py-2 text-lg font-semibold rounded-lg 
                ${textColor} transition-colors duration-200 ease-in-out`}
            aria-label={text || "Lien de navigation"}

        >
            {icon && <span className="mr-2">{icon}</span>}
            {text}
        </Link>
    );
}

export default NavbarItem;