import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddressCard from "../cards/AddressCard";
import { useTheme } from "../../context/ThemeContext";

const UserAddressBook = () => {
    const [addresses, setAddresses] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { isDark } = useTheme();

    const textColor = isDark ? "text-slate-200" : "text-black";

    useEffect(() => {
        const fetchAddresses = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            const userId = user.id;

            try {
                const response = await axios.get(`http://localhost:8000/api/user/${userId}/addresses`);
                setAddresses(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des adresses : ", error);
                setError("Erreur lors de la récupération des adresses.");
            }
        };

        fetchAddresses();
    }, []);

    const handleSetPrimary = async (id) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.id;

        try {
            await axios.patch(`http://localhost:8000/api/user/${userId}/addresses/${id}/set-primary`);
            const updatedAddresses = addresses.map((address) =>
                address.id === id
                    ? { ...address, isPrimary: true }
                    : { ...address, isPrimary: false }
            );
            setAddresses(updatedAddresses);
        } catch (error) {
            console.error("Erreur lors de la définition de l'adresse principale", error);
            setError("Erreur lors de la définition de l'adresse principale.");
        }
    };

    const handleAddAddress = () => {
        navigate("/profile/address-book/create");
    };

    const handleDeleteAddress = async (id) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.id;

        try {
            await axios.delete(`http://localhost:8000/api/user/${userId}/addresses/${id}`);
            setAddresses(addresses.filter((address) => address.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression de l'adresse", error);
            setError("Erreur lors de la suppression de l'adresse.");
        }
    };

    return (
        <div className="w-full" aria-label="Carnet d'adresses">
            <div className="flex flex-col items-center mb-4">
                <h2 className={`text-xl font-bold mb-4 ${textColor}`}>Carnet d'Adresses</h2>
                <button
                    onClick={handleAddAddress}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                    aria-label="Ajouter une adresse"
                >
                    Ajouter une adresse
                </button>
            </div>
            {error && (
                <p className="text-red-500 text-center" role="alert">
                    {error}
                </p>
            )}
            <div className="flex flex-wrap justify-center gap-4" aria-label="Liste des adresses enregistrées">
                {addresses.length > 0 ? (
                    addresses.map((address) => (
                        <AddressCard
                            key={address.id}
                            address={address}
                            onDelete={handleDeleteAddress}
                            onEdit={(id) => navigate(`/profile/address-book/edit/${id}`)}
                            onSetPrimary={handleSetPrimary}
                        />
                    ))
                ) : (
                    <p className={`text-center ${textColor}`}>Aucune adresse enregistrée.</p>
                )}
            </div>
        </div>
    );
};


export default UserAddressBook;