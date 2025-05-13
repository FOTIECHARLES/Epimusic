import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../Alerts/Alert";
import axios from "axios";
import {useTheme} from "../../../context/ThemeContext";
import { Helmet } from "react-helmet-async";

const DeliveryHomePage = () => {
    const [alert, setAlert] = useState({ message: "", type: "error" });
    const [cartPrice, setCartPrice] = useState(
        parseFloat(localStorage.getItem("cart_price") || 0)
    );
    const [shippingCosts, setShippingCosts] = useState(
        parseFloat(localStorage.getItem("cart_shipping_costs") || 0)
    );
    const [cartQuantity, setCartQuantity] = useState(
        parseInt(localStorage.getItem("cart_quantity") || 0)
    );
    const [total, setTotal] = useState((cartPrice + shippingCosts).toFixed(2));
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [address, setAddress] = useState("");
    const [complement, setComplement] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [displayState, setDisplayState] = useState(false);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const orderId = localStorage.getItem("orderId");

    const { isDark } = useTheme();
    const BgColor = isDark ? "bg-slate-600" : "bg-gray-100";
    const textColor = isDark ? "text-slate-200" : "text-gray-800";
    const borderColor = isDark ?  "border-slate-600" : "border-gray-100";
    const subTextColor = isDark ?  "text-slate-300" : "text-gray-600";

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/user/${user.id}/addresses`
                );
                setAddresses(response.data);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des adresses : ",
                    error
                );
                setError("Erreur lors de la récupération des adresses.");
            }
        };

        if (user) {
            setFirstname(user.firstname);
            setLastname(user.lastname);
            setEmail(user.email);
            fetchAddresses();
            setDisplayState(true);  
        }
    }, []);

    useEffect(() => {
        setTotal((cartPrice + shippingCosts).toFixed(2));
    }, [cartPrice, shippingCosts]);

    const handleAddressChange = (e) => {
        const selectedAddress = addresses.find(
            (address) => address.id === parseInt(e.target.value)
        );

        if (selectedAddress) {
            setTelephone(selectedAddress.telephone);
            setAddress(selectedAddress.address);
            setComplement(selectedAddress.complement);
            setPostalCode(selectedAddress.postalCode);
            setCity(selectedAddress.city);
            setCountry(selectedAddress.country);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `http://localhost:8000/api/order/${orderId}/address`,
                {
                    name: `${firstname} ${lastname}`,
                    telephone,
                    email,
                    address,
                    complement,
                    postalCode,
                    city,
                    country,
                }
            );
            setMessage("Adresse enregistrée avec succès !");
            navigate("/checkout/payment");
        } catch (error) {
            console.error(
                "Erreur lors de l'enregistrement de l'adresse : ",
                error
            );
            setError("Erreur lors de l'enregistrement de l'adresse.");
        }
    };

    return (
      <>
      <Helmet>
        <title>Livraison | Epimusic</title>
        <meta name="description" content="Sélectionnez votre adresse de livraison sur Epimusic." />
      </Helmet>
        <div className="lg:w-9/12 w-full m-auto">
            <Alert message={alert.message} type={alert.type} />
            <h1 className={`${textColor} text-center text-4xl font-bold my-4`}>
                Livraison à domicile
            </h1>
            <div className="w-full">
                <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mt-8 mb-8">
                    <div className={`${BgColor} w-full shadow rounded p-8 sm:p-12`}>
                        <p className={`text-3xl font-bold leading-7 text-center ${textColor}`}>
                            Adresse de livraison
                        </p>
                        {message && <p className="success">{message}</p>}
                        {error && <p className="error">{error}</p>}

                        {displayState && (
                            <div className="md:flex items-center mt-4">
                                <div className="w-full flex flex-col">
                                    <label
                                        htmlFor="address-select"
                                        className={`${subTextColor}`}
                                    >
                                        Carnet d'adresses
                                    </label>
                                    <select
                                        id="address-select"
                                        aria-label="Sélectionner une adresse existante"
                                        onChange={handleAddressChange}
                                        className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-2 bg-gray-100 border rounded border-gray-200"
                                    >
                                        <option value="">Sélectionnez une adresse</option>
                                        {addresses.map((address) => (
                                            <option key={address.id} value={address.id}>
                                                {address.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="md:flex items-center mt-4">
                                <div className="w-full flex flex-col md:w-1/2">
                                    <label
                                        htmlFor="lastname"
                                        className={`${subTextColor}`}
                                    >
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        id="lastname"
                                        aria-label="Nom"
                                        placeholder="Entrez votre nom"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        required
                                        className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-2 bg-gray-100 border rounded border-gray-200"
                                    />
                                </div>
                                <div className="w-full flex flex-col md:w-1/2 md:ml-6 md:mt-0 mt-4">
                                    <label
                                        htmlFor="firstname"
                                        className={`${subTextColor}`}
                                    >
                                        Prénom
                                    </label>
                                    <input
                                        type="text"
                                        id="firstname"
                                        aria-label="Prénom"
                                        placeholder="Entrez votre prénom"
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        required
                                        className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-2 bg-gray-100 border rounded border-gray-200"
                                    />
                                </div>
                            </div>
                            <div className="md:flex items-center mt-4">
                                <div className="w-full flex flex-col">
                                    <label
                                        htmlFor="telephone"
                                        className={`${subTextColor}`}
                                    >
                                        Numéro de téléphone
                                    </label>
                                    <input
                                        type="text"
                                        id="telephone"
                                        aria-label="Numéro de téléphone"
                                        placeholder="Entrez votre numéro de téléphone"
                                        value={telephone}
                                        onChange={(e) => setTelephone(e.target.value)}
                                        required
                                        className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-2 bg-gray-100 border rounded border-gray-200"
                                    />
                                </div>
                            </div>
                            <div className="md:flex items-center mt-4">
                                <div className="w-full flex flex-col">
                                    <label
                                        htmlFor="email"
                                        className={`${subTextColor}`}
                                    >
                                        Adresse e-mail
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        aria-label="Adresse e-mail"
                                        placeholder="Entrez votre adresse e-mail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-2 bg-gray-100 border rounded border-gray-200"
                                    />
                                </div>
                            </div>
                            <div className="md:flex items-center mt-4">
                                <div className="w-full flex flex-col">
                                    <label
                                        htmlFor="address"
                                        className={`${subTextColor}`}
                                    >
                                        Adresse
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        aria-label="Adresse de livraison"
                                        placeholder="Entrez l'adresse"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-2 bg-gray-100 border rounded border-gray-200"
                                    />
                                </div>
                            </div>
                            <div className="md:flex items-center mt-4">
                                <div className="w-full flex flex-col">
                                    <label
                                        htmlFor="complement"
                                        className={`${subTextColor}`}
                                    >
                                        Complément d'adresse
                                    </label>
                                    <input
                                        type="text"
                                        id="complement"
                                        placeholder="Entrez le complément d'adresse"
                                        value={complement}
                                        onChange={(e) =>
                                            setComplement(e.target.value)
                                        }
                                        className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-2 bg-gray-100 border rounded border-gray-200"
                                    />
                                </div>
                            </div>
                            <div className="md:flex items-center mt-4">
                                <div className="w-full flex flex-col md:w-1/2">
                                    <label
                                        htmlFor="postalCode"
                                        className={`${subTextColor}`}
                                    >
                                        Code postal
                                    </label>
                                    <input
                                        type="text"
                                        id="postalCode"
                                        aria-label="Code postal"
                                        placeholder="Entrez le code postal"
                                        value={postalCode}
                                        onChange={(e) =>
                                            setPostalCode(e.target.value)
                                        }
                                        required
                                        className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-2 bg-gray-100 border rounded border-gray-200"
                                    />
                                </div>
                                <div className="w-full flex flex-col md:w-1/2 md:ml-6 md:mt-0 mt-4">
                                    <label
                                        htmlFor="city"
                                        className={`${subTextColor}`}
                                    >
                                        Ville
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        aria-label="Ville"
                                        placeholder="Entrez la ville"
                                        value={city}
                                        onChange={(e) =>
                                            setCity(e.target.value)
                                        }
                                        required
                                        className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-2 bg-gray-100 border rounded border-gray-200"
                                    />
                                </div>
                            </div>
                            <div className="md:flex items-center mt-4">
                                <div className="w-full flex flex-col">
                                    <label
                                        htmlFor="country"
                                        className={`${subTextColor}`}
                                    >
                                        Pays
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        aria-label="Pays"
                                        placeholder="Entrez le pays"
                                        value={country}
                                        onChange={(e) =>
                                            setCountry(e.target.value)
                                        }
                                        required
                                        className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-2 bg-gray-100 border rounded border-gray-200"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                aria-label="Valider et passer au paiement"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 mt-4"
                            >
                                Valider et passer au payement
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

export default DeliveryHomePage;