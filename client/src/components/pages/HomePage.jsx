import React, {useEffect, useState} from 'react';
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/ProductList.css";
import HomeCarousel from "../carousel/HomeCarousel";
import vinyles from "../../assets/vinyles.webp";
import instruments from "../../assets/instruments.webp";
import goodies from "../../assets/goodies.webp";

const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [message] = useState("");
    const [error, setError] = useState("");

    const imagesToDisplay = [
        {
            src: vinyles,
            title: "Collection de Vinyles",
            description: "Découvrez notre vaste collection de vinyles vintages et modernes",
            link: "/products/vinyle/2"
        },
        {
            src: instruments,
            title: "Instruments de Musique",
            description: "Trouvez une variété d’instruments de musique pour tous les profils.",
            link: "/products/instruments/1"
        },
        {
            src: goodies,
            title: "Goodies",
            description: "Parcourez notre gamme de produits et d’objets de collection EpiMusic.",
            link: "/products/goodies/3"
        },
    ];

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/admin/categories")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the categories!",
                    error
                );
                setError("There was an error fetching the categories!");
            });
    }, []);

    return (
        <>
        <Helmet>
            <title>Accueil | Epimusic</title>
        </Helmet>
        <div aria-label="Page d'accueil">
            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}
            <HomeCarousel images={imagesToDisplay} />
            <div className="flex flex-wrap justify-center">
                {error && <p className="text-red-500" aria-label="Message d'erreur">{error}</p>}
            </div>
        </div>
        </>
    );
};

export default HomePage;
