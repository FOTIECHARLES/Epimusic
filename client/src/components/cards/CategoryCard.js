import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const CategoryCard = ({ imageSrc, categoryName, categoryId}) => {
    const { isDark } = useTheme();
    const cardBg = isDark ? "bg-slate-600" : "bg-white";
    const textColor = isDark ? "text-slate-200" : "text-[#634832]";
    const borderColor = isDark ? "border-2 border-yellow-400" : "border-gray-300";
    const imgBorderColor = isDark ? "border-2 border-rose-500" : "border-gray-300";

    return (
        <Link to={`/products/${categoryName.toLowerCase()}/${categoryId}`}
            aria-label={`Voir les produits de la catégorie ${categoryName}`}
        >
            <div className={`${cardBg} card w-full sm:w-[45vw] md:w-[30vw] lg:w-[20vw] xl:w-[15vw] ${borderColor} 
                            rounded-lg ${textColor} m-2 p-2 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg f
                            lex flex-col items-center justify-between`}
            >
                <img
                    src={imageSrc}
                    alt={`Image de la catégorie ${categoryName}`}
                    className={`border-b ${imgBorderColor} mb-2 w-full h-auto object-cover max-h-[200px] md:max-h-[180px] lg:max-h-[160px]`}
                />
                <h2 className="my-2 text-lg sm:text-xl md:text-2xl text-center">
                    {categoryName}
                </h2>
            </div>
        </Link>
    );
};

export default CategoryCard;