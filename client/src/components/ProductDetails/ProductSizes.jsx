import React from 'react';

const ProductSizes = ({ sizes, selectedSize, onSizeSelect, isDark }) => {
    const textColor = isDark ? "text-slate-200" : "text-black";
    const borderColor = isDark ? "border-slate-400" : "border-gray-400";
    const selectedBorderColor = isDark ? "border-white" : "border-black";

    return (
        <div className="flex h-8 gap-2 mb-4" aria-label="Liste des tailles">
            {sizes.map((size, index) => (
                size && (
                    <span
                        key={index}
                        className={`px-2 py-1 cursor-pointer border-2 ${borderColor} ${selectedSize === size ? `${selectedBorderColor} font-semibold` : ''}`}
                        onClick={() => onSizeSelect(size)}
                        title={size}
                        aria-label={`Sélectionner la taille ${size}`}
                    >
                        <span className={textColor}>{size}</span>
                    </span>
                )
            ))}
        </div>
    );
};

export default ProductSizes;

