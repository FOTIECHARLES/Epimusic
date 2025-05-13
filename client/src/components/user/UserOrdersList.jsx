import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBoxOpen, FaShippingFast, FaCheckCircle, FaTimesCircle, FaDownload, FaTimes } from 'react-icons/fa';
import { generateOrderPDF } from './pdfUtils';
import { useTheme } from "../../context/ThemeContext";

const UserOrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState("");
    const { isDark } = useTheme();

    const cardBg = isDark ? "bg-slate-700" : "bg-white";
    const textColor = isDark ? "text-slate-200" : "text-black";
    const buttonBg = isDark ? "bg-blue-600" : "bg-blue-500";
    const buttonHoverBg = isDark ? "hover:bg-blue-500" : "hover:bg-blue-400";
    const modalBg = isDark ? "bg-slate-800" : "bg-white";
    const modalTextColor = isDark ? "text-slate-200" : "text-black";

    useEffect(() => {
        const fetchOrders = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            const userId = user.id;

            try {
                const response = await axios.get(`http://localhost:8000/api/order/${userId}/orders`);
                setOrders(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des commandes : ", error);
                setError("Erreur lors de la récupération des commandes.");
            }
        };

        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'En préparation':
                return 'text-blue-500';
            case 'En cours de livraison':
                return 'text-yellow-500';
            case 'Livré':
                return 'text-green-500';
            case 'Annulé':
                return 'text-red-500';
            default:
                return null;
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'En préparation':
                return <FaBoxOpen className="text-blue-500" />;
            case 'En cours de livraison':
                return <FaShippingFast className="text-yellow-500" />;
            case 'Livré':
                return <FaCheckCircle className="text-green-500" />;
            case 'Annulé':
                return <FaTimesCircle className="text-red-500" />;
            default:
                return null;
        }
    };

    const handleOrderClick = async (orderId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/order/${orderId}/details`);
            setSelectedOrderDetails(response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Erreur lors de la récupération des détails de la commande : ", error);
            setError("Erreur lors de la récupération des détails de la commande.");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrderDetails(null);
    };

    const handleDownload = async (orderId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/order/${orderId}/details`);
            generateOrderPDF(response.data);
        } catch (error) {
            console.error("Erreur lors du téléchargement du PDF : ", error);
        }
    };

    return (
        <div className="w-full" aria-label="Liste de vos commandes">
            <div className="flex flex-col items-center mb-4">
                <h2 className={`text-xl font-bold mb-4 ${textColor}`}  aria-label="Mes Commandes">Mes Commandes</h2>
            </div>

            {error && (
                <p className="text-red-500 text-center" role="alert">
                    {error}
                </p>
            )}

            <div className="flex flex-wrap justify-center gap-4">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div
                            key={order.id}
                            className={`shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center ${cardBg}`}
                            aria-label={`Commande numéro ${order.id}`}
                        >
                            <h3
                                className={`text-xl font-bold mb-2 cursor-pointer ${textColor}`}
                                onClick={() => handleOrderClick(order.id)}
                                aria-label={`Voir les détails de la commande numéro ${order.id}`}
                                role="button"
                                tabIndex={0}
                            >
                                Commande #{order.id}
                            </h3>
                            <p className={`${textColor}`}><strong>Date :</strong> {order.createdAt}</p>
                            <p className="flex items-center"  aria-label={`Statut de la commande: ${order.status}`}>
                                <strong className={`${textColor}`}>Statut :</strong>
                                <span className="ml-2 flex items-center">
                                    {getStatusIcon(order.status)}
                                    <span className={`ml-2 ${getStatusColor(order.status)} ${textColor}`}>{order.status}</span>
                                </span>
                            </p>
                            <div className="flex mt-4">
                                <button
                                    className={`mt-2 ${buttonBg} text-white p-3 rounded-full ${buttonHoverBg}`}
                                    onClick={() => handleDownload(order.id)}
                                    aria-label={`Télécharger la facture pour la commande numéro ${order.id}`}
                                >
                                    <FaDownload className="text-base"  aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={`${textColor}`}>Aucune commande trouvée.</p>
                )}
            </div>

            {isModalOpen && selectedOrderDetails && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modalTitle"
                >
                    <div className={`relative ${modalBg} rounded-lg shadow-lg p-6 w-2/3 max-w-3xl`}>
                        <button
                            className="absolute top-4 right-4 p-2 rounded-full"
                            onClick={closeModal}
                            aria-label="Fermer le modal"
                        >
                            <FaTimes className={`${modalTextColor}`} aria-hidden="true" />
                        </button>
                        <h3 className={`text-lg font-bold mb-4 ${modalTextColor}`}>Détails de la commande #{selectedOrderDetails.id}</h3>
                        <table className="min-w-full"  aria-label="Détails de la commande">
                            <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-200 text-left">Produit</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-center">Couleur</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-center">Taille</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-center">Quantité</th>
                            </tr>
                            </thead>
                            <tbody>
                            {selectedOrderDetails.items.map((item, index) => (
                                <tr key={index}>
                                    <td className={`py-2 px-4 border-b border-gray-200 text-justify ${modalTextColor}`}>{item.productName}</td>
                                    <td className={`py-2 px-4 border-b border-gray-200 text-center ${modalTextColor}`}>{item.color || '-'}</td>
                                    <td className={`py-2 px-4 border-b border-gray-200 text-center ${modalTextColor}`}>{item.size || '-'}</td>
                                    <td className={`py-2 px-4 border-b border-gray-200 text-center ${modalTextColor}`}>{item.quantity}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="mt-4">
                            <strong className={`${modalTextColor}`}  aria-label={`Prix total de la commande : ${selectedOrderDetails.totalPrice} euros`}>Prix Total :</strong> {selectedOrderDetails.totalPrice} €
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                className={`mt-2 ${buttonBg} text-white p-3 rounded-full ${buttonHoverBg}`}
                                onClick={() => handleDownload(selectedOrderDetails.id)}
                                aria-label={`Télécharger la facture de la commande numéro ${selectedOrderDetails.id}`}
                            >
                                <FaDownload className="text-base" aria-hidden="true"  />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default UserOrdersList;