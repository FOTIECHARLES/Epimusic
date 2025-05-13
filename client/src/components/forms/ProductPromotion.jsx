import React, { useState } from 'react';
import axios from 'axios';
import Alert from '../Alerts/Alert';
import { useTheme } from "../../context/ThemeContext";


const ProductPromotion = ({ productId, onClose }) => {
    const [promoPrice, setPromoPrice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { isDark } = useTheme();

    const cardBg = isDark ? "bg-slate-600" : "bg-white";
    const textColor = isDark ? "text-slate-200" : "text-black";
    const inputBg = isDark ? "bg-slate-700" : "bg-gray-100";
    const borderColor = isDark ? "border-slate-400" : "border-gray-200";
    const buttonBg = isDark ? "bg-blue-700 hover:bg-blue-600" : "bg-blue-700 hover:bg-blue-600";
    const buttonTextColor = "text-white";

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!promoPrice || !startDate || !endDate) {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        axios.post('http://localhost:8000/promotion', {
            product_id: productId,
            promo_price: promoPrice,
            start_date: startDate,
            end_date: endDate
        })
            .then((response) => {
                setSuccess('Promotion appliquée avec succès !');
                setError('');

                setTimeout(() => {
                    onClose();
                    window.location.reload();
                }, 2000);
            })
            .catch((error) => {
                setError('Erreur lors de l\'application de la promotion.');
                setSuccess('');
            });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className={`${cardBg} ${textColor} p-6 rounded-lg shadow-lg w-full max-w-md`}>
                <h2 className="text-xl font-semibold mb-4">Ajouter une Promotion</h2>
                {success && <Alert message={success} type="success" />}
                {error && <Alert message={error} type="error" />}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="promoPrice">
                            Prix promotionnel:
                        </label>
                        <input
                            type="number"
                            id="promoPrice"
                            step="0.01"
                            value={promoPrice}
                            onChange={(e) => setPromoPrice(e.target.value)}
                            className={`w-full p-2 ${borderColor} rounded ${inputBg} ${textColor}`}
                            aria-label="Entrer le prix promotionnel"
                            placeholder="Prix promotionnel"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="startDate">
                            Date de début:
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className={`w-full p-2 ${borderColor} rounded ${inputBg} ${textColor}`}
                            aria-label="Sélectionner la date de début de la promotion"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="endDate">
                            Date de fin:
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className={`w-full p-2 ${borderColor} rounded ${inputBg} ${textColor}`}
                            aria-label="Sélectionner la date de fin de la promotion"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className={`px-4 py-2 ${isDark ? "bg-gray-600" : "bg-gray-300"} ${isDark ? "text-gray-300" : "text-gray-700"} rounded hover:${isDark ? "bg-gray-500" : "bg-gray-400"}`}
                            aria-label="Annuler la promotion"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 ${buttonBg} ${buttonTextColor} rounded`}
                            aria-label="Appliquer la promotion"
                        >
                            Appliquer la Promotion
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductPromotion;
