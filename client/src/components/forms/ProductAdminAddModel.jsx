import React, { useState, useEffect } from "react";
import Alert from "../Alerts/Alert";
import ProductAdminUpdateModel from "./ProductAdminUpdateModel";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";


const ProductAdminAddModel = () => {
    const { id: productId, category } = useParams();
    const navigate = useNavigate();

    const [categoryId, setCategoryId] = useState(null);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [photoFiles, setPhotoFiles] = useState([]);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alert, setAlert] = useState({ type: "", message: "" });
    const [showModal, setShowModal] = useState(false);
    const [existingModelId, setExistingModelId] = useState(null);
    const [modalMessage, setModalMessage] = useState("");

    const { isDark } = useTheme();

    const cardBg = isDark ? "bg-slate-600" : "bg-white";
    const textColor = isDark ? "text-slate-200" : "text-black";
    const inputBg = isDark ? "bg-slate-700" : "bg-gray-100";
    const borderColor = isDark ? "border-slate-400" : "border-gray-200";


    const getCategoryId = async (category) => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/admin/get/catergoryId?name=${category}`
            );
            if (!response.ok) {
                setAlert({ type: "error", message: response.message });
                return;
            }
            const data = await response.json();
            setCategoryId(data.id);
        } catch (error) {
            setAlert({
                type: "error",
                message: "Erreur lors de la récupération de la catégorie",
            });
        }
    };

    const getColors = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/admin/colors`
            );
            if (!response.ok) {
                setAlert({ type: "error", message: response.message });
                return;
            }
            const data = await response.json();
            setColors(data);
        } catch (error) {
            setAlert({
                type: "error",
                message: "Erreur lors de la récupération des couleurs",
            });
        }
    };

    const getSizes = async (categoryId) => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/admin/sizes/category/${categoryId}` //localhost
            );
            if (!response.ok) {
                setAlert({ type: "error", message: response.message });
                return;
            }
            const data = await response.json();
            setSizes(data);
        } catch (error) {
            setAlert({
                type: "error",
                message: "Erreur lors de la récupération des tailles",
            });
        }
    };

    const shouldDisplayColor = (categoryId) => {
        return categoryId === 1 || categoryId === 3;
    };

    const shouldDisplaySize = (categoryId) => {
        return categoryId === 2 || categoryId === 3;
    };

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://localhost:8000/upload", { //localhost
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Erreur lors de l'upload de l'image");
        }

        const result = await response.json();
        return result.filePath;
    };

    useEffect(() => {
        if (category) {
            getCategoryId(category);
            getColors();
        }
    }, [category]);

    useEffect(() => {
        if (categoryId) {
            getSizes(categoryId);
        }
    }, [categoryId]);

    const handlePhotoChange = (e) => {
        setPhotoFiles(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const uploadedPhotos = await Promise.all(
                photoFiles.map((file) => uploadImage(file))
            );

            const newModel = {
                productId,
                color,
                size,
                price: parseFloat(price.replace(",", ".")),
                stock: parseInt(stock, 10),
                mainImageIndex,
                photoPaths: uploadedPhotos,
            };

            const response = await fetch(
                `http://localhost:8000/api/admin/addModel`, //localhost
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newModel),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 409) {
                    setExistingModelId(data.existingModelId);
                    setShowModal(true);
                    setModalMessage(data.error);
                }

                setAlert({ type: "error", message: data.message });
            } else {
                setAlert({
                    type: "success",
                    message: "Modèle créé avec succès",
                });
                navigate(`/admin/products`);
            }
        } catch (error) {
            setAlert({
                type: "error",
                message: "Erreur lors de la création du modèle",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="w-full" aria-label="Section d'ajout de modèle de produit">
            <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mt-8 mb-8">
                <div className={`${cardBg} w-full shadow rounded p-8 sm:p-12`}>
                    <Alert type={alert.type} message={alert.message} />
                    <form onSubmit={handleSubmit} aria-label="Formulaire de création de modèle">
                        <h2 className={`${textColor} text-2xl font-bold mt-4 text-center`}>
                            Ajouter un nouveau modèle
                        </h2>
                        {shouldDisplayColor(categoryId) && (
                            <div className="md:flex items-center mt-8">
                                <div className="w-full flex flex-col">
                                    <label
                                        className={`font-semibold leading-none ${textColor}`}
                                        htmlFor="color"
                                    >
                                        Couleur
                                    </label>
                                    <select
                                        id="color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className={`${inputBg} leading-none ${textColor} p-3 focus:outline-none focus:border-blue-700 mt-4 ${borderColor} border rounded`}
                                        aria-label="Sélectionner une couleur"

                                    >
                                        <option value="">Sélectionnez une couleur</option>
                                        {colors.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                        {shouldDisplaySize(categoryId) && (
                            <div className="md:flex items-center mt-8">
                                <div className="w-full flex flex-col">
                                    <label
                                        className={`font-semibold leading-none ${textColor}`}
                                        htmlFor="size"
                                    >
                                        Taille
                                    </label>
                                    <select
                                        id="size"
                                        value={size}
                                        onChange={(e) => setSize(e.target.value)}
                                        className={`${inputBg} leading-none ${textColor} p-3 focus:outline-none focus:border-blue-700 mt-4 ${borderColor} border rounded`}
                                        aria-label="Sélectionner une taille"

                                    >
                                        <option value="">Sélectionnez une taille</option>
                                        {sizes.map((s) => (
                                            <option key={s.id} value={s.id}>
                                                {s.value} {s.unit}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                        <div className="md:flex items-center mt-8">
                            <div className="w-full flex flex-col">
                                <label
                                    className={`font-semibold leading-none ${textColor}`}
                                    htmlFor="price"
                                >
                                    Prix
                                </label>
                                <input
                                    type="text"
                                    id="price"
                                    placeholder="Entrez le prix du produit"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                    className={`${inputBg} leading-none ${textColor} p-3 focus:outline-none focus:border-blue-700 mt-4 ${borderColor} border rounded`}
                                    aria-label="Entrez le prix du produit"
                                />
                            </div>
                        </div>
                        <div className="md:flex items-center mt-8">
                            <div className="w-full flex flex-col">
                                <label
                                    className={`font-semibold leading-none ${textColor}`}
                                    htmlFor="stock"
                                >
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    id="stock"
                                    placeholder="Entrez le stock du produit"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    min="0"
                                    required
                                    className={`${inputBg} leading-none ${textColor} p-3 focus:outline-none focus:border-blue-700 mt-4 ${borderColor} border rounded`}
                                    aria-label="Entrez le stock du produit"
                                />
                            </div>
                        </div>
                        <div className="md:flex items-center mt-8">
                            <div className="w-full flex flex-col">
                                <label
                                    className={`font-semibold leading-none ${textColor}`}
                                    htmlFor="photos"
                                >
                                    Photos
                                </label>
                                <input
                                    type="file"
                                    id="photos"
                                    multiple
                                    onChange={handlePhotoChange}
                                    className={`${inputBg} leading-none ${textColor} p-3 focus:outline-none focus:border-blue-700 mt-4 ${borderColor} border rounded`}
                                    aria-label="Sélectionner des photos"
                                />
                                <div className="flex flex-col mt-4" aria-label="Liste des photos sélectionnées">
                                    {photoFiles.map((file, index) => (
                                        <div key={index} className="flex items-center mt-2">
                                            <p className="mr-4">{file.name}</p>
                                            <button
                                                type="button"
                                                className={`mr-4 px-3 py-1 rounded ${
                                                    mainImageIndex === index
                                                        ? "bg-blue-600 text-white"
                                                        : "bg-gray-200 text-gray-800"
                                                }`}
                                                onClick={() =>
                                                    setMainImageIndex(index)
                                                }
                                                aria-label={
                                                    mainImageIndex === index
                                                        ? "Image principale sélectionnée"
                                                        : "Définir comme image principale"
                                                }
                                            >
                                                {mainImageIndex === index
                                                    ? "Image principale"
                                                    : "Définir comme principale"}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-full mt-8">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`font-semibold leading-none text-white py-4 px-10 rounded focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none ${
                                    isSubmitting
                                        ? "bg-gray-400"
                                        : "bg-blue-700 hover:bg-blue-600"
                                }`}
                                aria-label="Créer le modèle"
                            >
                                {isSubmitting
                                    ? "Envoi en cours..."
                                    : "Créer le modèle"}
                            </button>
                        </div>
                    </form>

                    <ProductAdminUpdateModel
                        isOpen={showModal}
                        onClose={handleCloseModal}
                        modelId={existingModelId}
                        productCategoryId={categoryId}
                        message={modalMessage}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductAdminAddModel;
