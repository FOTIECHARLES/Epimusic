import React, { useState, useEffect } from "react";
import Alert from "../Alerts/Alert";
import ProviderCreateModal from "../forms/ProviderCreateModal";
import ProviderEditModal from "../forms/ProviderEditModal";
import ProvidersProductsModal from "../Modals/ProvidersProductsModal";
import { useTheme } from "../../context/ThemeContext";


const ProvidersAdminList = () => {
    const [providers, setProviders] = useState([]);
    const [alert, setAlert] = useState({ type: "", message: "" });
    const [isProviderCreateModalOpen, setIsProviderCreateModalOpen] = useState(false);
    const [isProviderEditModalOpen, setIsProviderEditModalOpen] = useState(false);
    const [isProvidersProductsModalOpen, setIsProvidersProductsModalOpen] = useState(false);
    const [selectedProviderId, setSelectedProviderId] = useState(null);

    const { isDark } = useTheme();
    const cardBg = isDark ? "bg-slate-600" : "bg-gray-100";
    const textColor = isDark ? "text-slate-200" : "text-black";
    const borderColor = isDark ? "border-slate-400" : "border-gray-300";
    const subTextColor = isDark ?  "text-slate-300" : "text-black";

    const fetchProviders = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/api/providers",
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
                        "Erreur lors de la récupération des prestataires",
                });
                return;
            }

            const data = await response.json();
            setProviders(data);
            setAlert({ type: "error", message: "" });
        } catch (error) {
            setAlert({
                type: "error",
                message: "Erreur lors de la récupération des prestataires",
            });
        }
    };

    useEffect(() => {
        fetchProviders();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce prestataire ?")) {
            try {
                const response = await fetch(
                    `http://localhost:8000/api/provider/${id}`,
                    {
                        method: "DELETE",
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
                            "Erreur lors de la suppression du prestataire",
                    });
                    return;
                }

                setProviders((prev) =>
                    prev.filter((provider) => provider.id !== id)
                );
            } catch (error) {
                setAlert({
                    type: "error",
                    message: "Erreur lors de la suppression du prestataire",
                });
            }
        }
    };

    return (
        <div className="container mx-auto px-4" aria-label="Liste des prestataires">
            <h2 className={`text-2xl font-bold my-4 ${textColor}`}>
                Liste des Prestataires (Cliquez sur les noms des prestataires pour voir les produits éligibles)
            </h2>
            <h3 className={`text-xl my-4 ${textColor}`}>
                L'affichage des produits est fait en fonction du coût de
                transport, en sélectionnant le prestataire logistique le plus
                économique
            </h3>
            <button
                onClick={() => setIsProviderCreateModalOpen(true)}
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                aria-label="Ajouter un nouveau prestataire"
            >
                Ajouter un Prestataire
            </button>
            {alert.message && (
                <Alert message={alert.message} type={alert.type} />
            )}
            <div className="overflow-x-auto">
                <table className={`min-w-full ${cardBg} ${borderColor}`}  aria-label="Tableau des prestataires">
                <thead>
                        <tr>
                            <th className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`} scope="col">
                                Nom
                            </th>
                            <th className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`} scope="col">
                                EAN
                            </th>
                            <th className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`} scope="col">
                                Longueur (cm)
                            </th>
                            <th className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`} scope="col">
                                Largeur (cm)
                            </th>
                            <th className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`} scope="col">
                                Hauteur (cm)
                            </th>
                            <th className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`} scope="col">
                                Prix (€)
                            </th>
                            <th className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`} scope="col">
                                Poids Max (kg)
                            </th>
                            <th className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`} scope="col">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {providers.map((provider) => (
                            <tr key={provider.id}>
                                <td
                                    className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor} hover:underline cursor-pointer`}
                                    onClick={() => {
                                        setSelectedProviderId(provider.id);
                                        setIsProvidersProductsModalOpen(true);
                                    }}
                                    aria-label={`Voir les produits du prestataire ${provider.name}`}
                                >
                                    {provider.name}
                                </td>
                                <td className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`}>
                                    {provider.EAN}
                                </td>
                                <td className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`}>
                                    {provider.length}
                                </td>
                                <td className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`}>
                                    {provider.width}
                                </td>
                                <td className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`}>
                                    {provider.height}
                                </td>
                                <td className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`}>
                                    {provider.price}
                                </td>
                                <td className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`}>
                                    {provider.MaxWeight}
                                </td>
                                <td className={`px-4 py-2 border ${borderColor} ${cardBg} ${subTextColor}`}>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() =>
                                                handleDelete(provider.id)
                                            }
                                            className="w-1/2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                            aria-label={`Supprimer le prestataire ${provider.name}`}
                                        >
                                            Supprimer
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedProviderId(provider.id);
                                                setIsProviderEditModalOpen(true);
                                            }}
                                            className="w-1/2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                            aria-label={`Modifier le prestataire ${provider.name}`}
                                        >
                                            Modifier
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ProviderCreateModal
                isOpen={isProviderCreateModalOpen}
                onClose={() => setIsProviderCreateModalOpen(false)}
            />
            <ProviderEditModal
                isOpen={isProviderEditModalOpen}
                onClose={() => setIsProviderEditModalOpen(false)}
                providerId={selectedProviderId}
            />
            <ProvidersProductsModal
                isOpen={isProvidersProductsModalOpen}
                onClose={() => setIsProvidersProductsModalOpen(false)}
                providerId={selectedProviderId}
            />
        </div>
    );
};

export default ProvidersAdminList;
