import React from "react";

const CartSummary = ({ total, quantity, promoReduction, isDark }) => {

    const totalTTC = (total - promoReduction).toFixed(2);
    const taxes = (totalTTC * (20 / 100)).toFixed(2);
    const totalHT = (totalTTC - taxes).toFixed(2);

    const BgColor = isDark ? "bg-slate-600" : "bg-gray-100";
    const textColor = isDark ? "text-slate-200" : "text-back";
    const borderColor = isDark ?  "border-slate-600" : "border-gray-100";
    const subTextColor = isDark ?  "text-slate-300" : "text-slate-500";

    return (
        <div role="region" aria-label="Récapitulatif du panier">
            <h3 className={`${textColor} text-2xl mb-4`} role="heading" aria-level="2">>Récapitulatif :</h3>
            <div className={`w - full ${BgColor} p-4 rounded-lg`}>
                <p className={`${textColor} text - lg`}  aria-label={`Nombre de produits: ${quantity} produits`}>{quantity} produits</p>
                <hr className="mb-4"/>
                <div className={`w - full flex justify-between text-lg md:text-xl ${subTextColor}`}>
                    <p>Total (HT)</p>
                    <p>{totalHT} €</p>
                </div>
                <div className={`w - full flex justify-between text-lg md:text-xl ${subTextColor}`}>
                    {promoReduction > 0 && (
                        <div
                            className={`w - full flex justify-between text-lg md:text-xl ${subTextColor}`}
                             aria-label={`Réduction promo: -${promoReduction.toFixed(2)} euros`}
                        >
                            <p className="text-red-600">Réduction promo</p>
                            <p className="text-red-600">- {promoReduction.toFixed(2)} €</p>
                        </div>
                    )}
                </div>
                <div className={`w - full flex justify-between text-lg md:text-xl ${subTextColor}`}>
                    <p>TVA (20%)</p>
                    <p>{taxes} €</p>
                </div>
                <div
                    className={`w - full mt-2 flex justify-between text-xl md:text-3xl ${textColor}`}
                    aria-live="polite"
                    aria-label={`Total (TTC): ${totalTTC} euros`}
                >
                    <p>Total (TTC)</p>
                    <p>{totalTTC} €</p>
                </div>
            </div>
        </div>
    );
}

export default CartSummary;
