import React, { useEffect, useState } from 'react';
import Alert from '../Alerts/Alert';
import { useTheme } from "../../context/ThemeContext";

const ProvidersProductsModal = ({ isOpen, onClose, providerId }) => {
    const [products, setProducts] = useState([]);
    const [alert, setAlert] = useState({ type: '', message: '' });

    const { isDark } = useTheme();
    const cardBg = isDark ? "bg-slate-600" : "bg-white";
    const textColor = isDark ? "text-slate-200" : "text-black";
    const borderColor = isDark ? "border-slate-400" : "border-gray-200";

    useEffect(() => {
        if (isOpen && providerId) {
            fetchProducts(providerId);
        }
    }, [isOpen, providerId]);

    const fetchProducts = async (providerId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/provider/${providerId}/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const error = await response.json();
                setAlert({ type: 'error', message: error.message || 'Erreur lors de la récupération des produits' });
                return;
            }

            const data = await response.json();
            setProducts(data);
        } catch (error) {
            setAlert({ type: 'error', message: 'Erreur lors de la récupération des produits' });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}  aria-hidden="true"></div>
            <div className={`p-6 rounded-lg z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto ${cardBg}`}  role="document">
                <h2 id="modal-title" className={`text-xl font-bold mb-4 ${textColor}`}>
                    Produits éligibles
                </h2>
                {alert.message && <Alert message={alert.message} type={alert.type} />}

                {products.length > 0 ? (
                    <table className={`min-w-full ${cardBg} ${borderColor}`} role="table">
                        <thead>
                        <tr>
                            <th className={`px-4 py-2 border ${borderColor} ${cardBg} ${textColor}`} scope="col">Nom du Produit</th>
                            <th className={`px-4 py-2 border ${borderColor} ${cardBg} ${textColor}`} scope="col">Poids (kg)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className={`px-4 py-2 border ${borderColor} ${cardBg} ${textColor}`}>{product.name}</td>
                                <td className={`px-4 py-2 border ${borderColor} ${cardBg} ${textColor}`}>{product.weights}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p className={`text-center text-red-500 font-bold ${textColor}`}>Aucun produit trouvé</p>
                )}

                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-800 text-white rounded"
                        aria-label="Fermer le modal"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProvidersProductsModal;