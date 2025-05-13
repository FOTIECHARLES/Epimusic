import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Alert from "../../Alerts/Alert";
import { FaShippingFast } from "react-icons/fa";
import CartButton from "../../Buttons/CartButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../../../context/ThemeContext";

const ShippingPage = () => {
  const [alert, setAlert] = useState({ message: "", type: "error" });
  const [cartPrice, setCartPrice] = useState();
  const [shipppingCosts, setShippingCosts] = useState();
  const [cartQuantity, setCartQuantity] = useState();
  const [total, setTotal] = useState();
  const [orderId, setOrderId] = useState(localStorage.getItem("orderId"));
  const [order, setOrder] = useState();
  const navigate = useNavigate();
    const { isDark } = useTheme();
    const BgColor = isDark ? "bg-slate-600" : "bg-gray-100";
    const textColor = isDark ? "text-slate-200" : "text-gray-800";
    const borderColor = isDark ?  "border-slate-600" : "border-gray-100";
    const subTextColor = isDark ?  "text-slate-400" : "text-gray-500";

    useEffect(() => {
        const cartPrice = localStorage.getItem("cart_price");
        setCartPrice(parseFloat(cartPrice));
        const shipppingCosts = localStorage.getItem("cart_shipping_costs");
        setShippingCosts(parseFloat(shipppingCosts));
        const cartQuantity = localStorage.getItem("cart_quantity");
        setCartQuantity(parseInt(cartQuantity));
    }, []);
  
  useEffect(() => {
    if (!orderId) {
      return;
    }
        axios.get(`http://localhost:8000/api/order/${orderId}`)
            .then(response => {
                setOrder(response.data);
            })
            .catch(error => {
                console.log(error);
            }) 
    }, [orderId]);

  useEffect(() => {
    if (!order) {
      return;
    }

    if (order.status !== "Pending") {
      navigate("/");
    }
  }, [order]);

  useEffect(() => {
    if (!cartPrice || !shipppingCosts) {
      return;
    }
    const total = (cartPrice + shipppingCosts).toFixed(2);
    setTotal(total);
  }, [cartPrice, shipppingCosts]);


  const handlePaymentRedirection = () => {
    navigate("/delivery/home-delivery");
  };
  return (
<>
      <Helmet>
        <title>Récapitulatif de votre commande | Epimusic</title>
        <meta name="description" content="Retrouvez ici le récapitulatif de votre commande" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
    <div className="w-9/12 m-auto">
      <Alert message={alert.message} type={alert.type} />
      <h1 className={`text-center ${textColor} text-4xl font-bold my-4`} aria-label="Livraison">Livraison</h1>

      <div className="flex flex-col space-y-4 flex-wrap justify-center">
        <div className="w-full">
          <h3 className={`${textColor} text-2xl`} aria-label="Méthodes de livraisons">Méthodes de livraisons</h3>
          <div className={`w-full max-w-xl ${BgColor} hover:bg-gray-100 p-8 mt-4 rounded-lg`} aria-label="Option livraison à domicile">
            <div className="flex items-center text-xl px-4">
              <FaShippingFast className={`${subTextColor}`}  aria-hidden="true"/>
              <p className={`ml-4 ${subTextColor}`}>Livraison à domicile</p>
            </div>
          </div>
        </div>

        <div className="w-full">
          <h3 className={`text-2xl mb-4 ${textColor}`}  aria-label="Récapitulatif de la commande">Récapitulatif :</h3>
          <div className={`w-full ${BgColor} p-4 rounded-lg`} aria-label="Détails de la commande">
            {order && (
              <>
                <p aria-label="Nombre de produits" className={`text-lg ${textColor}`}>{order.itemsQuantity} produits</p>
                <hr className="mb-4" />
                <div className={`w-full flex justify-between text-lg md:text-xl ${subTextColor}`}>
                  <p aria-label="Prix du panier">Prix du panier :</p>
                  <p aria-label="Montant du panier">{order.totalPrice} €</p>
                </div>
                <div className={`w-full flex justify-between text-lg md:text-xl ${subTextColor}`}>
                  <p aria-label="Prix du panier avec promotions">Prix du panier avec promotions :</p>
                  <p aria-label="Montant avec promotions">{order.totalWithPromo} €</p>
                </div>
                <div className={`w-full flex justify-between text-lg md:text-xl ${subTextColor}`}>
                   <p aria-label="Frais de livraison">Frais de livraison :</p>
                   <p aria-label="Coût de livraison">{order.shippingCost} €</p>
                </div>
                <div className={`w-full mt-2 flex justify-between text-xl md:text-3xl ${textColor}`}>
                   <p aria-label="Total de la commande">Total</p>
                   <p aria-label="Montant total">{order.totalWithShippingCost} €</p>
                </div>
              </>
            )}
          </div>
          <div className="lg:w-1/3 w-2/3">
            <CartButton text="Valider ma livraison" handleClick={handlePaymentRedirection} aria-label="Valider ma livraison"/>
          </div> 
        </div>
      </div>
    </div>
    </>
  );
};

export default ShippingPage;
