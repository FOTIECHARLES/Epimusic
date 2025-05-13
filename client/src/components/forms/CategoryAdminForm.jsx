import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const CategoryAdminForm = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const { isDark } = useTheme();

    const cardBg = isDark ? "bg-slate-600" : "bg-white";
    const textColor = isDark ? "text-slate-200" : "text-black";
    const inputBg = isDark ? "bg-slate-700" : "bg-gray-100";
    const borderColor = isDark ? "border-slate-400" : "border-gray-200";
    const buttonBg = isDark ? "bg-blue-700 hover:bg-blue-600" : "bg-blue-700 hover:bg-blue-600";
    const buttonTextColor = isDark ? "text-white" : "text-white";

    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append("file", image);

        try {
            const response = await axios.post("http://localhost:8000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data.filePath;
        } catch (error) {
            setError("Erreur lors du téléchargement de l'image.");
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        let imagePath = null;
        if (image) {
            imagePath = await handleImageUpload();
            if (!imagePath) return;
        }

        const formData = { name, imagePath };

        try {
            await axios.post("http://localhost:8000/api/admin/categories", formData, {
                headers: { "Content-Type": "application/json" },
            });
            setMessage("Catégorie créée avec succès !");
            setError("");
            setTimeout(() => {
                navigate("/admin/categories");
            }, 2000);
        } catch (error) {
            console.error("Erreur lors de la création de la catégorie!", error);
            setError("Erreur lors de la création de la catégorie.");
            setMessage("");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full">
            <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mt-8 mb-8">
                <div className={`${cardBg} w-full shadow rounded p-8 sm:p-12`}>
                    <p className={`text-3xl font-bold leading-7 text-center ${textColor}`}>
                        Créer une nouvelle catégorie
                    </p>
                    {message && <p className="success">{message}</p>}
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="md:flex items-center mt-12">
                            <div className="w-full md:w-1/2 flex flex-col">
                                <label className={`font-semibold leading-none ${textColor}`} htmlFor="name">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    aria-label="Nom de la catégorie"
                                    placeholder="Entrez le nom de la catégorie"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className={`${inputBg} ${borderColor} leading-none ${textColor} p-3 focus:outline-none focus:border-blue-700 mt-4 border rounded`}
                                />
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                                <label className={`font-semibold leading-none ${textColor}`} htmlFor="image">
                                    Image
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    aria-label="Télécharger une image pour la catégorie"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className={`${inputBg} ${borderColor} leading-none ${textColor} p-3 focus:outline-none focus:border-blue-700 mt-4 border rounded`}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-full mt-8">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`font-semibold leading-none ${buttonTextColor} py-4 px-10 rounded focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none ${
                                    isSubmitting ? 'bg-gray-400' : buttonBg
                                }`}
                            >
                                Créer la catégorie
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoryAdminForm;