import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import "../../styles/ProductList.css";
import CategoryCard from "../cards/CategoryCard";

const ProductCategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/admin/categories"); //localhost
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories : ", error);
        setError("Erreur lors de la récupération des catégories.");
      }
    };

    fetchCategories();
  }, []);

    return (
    <>
      <Helmet>
        <title>Catégories de Produits | Epimusic</title>
        <meta name="description" content="Explorez les différentes catégories de produits disponibles sur Epimusic." />
        <meta property="og:title" content="Catégories de produits | Epimusic" />
        <meta
          property="og:description"
          content="Parcourez nos différentes catégories de produits : instruments, vinyles, goodies et bien d'autres !"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Catégories de produits | Epimusic" />
        <meta name="twitter:description" content="Trouvez vos différentes catégories de produits musicaux sur Epimusic." />
        <meta name="twitter:creator" content="@Epimusic" />
        <meta name="twitter:site" content="@Epimusic" />
      </Helmet>
        <div className="flex flex-wrap justify-center" aria-label="Liste des catégories de produits">
            {error && <p className="text-red-500" role="alert">{error}</p>}
            {categories.map((category) => (
                <CategoryCard
                    key={category.id}
                    imageSrc={`http://localhost:8000${category.imagePath}`}
                    categoryName={category.name}
                    categoryId={category.id}
                />
            ))}
        </div>
</>
    );
};

export default ProductCategoriesList;
