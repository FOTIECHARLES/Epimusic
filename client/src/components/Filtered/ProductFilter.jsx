import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const sectionVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto" },
};

const ProductFilter = ({ categories, brands, colors, sizes, maxPrice, maxWeight, onFiltersChange }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [weightRange, setWeightRange] = useState([0, maxWeight]);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(true);
  const [isColorsOpen, setIsColorsOpen] = useState(true);
  const [isSizesOpen, setIsSizesOpen] = useState(true);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isWeightOpen, setIsWeightOpen] = useState(true);

  const { category } = useParams();
  const { isDark } = useTheme();
  const BgColor = isDark ? "bg-slate-600" : "bg-gray-100";
  const textColor = isDark ? "text-slate-200" : "text-gray-700";
  const borderColor = isDark ? "border-slate-600" : "border-gray-100";
  const subTextColor = isDark ? "text-slate-300" : "text-gray-600";

  useEffect(() => {
    setPriceRange([0, maxPrice]);
    setWeightRange([0, maxWeight]);
  }, [maxPrice, maxWeight]);

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    onFiltersChange({
      brands: selectedBrands,
      colors: selectedColors,
      sizes: selectedSizes,
      categories: updatedCategories,
      priceRange,
      weightRange,
    });
  };

  const handleBrandChange = (brand) => {
    const updatedBrands = selectedBrands.includes(brand)
        ? selectedBrands.filter((b) => b !== brand)
        : [...selectedBrands, brand];

    setSelectedBrands(updatedBrands);
    onFiltersChange({
      brands: updatedBrands,
      colors: selectedColors,
      sizes: selectedSizes,
      categories: selectedCategories,
      priceRange,
      weightRange,
    });
  };

  const handleColorChange = (color) => {
    const updatedColors = selectedColors.includes(color)
        ? selectedColors.filter((c) => c !== color)
        : [...selectedColors, color];

    setSelectedColors(updatedColors);
    onFiltersChange({
      brands: selectedBrands,
      colors: updatedColors,
      sizes: selectedSizes,
      categories: selectedCategories,
      priceRange,
      weightRange,
    });
  };

  const handleSizeChange = (size) => {
    const updatedSizes = selectedSizes.includes(size)
        ? selectedSizes.filter((s) => s !== size)
        : [...selectedSizes, size];

    setSelectedSizes(updatedSizes);
    onFiltersChange({
      brands: selectedBrands,
      colors: selectedColors,
      sizes: updatedSizes,
      categories: selectedCategories,
      priceRange,
      weightRange,
    });
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
    onFiltersChange({
      brands: selectedBrands,
      colors: selectedColors,
      sizes: selectedSizes,
      categories: selectedCategories,
      priceRange: range,
      weightRange,
    });
  };

  const handleWeightRangeChange = (range) => {
    setWeightRange(range);
    onFiltersChange({
      brands: selectedBrands,
      colors: selectedColors,
      sizes: selectedSizes,
      categories: selectedCategories,
      priceRange,
      weightRange: range,
    });
  };

    return (
        <div role="region" aria-label="Filtrer les produits">
          <h3 className={`text-2xl font-semibold mb-2 ${textColor} border ${borderColor} ${BgColor} shadow rounded-lg px-2 py-4`}>Filtrer
            les produits</h3>

          {categories.length > 0 && category === undefined && (
              <div className={`mb-2 border ${borderColor} ${BgColor} shadow rounded-lg px-2 py-4`}>
                <h4
                    className={`text-lg font-medium ${textColor} cursor-pointer flex justify-between items-center`}
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    aria-label="Filtrer par catégories"
                >
                  Catégories
                  <span aria-hidden="true">{isCategoriesOpen ? "▲" : "▼"}</span>
                </h4>
                <AnimatePresence>
                  {isCategoriesOpen && (
                      <motion.div initial="hidden" animate="visible" exit="hidden" variants={sectionVariants}
                                  className="grid grid-cols-2 gap-2 mt-2" role="group"
                                  aria-label="Options de catégories">
                        {categories.map((category, index) => (
                            <div key={index} className="flex items-center">
                              <input
                                  type="checkbox"
                                  value={category}
                                  checked={selectedCategories.includes(category)}
                                  onChange={() => handleCategoryChange(category)}
                                  className="mr-2 text-red-600 focus:ring-red-500"
                                  aria-label={`Filtrer par catégorie ${category}`}
                              />
                              <p className={`${subTextColor}`}>{category}</p>
                            </div>
                        ))}
                      </motion.div>
                  )}
                </AnimatePresence>
              </div>
          )}
          {brands.length > 0 && (
              <div className={`mb-2 border ${borderColor} ${BgColor} shadow rounded-lg px-2 py-4`} role="region"
                   aria-label="Filtrer par marques">
                <h4
                    className={`text-lg font-medium ${textColor} cursor-pointer flex justify-between items-center`}
                    onClick={() => setIsBrandsOpen(!isBrandsOpen)}
                    aria-label="Filtrer par marques"
                >
                  Marques
                  <span aria-hidden="true">{isBrandsOpen ? "▲" : "▼"}</span>
                </h4>
                <AnimatePresence>
                  {isBrandsOpen && (
                      <motion.div initial="hidden" animate="visible" exit="hidden" variants={sectionVariants}
                                  className="grid grid-cols-2 gap-2 mt-2" aria-label="Options de marques">
                        {brands.map((brand, index) => (
                            <div key={index} className="flex items-center">
                              <input
                                  type="checkbox"
                                  value={brand}
                                  checked={selectedBrands.includes(brand)}
                                  onChange={() => handleBrandChange(brand)}
                                  className="mr-2 text-red-600 focus:ring-red-500"
                                  aria-label={`Filtrer par marque ${brand}`}
                              />
                              <p className={`${subTextColor}`}>{brand}</p>
                            </div>
                        ))}
                      </motion.div>
                  )}
                </AnimatePresence>
              </div>
          )}
          {colors.length > 0 && (
              <div className={`mb-2 border ${borderColor} ${BgColor} shadow rounded-lg px-2 py-4`} role="region"
                   aria-label="Filtrer par couleurs">
                <h4
                    className={`text-lg font-medium ${textColor} cursor-pointer flex justify-between items-center`}
                    onClick={() => setIsColorsOpen(!isColorsOpen)}
                    aria-label="Filtrer par couleurs"
                >
                  Couleurs
                  <span aria-hidden="true">{isColorsOpen ? "▲" : "▼"}</span>
                </h4>
                <AnimatePresence>
                  {isColorsOpen && (
                      <motion.div initial="hidden" animate="visible" exit="hidden" variants={sectionVariants}
                                  className="grid grid-cols-2 gap-2 mt-2" role="group" aria-label="Options de couleurs">
                        {colors.map((color, index) => (
                            <div key={index} className="flex items-center">
                              <input
                                  type="checkbox"
                                  value={color}
                                  checked={selectedColors.includes(color)}
                                  onChange={() => handleColorChange(color)}
                                  className={`mr-2 text-red-600 focus:ring-red-500 border ${subTextColor}`}
                                  aria-label={`Filtrer par couleur ${color}`}
                              />
                              <p className={`${subTextColor}`}>{color}</p>
                            </div>
                        ))}
                      </motion.div>
                  )}
                </AnimatePresence>
              </div>
          )}

          {sizes.length > 0 && (
              <div className={`mb-2 border ${borderColor} ${BgColor} shadow rounded-lg px-2 py-4`} role="region"
                   aria-label="Filtrer par tailles">
                <h4
                    className={`text-lg font-medium ${textColor} cursor-pointer flex justify-between items-center`}
                    onClick={() => setIsSizesOpen(!isSizesOpen)}
                    aria-label="Filtrer par tailles"
                >
                  Tailles
                  <span aria-hidden="true">{isSizesOpen ? "▲" : "▼"}</span>
                </h4>
                <AnimatePresence>
                  {isSizesOpen && (
                      <motion.div initial="hidden" animate="visible" exit="hidden" variants={sectionVariants}
                                  className="grid grid-cols-2 gap-2 mt-2" role="group" aria-label="Options de tailles">
                        {sizes.map((size, index) => (
                            <div key={index} className="flex items-center">
                              <input
                                  type="checkbox"
                                  value={size}
                                  checked={selectedSizes.includes(size)}
                                  onChange={() => handleSizeChange(size)}
                                  className="mr-2 text-red-600 focus:ring-red-500"
                                  aria-label={`Filtrer par taille ${size}`}
                              />
                              <p className={`${subTextColor}`}>{size}</p>
                            </div>
                        ))}
                      </motion.div>
                  )}
                </AnimatePresence>
              </div>
          )}
          <div className={`mb-2 border ${borderColor} ${BgColor} shadow rounded-lg px-2 py-4`} role="region"
               aria-label="Filtrer par prix">
            <h4
                className={`text-lg font-medium ${textColor} cursor-pointer flex justify-between items-center`}
                onClick={() => setIsPriceOpen(!isPriceOpen)}
                aria-label="Afficher ou masquer le filtre de prix"
            >
              Prix
              <span aria-hidden="true">{isPriceOpen ? "▲" : "▼"}</span>
            </h4>
            <AnimatePresence>
              {isPriceOpen && (
                  <motion.div initial="hidden" animate="visible" exit="hidden" variants={sectionVariants}
                              className="flex flex-col mt-2" role="group" aria-label="Options de prix">
                    <div className="flex items-center mb-2">
                      <input
                          type="range"
                          min="0"
                          max={maxPrice}
                          value={priceRange[1]}
                          onChange={(e) => handlePriceRangeChange([priceRange[0], e.target.value])}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          aria-label="Sélectionnez le prix maximum"
                      />
                    </div>
                    <div className="flex items-center">
                      <span className="ml-4 text-gray-600">{priceRange[0]} €</span>
                      <span className="mx-2 text-gray-600">-</span>
                      <span className="text-gray-600">{priceRange[1]} €</span>
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={`mb-2 border ${borderColor} ${BgColor} shadow rounded-lg px-2 py-4`} role="region"
               aria-label="Filtrer par poids">
            <h4
                className={`text-lg font-medium ${subTextColor} cursor-pointer flex justify-between items-center`}
                onClick={() => setIsWeightOpen(!isWeightOpen)}
                aria-label="Afficher ou masquer le filtre de poids"
            >
              Poids
              <span aria-hidden="true">{isWeightOpen ? "▲" : "▼"}</span>
            </h4>
            <AnimatePresence>
              {isWeightOpen && (
                  <motion.div initial="hidden" animate="visible" exit="hidden" variants={sectionVariants}
                              className="flex flex-col mt-2" role="group" aria-label="Options de poids">
                    <div className="flex items-center mb-2">
                      <input
                          type="range"
                          min="0"
                          max={maxWeight}
                          value={weightRange[1]}
                          onChange={(e) => handleWeightRangeChange([weightRange[0], e.target.value])}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          aria-label={`Filtrer par poids ${weightRange || 'Inconnue'}`}
                      />
                    </div>
                    <span className={`ml-4 ${subTextColor}`}>
              {weightRange[0]} - {weightRange[1]} kg
            </span>
                  </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
    );

};

export default ProductFilter;