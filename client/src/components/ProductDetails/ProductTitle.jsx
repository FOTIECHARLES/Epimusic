import React from 'react';

const ProductTitle = ({ name, category, isDark }) => {

    const titleColor = isDark ? "text-slate-200" : "text-black";
    const categoryColor = isDark ? "text-slate-300" : "text-gray-600";

    return (
        <div aria-label={`Titre du produit: ${name}, catégorie: ${category}`}>
            <h1 className={`text-4xl font-bold mb-2 ${titleColor}`}  aria-label={`Nom du produit: ${name}`}>{name}</h1>
            <h3 className={`text-sm ${categoryColor} mb-6`} aria-label={`Catégorie: ${category}`}>Catégorie : {category}</h3>
        </div>
    );
};

export default ProductTitle;