import React from 'react';

const ProductColors = ({ colors, selectedColor, onColorSelect, isDark }) => {

    const colorMap = {
        "Noir": "#000000",
        "Blanc": "#FFFFFF",
        "Rouge": "#FF0000",
        "Marron": "#8B4513",
        "Gris": "#808080",
        "Orange": "#FFA500",
        "Bleu": "#0000FF",
        "Vert": "#008000",
        "Jaune": "#FFFF00",
        "Rose": "#FFC0CB",
        "Violet": "#800080"
    };

    const getColorHex = (colorName) => {
        return colorMap[colorName];
    };

    const borderColor = isDark ? "border-slate-400" : "border-gray-400";
    const selectedBorderColor = isDark ? "border-white" : "border-black";

    return (
        <div className="flex gap-2 mb-4 h-8" aria-label="Liste des couleurs">
            {colors.map((color, index) => (
                color && (
                    <span
                        key={index}
                        role="button"
                        tabIndex="0"
                        aria-label={`Sélectionner la couleur ${color}`}
                        className={`w-8 h-8 rounded-full cursor-pointer border-2 ${borderColor} ${selectedColor === color ? `${selectedBorderColor} border-4` : ''}`}
                        style={{ backgroundColor: getColorHex(color) }}
                        onClick={() => onColorSelect(color)}
                        title={color}
                    />
                )
            ))}
        </div>
    );
};

export default ProductColors;
