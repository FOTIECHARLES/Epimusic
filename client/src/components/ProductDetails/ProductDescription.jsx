import React from 'react';

const ProductDescription = ({ category, description, stock, color, size, price, weight, promotion, isDark }) => {
    const getSizeLabel = () => {
        switch (category.toLowerCase()) {
            case 'instrument':
                return null;
            case 'vinyle':
                return 'Tours';
            case 'goodies':
                return 'Taille';
            default:
                return 'Taille';
        }
    }

    const sizeLabel = getSizeLabel();
    const shouldShowSize = sizeLabel && category.toLowerCase() !== 'instrument';

    const textColor = isDark ? "text-slate-200" : "text-black";
    const cardBg = isDark ? "bg-slate-600" : "bg-white";
    const borderColor = isDark ? "text-slate-600" : "bg-white";

    const stockColor = stock > 0
        ? (isDark ? "text-green-400" : "text-green-600")
        : (isDark ? "text-red-400" : "text-red-600");

    return (
        <div className={`p-6 ${cardBg} ${borderColor} rounded-lg shadow-md`}  aria-label="Détails du produit">
            <div className={`text-lg font-semibold mb-2 ${textColor}`}  role="heading" aria-level="2">
                Description
            </div>
            <p className={`mb-4 ${textColor}`}>{description}</p>
            <div className="flex items-center mb-2"  aria-label={`Stock: ${stock > 0 ? stock : 'Bientôt disponible'}`}>
                <span className={`font-semibold mr-2 ${textColor}`}>Stock:</span>
                <span className={stockColor}>
                    {stock > 0 ? `${stock}` : 'Bientôt disponible'}
                </span>
            </div>
            <div className="flex items-center mb-2"  aria-label={`Couleur: ${color}`}>
                <span className={`font-semibold mr-2 ${textColor}`}>Couleur:</span>
                <span className={textColor}>{color}</span>
            </div>
            {shouldShowSize && (
                <div className="flex items-center mb-2" aria-label={`Taille: ${size}`}>
                    <span className={`font-semibold mr-2 ${textColor}`}>{sizeLabel}:</span>
                    <span className={textColor}>{size}</span>
                </div>
            )}
            {promotion ? (
                <div className="flex flex-col mb-2" aria-label="Détails de la promotion">
                    <span className="text-gray-500 line-through text-lg" aria-label={`Prix normal: ${price || 'Non disponible'}`}>
                        ${price || 'Non disponible'}
                    </span>
                    <span className="text-red-600 text-xl font-bold" aria-label={`Prix promotionnel: ${promotion.promo_price}`}>
                        ${promotion.promo_price}
                    </span>
                    <p className="text-sm text-red-600 font-bold" aria-label={`Promotion du ${promotion.start_date} au ${promotion.end_date}`}>
                        Promotion du {promotion.start_date} au {promotion.end_date}
                    </p>
                </div>
            ) : (
                <p className={`text-lg font-semibold mb-2 ${textColor}`}  aria-label={`Prix du produit: ${price || 'Non disponible'}`}>
                    Prix : ${price || 'Non disponible'}
                </p>
            )}
            <div className="flex items-center mb-2"  aria-label={`Poids: ${weight} kg`}>
                <span className={`font-semibold mr-2 ${textColor}`}>Poids:</span>
                <span className={textColor}>{weight} kg</span>
            </div>
        </div>
    );
};

export default ProductDescription;

