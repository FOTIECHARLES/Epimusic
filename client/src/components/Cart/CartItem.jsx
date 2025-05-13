import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import ButtonDelete from "./ButtonDelete";
import { useCart } from '../../context/CartContext';

const CartItem = ({ item, onQuantityChange, onDeleteItem }) => {
    // const priceDifference = item.total - item.total_promotion;
    const [selectedOption, setSelectedOption] = useState({
        value: item.quantity,
        label: item.quantity,
    });
    const [total, setTotal] = useState(item.total);
    const [totalPromotion, setTotalPromotion] = useState(item.total_promotion);
    const { updateItemCount } = useCart();
    const [isGift, setIsGift] = useState(item.isGift);

    const options = Array.from({ length: 10 }, (v, k) => ({
        value: k + 1,
        label: (k + 1).toString(),
    }));

    const handleChangeQuantity = (selectedOption) => {
        setSelectedOption(selectedOption);

        axios
            .patch(
                `http://localhost:8000/api/cart/item/${item.id}`, //localhost
                {
                    quantity: selectedOption.value,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => response.data.item)
            .then((item) => {
                setTotal(item.total);
                setTotalPromotion(item.total_promotion);
                onQuantityChange(
                    item.id,
                    selectedOption.value,
                    item.total,
                    item.total_promotion
                );

                updateItemCount();
            })
            .catch((error) => console.log(error));
    };

    const cartPrice = parseFloat(localStorage.getItem("cart_price")) || 0;
    const cartPromoTotal =
        parseFloat(localStorage.getItem("cart_promo_total")) || 0;
    const priceDifference = cartPrice - cartPromoTotal;

    const handleGiftChange = (event) => {
        const isChecked = event.target.checked;
        setIsGift(isChecked);

        axios.patch(`http://localhost:8000/api/cart/item/gift/${item.id}`, { //localhost
            isGift: isChecked
        })
        .then(response => console.log(response.data))
    }

    return (
        <div className="max-w-xl bg-white p-4 m-4 rounded-lg flex" aria-label={`Produit dans le panier: ${item.product}`}>
            <div className="w-32 h-32">
                <img
                    src={`http://localhost:8000${item.image_path}`} //localhost
                    alt={`Image du produit ${item.product}`}
                    className="w-full h-full object-contain"
                    aria-label={`Image du produit ${item.product}`}
                />
            </div>
            <div className="h-100% w-full p-4 flex flex-col content-between justify-between">
                <Link
                    to={`/product/${item.product_id}`}
                    className="product-link"
                    aria-label={`Voir les détails du produit ${item.product}`}
                >
                    <h4 className="text-md md:text-lg underline">{item.product}</h4>
                </Link>
                <div className="flex justify-between items-end" aria-label={`Informations et actions pour ${item.product}`}>
                    <div className="flex items-center h-full" aria-label={`Quantité et suppression pour ${item.product}`}>
                        <Select
                            value={selectedOption}
                            defaultValue={item.quantity}
                            onChange={handleChangeQuantity}
                            options={options}
                            isSearchable={false}
                            menuPlacement="auto"
                            aria-label={`Sélectionnez la quantité pour ${item.product}`}
                        />
                        <ButtonDelete
                            id={item.id}
                            onDeleteItem={onDeleteItem}
                            aria-label={`Supprimer ${item.product} du panier`}
                        />
                    </div>
                    <div className="text-right" aria-label={`Prix du produit ${item.product}`}>
                        {item.promo_price ? (
                            <>
                                <p className="text-xl line-through text-red-500">
                                    {total} €
                                </p>
                                <p className="text-2xl">{totalPromotion} €</p>
                            </>
                        ) : (
                            <p className="text-2xl">{total} €</p>
                        )}
                    </div>
                </div>
                {item.category !== "Instrument" && priceDifference >= 15 && (
                    <div className="text-right flex items-center mt-3" aria-label="Option emballage cadeau">
                        <input
                            type="checkbox"
                            name="wrapping"
                            onChange={handleGiftChange}
                            checked={isGift}
                            aria-label="Expédier ce produit dans un emballage cadeau"
                        />
                        <p className="text-sm ml-3 font-medium text-gray-900">
                            Expédier ce produit dans un emballage cadeau
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartItem;
