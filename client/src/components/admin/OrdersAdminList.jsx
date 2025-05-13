import React, { useState, useEffect } from "react";
import Alert from "../Alerts/Alert";
import { useTheme } from "../../context/ThemeContext";

const OrdersAdminList = () => {
    const [orders, setOrders] = useState([]);
    const [alert, setAlert] = useState({ type: "", message: "" });

    const { isDark } = useTheme();
    const cardBg = isDark ? "bg-slate-600" : "bg-gray-100";
    const textColor = isDark ? "text-slate-200" : "text-black";
    const borderColor = isDark ? "border-slate-400" : "border-gray-300";
    const subTextColor = isDark ?  "text-slate-300" : "text-black";

    const fetchOrders = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/api/admin/replenish-orders",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                const error = await response.json();
                setAlert({
                    type: "error",
                    message:
                        error.message ||
                        "Erreur lors de la récupération des commandes",
                });
                return;
            }

            const data = await response.json();
            setOrders(data);
            setAlert({ type: "error", message: "" });
        } catch (error) {
            setAlert({
                type: "error",
                message: "Erreur lors de la récupération des commandes",
            });
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="container mx-auto px-4">
            <h2 className={`text-2xl font-bold my-4 ${textColor}`}>Liste des Commandes</h2>
            {alert.message && (
                <Alert message={alert.message} type={alert.type} />
            )}
            <div className="overflow-x-auto">
                <table
                    className={`min-w-full ${cardBg} ${borderColor}`}
                    aria-label="Tableau des commandes de réapprovisionnement"
                >

                    <thead>
                        <tr>
                            <th scope="col" className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`}>
                                Numéro de commande
                            </th>
                            <th scope="col" className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`}>
                                Nom du produit
                            </th>
                            <th scope="col" className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`}>
                                Stock Actuel
                            </th>
                            <th scope="col" className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`}>
                                Date de Commande
                            </th>
                            <th scope="col" className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`}>
                                Statut de la commande
                            </th>
                            <th scope="col" className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`}>
                                Quantité Commandée
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.order_number}>
                            <td className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`}>
                                {order.order_number}
                            </td>
                            <td className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`}>
                                {order.product_name}
                            </td>
                            <td className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`}>
                                {order.current_stock}
                            </td>
                            <td className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`}>
                                {new Date(order.order_date).toLocaleString()}
                            </td>
                            <td className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`}>
                                {order.order_status}
                            </td>
                            <td className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`}>
                                {order.quantity_ordered}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersAdminList;
