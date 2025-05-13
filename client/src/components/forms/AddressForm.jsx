import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddressForm = () => {
    const [name, setName] = useState("");
    const [telephone, setTelephone] = useState("");
    const [address, setAddress] = useState("");
    const [complement, setComplement] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [isPrimary, setIsPrimary] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const user = JSON.parse(localStorage.getItem('user')); 
        const userId = user.id; 

        const newAddress = {
            name,
            telephone,
            address,
            complement,
            postalCode,
            city,
            country,
            isPrimary,
        };

        try {
            await axios.post(`http://localhost:8000/api/user/${userId}/addresses`, newAddress, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setMessage("Adresse créée avec succès!");
            setError("");
            setTimeout(() => {
                navigate("/profile/address-book");
            }, 2000);
        } catch (error) {
            console.error("Erreur lors de la création de l'adresse", error);
            setError("Erreur lors de la création de l'adresse.");
            setMessage("");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full">
            <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mt-8 mb-8">
                <div className="bg-white w-full shadow rounded p-8 sm:p-12">
                    <p className="text-3xl font-bold leading-7 text-center text-black">
                        Ajouter une nouvelle adresse
                    </p>
                    {message && <p className="success" aria-live="polite">{message}</p>}
                    {error && <p className="error" aria-live="polite">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="md:flex items-center mt-12">
                            <div className="w-full flex flex-col">
                                <label htmlFor="name" className="font-semibold leading-none text-black">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    aria-label="Nom de l'adresse"
                                    placeholder="Entrez le nom"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                                />
                            </div>
                        </div>

                        <div className="md:flex items-center mt-8">
                            <div className="w-full flex flex-col">
                                <label htmlFor="telephone" className="font-semibold leading-none text-black">
                                    Téléphone
                                </label>
                                <input
                                    type="text"
                                    id="telephone"
                                    aria-label="Numéro de téléphone"
                                    placeholder="Entrez le numéro de téléphone"
                                    value={telephone}
                                    onChange={(e) => setTelephone(e.target.value)}
                                    required
                                    className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                                />
                            </div>
                        </div>

                        <div className="md:flex items-center mt-8">
                            <div className="w-full flex flex-col">
                                <label htmlFor="address" className="font-semibold leading-none text-black">
                                    Adresse
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    aria-label="Adresse complète"
                                    placeholder="Entrez l'adresse"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                    className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                                />
                            </div>
                        </div>

                        <div className="md:flex items-center mt-8">
                            <div className="w-full flex flex-col">
                                <label htmlFor="complement" className="font-semibold leading-none text-black">
                                    Complément
                                </label>
                                <input
                                    type="text"
                                    id="complement"
                                    aria-label="Complément d'adresse (facultatif)"
                                    placeholder="Entrez le complément"
                                    value={complement}
                                    onChange={(e) => setComplement(e.target.value)}
                                    className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                                />
                            </div>
                        </div>

                        <div className="md:flex items-center mt-8">
                            <div className="w-full flex flex-col md:w-1/2">
                                <label htmlFor="postalCode" className="font-semibold leading-none text-black">
                                    Code Postal
                                </label>
                                <input
                                    type="text"
                                    id="postalCode"
                                    aria-label="Code postal"
                                    placeholder="Entrez le code postal"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    required
                                    className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                                />
                            </div>
                            <div className="w-full flex flex-col md:w-1/2 md:ml-6 md:mt-0 mt-4">
                                <label htmlFor="city" className="font-semibold leading-none text-black">
                                    Ville
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    aria-label="Ville"
                                    placeholder="Entrez la ville"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                    className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                                />
                            </div>
                        </div>

                        <div className="md:flex items-center mt-8">
                            <div className="w-full flex flex-col">
                                <label htmlFor="country" className="font-semibold leading-none text-black">
                                    Pays
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    aria-label="Pays"
                                    placeholder="Entrez le pays"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                    className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                                />
                            </div>
                        </div>

                        <div className="flex items-center mt-8">
                            <input
                                type="checkbox"
                                id="isPrimary"
                                checked={isPrimary}
                                onChange={(e) => setIsPrimary(e.target.checked)}
                                aria-labelledby="isPrimary-label"
                                className="mr-2 leading-none"
                            />
                            <label id="isPrimary-label" className="font-semibold leading-none text-black" htmlFor="isPrimary">
                                Définir comme adresse principale
                            </label>
                        </div>

                        <div className="flex items-center justify-center w-full mt-8">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="font-semibold leading-none text-white py-4 px-10 rounded bg-blue-700 hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none"
                            >
                                Ajouter l'adresse
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddressForm;
