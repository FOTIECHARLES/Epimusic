import React from "react";
import { FaMapMarkerAlt, FaTrash, FaEdit, FaStar } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const AddressCard = ({ address, onDelete, onEdit, onSetPrimary }) => {
    const { isDark } = useTheme();

    const cardBg = isDark ? "bg-slate-600" : "bg-white";
    const textColor = isDark ? "text-slate-200" : "text-black";
    const iconColor = isDark ? "text-gray-300" : "text-gray-500";


    return (
        <div className={`${cardBg} shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center`}>
            <div className="mb-4">
                <FaMapMarkerAlt size={40} className={`${iconColor}`} aria-hidden="true"/>
            </div>
            <h2 className={`text-xl font-bold mb-4 ${textColor}`}>Adresse</h2>
            <p className={`text-center ${textColor}`}><strong>Nom :</strong> {address.name}</p>
            <p className={`text-center ${textColor}`}><strong>Téléphone :</strong> {address.telephone}</p>
            <p className={`text-center ${textColor}`}><strong>Adresse :</strong> {address.address}</p>
            {address.complement && (
                <p className={`text-center ${textColor}`}><strong>Complément :</strong> {address.complement}</p>
            )}
            <p className={`text-center ${textColor}`}><strong>Code Postal :</strong> {address.postalCode}</p>
            <p className={`text-center ${textColor}`}><strong>Ville :</strong> {address.city}</p>
            <p className={`text-center ${textColor}`}><strong>Pays :</strong> {address.country}</p>
            <div className="flex mt-4 space-x-2">
                <button
                    onClick={() => onEdit(address.id)}
                    className="bg-green-600 text-white p-2 rounded-full hover:bg-green-500 flex items-center justify-center"
                    aria-label={`Modifier l'adresse ${address.name}`}
                >
                    <FaEdit size={20} aria-hidden="true" />
                </button>
                <button
                    onClick={() => onDelete(address.id)}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-500 flex items-center justify-center"
                    aria-label={`Supprimer l'adresse ${address.name}`}
                >
                    <FaTrash size={20} aria-hidden="true" />
                </button>
                <button
                    onClick={() => onSetPrimary(address.id)}
                    className={`p-2 rounded-full flex items-center justify-center ${
                        address.isPrimary ? "bg-yellow-500 text-white" : "bg-gray-400 text-white hover:bg-gray-300"
                    }`}
                    disabled={address.isPrimary}
                    aria-label={
                        address.isPrimary
                            ? `Adresse ${address.name} déjà définie comme principale`
                            : `Définir ${address.name} comme adresse principale`
                    }
                >
                    <FaStar size={20} aria-hidden="true" />
                </button>
            </div>
        </div>
    );
};

export default AddressCard;