import React from "react";
import CartItem from "./CartItem";

const CartList = ({ items, onQuantityChange, onDeleteItem }) => {
    return (
        <div>
            <ul role="list" aria-label="Liste des articles dans le panier">
                {items.map(item => (
                    <li key={item.id} role="listitem">
                        <CartItem 
                            item={item} 
                            onQuantityChange={onQuantityChange}
                            onDeleteItem={onDeleteItem}    
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CartList;
