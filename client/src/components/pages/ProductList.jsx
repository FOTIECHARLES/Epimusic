import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faFilter } from "@fortawesome/free-solid-svg-icons";
import ProductColors from "../ProductDetails/ProductColors";
import ProductSizes from "../ProductDetails/ProductSizes";
import ProductFilter from "../Filtered/ProductFilter";
import { useTheme } from "../../context/ThemeContext";

const ProductList = () => {
  const { categoryId, category } = useParams();
  const formattedCategory = formatCategory(category);
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    brands: [],
    colors: [],
    sizes: [],
    priceRange: [0, 1150],
    weightRange: [0, 50],
    categories: []
  });
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [availableFilterBrands, setAvailableBrands] = useState([]);
  const [availableFilterColors, setAvailableColors] = useState([]);
  const [availableFilterSizes, setAvailableSizes] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1150);
  const [maxWeight, setMaxWeight] = useState(50);
  const [availableFilterCategories, setAvailableCategories] = useState([]);

  const [shouldApplyFilters, setShouldApplyFilters] = useState(false);

  const { isDark } = useTheme();
  const cardBg = isDark ? "bg-slate-600" : "bg-white";
  const textColor = isDark ? "text-slate-200" : "text-[#634832]";
  const borderColor = isDark ? "border-sky-400" : "border-gray-300";

  function formatCategory(category) {
    if (!category) {
      return '';
    }

    let formatted = category.toLowerCase().trim();

    if (formatted.length > 0) {
      formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    }

    if (!formatted.endsWith('s')) {
      formatted += 's';
    }

    return formatted;
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query") || "";
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: query
    }));
  }, [location.search]);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  useEffect(() => {
    fetchProducts();
  }, [categoryId, filters.search]);

  useEffect(() => {
    if (shouldApplyFilters) {
      handleApplyFilters();
      setShouldApplyFilters(false);
    }
  }, [filters, products, shouldApplyFilters]);

  useEffect(() => {
    products.forEach((product) => {
      if (product.models && product.models.length > 0) {
        const firstColor = product.models[0].color;
        const firstSize = product.models[0].size;

        setSelectedColors((prevColors) => ({
          ...prevColors,
          [product.id]: prevColors[product.id] || firstColor,
        }));

        setSelectedSizes((prevSizes) => ({
          ...prevSizes,
          [product.id]: prevSizes[product.id] || firstSize,
        }));
      }
    });
  }, [products]);

  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.search) {
        queryParams.append('search', filters.search);
      }
      const response = await axios.get(
          `http://localhost:8000/api/products/category/${categoryId}?${queryParams.toString()}`
      );

      setProducts(response.data);

      const brandsSet = new Set();
      const colorsSet = new Set();
      const sizesSet = new Set();
      const categoriesSet = new Set();
      let highestPrice = 0;
      let highestWeight = 0;

      response.data.forEach((product) => {
        product.brands.forEach((brand) => brandsSet.add(brand));
        categoriesSet.add(product.category);
        product.models.forEach((model) => {
          if (model.size) sizesSet.add(model.size);
          if (model.color) colorsSet.add(model.color);
          if (model.size) sizesSet.add(model.size);
          if (model.price > highestPrice)
            highestPrice = model.price + 1;
          if (model.weight && model.weight > highestWeight)
            highestWeight = model.weight;
        });
      });

      setAvailableBrands(Array.from(brandsSet));
      setAvailableColors(Array.from(colorsSet));
      setAvailableSizes(Array.from(sizesSet));
      setAvailableCategories(Array.from(categoriesSet));
      setMaxPrice(highestPrice);
      setMaxWeight(highestWeight);

      setFilters((prevFilters) => ({
        ...prevFilters,
        priceRange: [0, highestPrice],
        weightRange: [0, highestWeight],
      }));

      handleApplyFilters();
    } catch (error) {
      setError(
          "Une erreur s'est produite lors de la récupération des produits !"
      );
    }
  };

  const applyFilters = () => {
    let filtered = products;

    if (filters.brands.length > 0) {
      filtered = filtered.filter((product) =>
          filters.brands.some((brand) => product.brands.includes(brand))
      );
    }

    if (filters.colors.length > 0) {
      filtered = filtered.filter((product) =>
          product.models.some((model) =>
              filters.colors.includes(model.color)
          )
      );
    }

    if (filters.sizes.length > 0) {
      filtered = filtered.filter((product) =>
          product.models.some((model) =>
              filters.sizes.includes(model.size)
          )
      );
    }

    if (filters.priceRange.length === 2) {
      filtered = filtered.filter((product) =>
          product.models.some(
              (model) =>
                  model.price >= filters.priceRange[0] &&
                  model.price <= filters.priceRange[1]
          )
      );
    }

    if (filters.weightRange.length === 2) {
      filtered = filtered.filter((product) =>
          product.models.some(
              (model) =>
                  model.weight >= filters.weightRange[0] &&
                  model.weight <= filters.weightRange[1]
          )
      );
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
          filters.categories.includes(product.category)
      );
    }

    if (category === undefined) {
      updateAvailableFilters(filtered);
    }


    setFilteredProducts(filtered);
  };

  const updateAvailableFilters = (filteredProducts) => {
    const brandsSet = new Set();
    const colorsSet = new Set();
    const sizesSet = new Set();

    filteredProducts.forEach((product) => {
      product.brands.forEach((brand) => brandsSet.add(brand));
      product.models.forEach((model) => {
        if (model.size) sizesSet.add(model.size);
        if (model.color) colorsSet.add(model.color);
      });
    });

    setAvailableBrands(Array.from(brandsSet));
    setAvailableColors(Array.from(colorsSet));
    setAvailableSizes(Array.from(sizesSet));
  };

  const handleColorSelect = (productId, color) => {
    setSelectedColors((prevColors) => {
      const updatedColors = { ...prevColors, [productId]: color };
      const product = products.find((p) => p.id === productId);
      const availableSizes = product.models
          .filter((model) => model.color === color)
          .map((model) => model.size);

      const updatedSize = availableSizes.includes(
          selectedSizes[product.id]
      )
          ? selectedSizes[product.id]
          : availableSizes[0];

      setSelectedSizes((prevSizes) => ({
        ...prevSizes,
        [productId]: updatedSize,
      }));

      return updatedColors;
    });
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [productId]: size,
    }));
  };

  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("cart_token");
    const model = product.models.find((model) => {
      if (!model.color && !model.size) {
        return true;
      }
      return (
          model.color === selectedColors[product.id] &&
          model.size === selectedSizes[product.id]
      );
    });

    if (!model) return;

    const data = {
      model_id: model.model_id,
      quantity: 1,
    };

    if (user) {
      data.user_id = user.id;
    } else if (token) {
      data.token = token;
    }

    axios
        .post(`http://localhost:8000/api/cart/add/${product.id}`, data)
        .then((response) => {
          setAlert("Produit ajouté au panier !");
          if (response.data.token) {
            localStorage.setItem("cart_token", response.data.token);
          }
        })
        .catch(() => {
          setAlert("Erreur lors de l'ajout du produit au panier.");
        });
  };

  const handleApplyFilters = () => {
    setShouldApplyFilters(true);
  };

  return (
      <>
        <Helmet>
          <title>{formattedCategory} | Epimusic</title>
          <meta name="description" content={`Découvrez notre large sélection de produits ${formattedCategory}.`} />
          <meta
              name="keywords"
              content={`produits ${formattedCategory.toLowerCase()}, ${formattedCategory.toLowerCase()}, musique, instruments de musique, accessoires de ${formattedCategory.toLowerCase()}, boutique ${formattedCategory.toLowerCase()}, Epimusic`}
          />
          <meta property="og:title" content={`${formattedCategory} | Epimusic`} />
          <meta property="og:description" content={`Découvrez notre large sélection de produits ${formattedCategory}.`} />
          <meta name="twitter:title" content={`${formattedCategory} | Epimusic`} />
          <meta name="twitter:description" content={`Découvrez notre large sélection de produits ${formattedCategory}.`} />
          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
      <div className="relative container mx-auto p-4">
        {error && (
            <p className="text-red-500 font-bold text-center mb-4" role="alert">
              {error}
            </p>
        )}
        {alert && (
            <p className="text-green-500 font-bold text-center mb-4"  role="status">
              {alert}
            </p>
        )}
        {formattedCategory ? (
            <h1 className={`text-center text-4xl font-bold my-4 ${textColor}`}  aria-label={`Catégorie ${formattedCategory}`}>
              {formattedCategory}
            </h1>
        ) : (
            <h1 className={`text-center text-4xl font-bold my-4 ${textColor}`} aria-label="Tous les produits">
              Tous les produits
            </h1>
        )}

        <AnimatePresence>
          {isFilterVisible && (
              <>
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsFilterVisible(false)}
                />
                <motion.div
                    className="fixed top-0 left-0 lg:w-3/4 w-5/6 max-w-sm h-full bg-white z-50 shadow-lg p-4"
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "tween", duration: 0.3 }}
                >
                  <ProductFilter
                      categories={availableFilterCategories}
                      brands={availableFilterBrands}
                      colors={availableFilterColors}
                      sizes={availableFilterSizes}
                      maxPrice={maxPrice}
                      maxWeight={maxWeight}
                      onFiltersChange={setFilters}
                  />
                  <button
                      className="mt-4 bg-red-500 text-white p-2 rounded w-full"
                      onClick={() => setIsFilterVisible(false)}
                  >
                    Fermer
                  </button>
                </motion.div>
              </>
          )}
        </AnimatePresence>

        <div className="flex">
          <div className="w-full flex-1 p-4">
            <button
                className="text-white p-3 bg-gray-500 rounded-full shadow-lg flex items-center justify-center mb-4 space-x-2"
                onClick={() => setIsFilterVisible(true)}
            >
              <FontAwesomeIcon icon={faFilter} size="lg" />
              <span>Filtrer les produits</span>
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => {
                    const selectedColor = selectedColors[product.id];
                    const selectedSize = selectedSizes[product.id];
                    const filteredModel = product.models.find(
                        (model) =>
                            model.color === selectedColor &&
                            model.size === selectedSize
                    );

                    const uniqueColors = Array.from(
                        new Set(
                            product.models.map(
                                (model) => model.color
                            )
                        )
                    );
                    const availableSizes = filteredModel
                        ? Array.from(
                            new Set(
                                product.models
                                    .filter(
                                        (model) =>
                                            model.color ===
                                            selectedColor
                                    )
                                    .map((model) => model.size)
                            )
                        )
                        : [];

                    const promotion =
                        product.promotions.length > 0
                            ? product.promotions[0]
                            : null;

                    return (
                        <div
                            key={product.id}
                            className={`card ${cardBg} ${borderColor} border-2 rounded-lg p-4 flex flex-col transition-transform duration-300 ease-in-out hover:scale-105 ${textColor} overflow-hidden`}
                            aria-label={`Produit ${product.name}`}
                            style={{
                              maxWidth: "100%",

                            }}
                        >
                          <Link
                              to={`/product/${product.id}`}
                              className="flex flex-col h-full"
                          >
                            <div className="flex-1 flex justify-center items-center mb-1" aria-label={`Voir les détails du produit ${product.name}`}>
                              {filteredModel?.images &&
                              filteredModel.images.length > 0 ? (
                                  <img
                                      src={`http://localhost:8000${filteredModel.images.find(
                                          (img) => img.is_main
                                      )?.path}`}
                                      alt={`Image principale de ${product.name}`}
                                      className="object-contain max-w-full max-h-48"
                                  />
                              ) : (
                                  <div className="flex items-center justify-center w-full h-48 bg-gray-200 text-gray-600"
                                       aria-label="Image non disponible"
                                  >
                                    <p>Aucune image disponible</p>
                                  </div>
                              )}
                            </div>
                          </Link>
                          <div className="flex-1 flex flex-col justify-between">
                            <h2 className="text-lg font-bold mb-2 line-clamp-1">{product.name}</h2>
                            {!formattedCategory && (
                                <p className="line-clamp-3 mb-2">Catégorie : {product.category}</p>
                            )}
                            <p className="line-clamp-3 mb-2">{product.description}</p>
                            <p className="line-clamp-3 mb-2">Poids : {product.weight}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <ProductColors
                                    colors={uniqueColors}
                                    selectedColor={selectedColor}
                                    onColorSelect={(color) => handleColorSelect(product.id, color)}
                                    isDark={isDark}
                                />
                                <ProductSizes
                                    sizes={availableSizes}
                                    selectedSize={selectedSize}
                                    onSizeSelect={(size) => handleSizeSelect(product.id, size)}
                                    isDark={isDark}
                                />
                              </div>
                              <div className="w-1/3 ml-4">
                                {filteredModel?.stock !== undefined && (
                                    <>
                                      {filteredModel.stock > 0 && filteredModel.stock <= 5 ? (
                                          <>
                                            <p>Stock : {filteredModel.stock}</p>
                                            <p className="text-orange-500 font-bold"
                                               aria-label="Stock faible"
                                            >
                                              Bientôt épuisé
                                            </p>
                                          </>
                                      ) : filteredModel.stock > 5 ? (
                                          <>
                                            <p>Stock : {filteredModel.stock}</p>
                                            <p className="text-green-500 font-bold"
                                               aria-label="Stock disponible"
                                            >
                                              En stock
                                            </p>
                                          </>
                                      ) : (
                                          <p className="text-red-500 font-bold"
                                             aria-label="Rupture de stock"
                                          >
                                            Rupture de stock
                                          </p>
                                      )}
                                    </>
                                )}
                              </div>
                            </div>

                            {promotion ? (
                                <div className="flex flex-col mb-2">
                                                <span className="text-gray-500 line-through text-lg">
                                                    ${filteredModel?.price?.toFixed(2) || "N/A"}
                                                </span>
                                  <span className="text-red-600 text-xl font-bold">${promotion.promo_price}</span>
                                  <p className="text-sm text-red-600 font-bold">
                                    Promotion du {promotion.start_date} au {promotion.end_date}
                                  </p>
                                </div>
                            ) : (
                                <p className="text-xl font-bold">
                                  ${filteredModel?.price?.toFixed(2) || "Non disponible"}
                                </p>
                            )}
                          </div>

                          <button
                              className={`mt-4 py-2 px-4 rounded w-full flex items-center justify-center ${
                                  filteredModel?.stock > 0
                                      ? "bg-green-500 text-white hover:bg-green-700"
                                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                              }`}
                              onClick={() => handleAddToCart(product)}
                              disabled={filteredModel?.stock <= 0}
                              aria-label={`Ajouter ${product.name} au panier`}
                          >
                            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                            Ajouter au panier
                          </button>
                        </div>
                    );

                  })
              ) : (
                  <p className="text-center" aria-label="Aucun produit trouvé">
                    Aucun produit trouvé
                  </p>
              )}
            </div>
          </div>
        </div>
      </div>
      </>

  );
};

export default ProductList;