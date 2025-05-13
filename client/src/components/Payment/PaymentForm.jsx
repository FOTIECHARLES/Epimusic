import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const PaymentForm = ({ orderPrice, orderId, isDark }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardHolderName, setCardHolderName] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [userId, setUserId] = useState();
  const [cartToken, setCartToken] = useState();
  const navigate = useNavigate();

  const BgColor = isDark ? "bg-slate-600" : "bg-gray-100";
  const textColor = isDark ? "text-slate-200" : "text-gray-800";
  const borderColor = isDark ?  "border-slate-600" : "border-gray-300";
  const subTextColor = isDark ?  "text-slate-300" : "text-gray-700";

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserId(user.id);
    } else {
      const token = localStorage.getItem("cart_token");
      setCartToken(token);
    }
  }, []);

  useEffect(() => {
    if (!orderPrice) {
      return;
    }

    axios
      .post(
        "http://localhost:8000/api/payment/create-intent",
        {
          amount: Math.round(orderPrice * 100),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setClientSecret(response.data.clientSecret);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [orderPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const cardNumberElement = elements.getElement(CardNumberElement);

    if (!cardNumberElement) {
      alert("Tous les champs doivent être remplis");
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: cardHolderName,
          },
        },
      }
    );

    if (error) {
      setIsProcessing(false);
      alert(error.message);
    } else {
      alert("Paiement réussi");
      setIsProcessing(false);
      setPaymentSuccess(true);
    }
  };

  useEffect(() => {
    if (!paymentSuccess || !orderId) {
      return;
    }

    axios
      .patch(`http://localhost:8000/api/order/validate/${orderId}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .delete(`http://localhost:8000/api/cart/`, {
        params: {
          userId: userId,
          token: cartToken,
        },
      })
      .then((response) => {
        if (cartToken) {
          localStorage.removeItem("cart_token");
        }
      })
      .then(
        setTimeout(() => {
          navigate("/");
        }, 6000)
      )
      .catch((error) => console.log(error));
  }, [paymentSuccess]);

  return (
    <>
      {paymentSuccess ? (
        <div className="w-full h-full flex flex-col justify-center items-center text-center" aria-label="Paiement réussi">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-500 text-6xl"
            aria-label="Paiement réussi"
          />
          <p className="text-xl mt-8 mb-4">Paiement réussi</p>
          <p className="text-xl">Merci d'avoir commandé chez Epimusic !</p>
          <p className="text-xl mt-2">Vous allez être redirigés dans quelques instants</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto" aria-label="Formulaire de paiement">
          <div>
            <label className="block text-gray-700 mb-2 text-xl" className={`block ${subTextColor} mb-2 text-2xl`} htmlFor="cardHolderName">
              Titulaire de la carte
            </label>
            <div className={`p-3 border border-gray-300 rounded-lg shadow-sm`}>
              <input
                type="text"
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
                placeholder="Nom du titulaire"
                className={`w-full focus:outline-none focus:ring-0 focus:border-transparent border-none p-0 m-0 ${BgColor} ${textColor}`}
                required
                aria-label="Nom du titulaire de la carte"
              />
            </div>
          </div>
          <div>
            <label className={`block ${textColor} mb-2 text-xl`}>
              Numéro de carte
            </label>
            <div className="p-3 border border-gray-300 rounded-lg shadow-sm">
              <CardNumberElement
                options={CARD_ELEMENT_OPTIONS}
                className={`w-full focus:outline-none ${textColor}`}
                htmlFor="cardNumber"
                aria-label="Entrer le numéro de carte"
              />
              <p className={`text-2xl mt-8 mb-4 ${textColor}`}>Paiement réussi</p>
              <p className={`text-2xl ${textColor}`}>Merci d'avoir commandé chez Epimusic !</p>
              <p className={`text-xl mt-2 ${subTextColor}`}>Vous allez être redirigés dans quelques instants</p>
            </div>
          </div>
          <div className="flex space-x-16">
            <div>
              <label className={`block ${textColor} mb-2 text-xl`} htmlFor="cardExpiry">
                Date d'expiration
              </label>
              <div className="p-3 border border-gray-300 rounded-lg shadow-sm">
                <CardExpiryElement
                  options={CARD_ELEMENT_OPTIONS}
                  className={`w-2/3 focus:outline-none ${textColor}`}
                  aria-label="Entrer la date d'expiration"
                />
              </div>
            </div>
            <div className="w-2/6 ">
              <label className={`block ${textColor} mb-2 text-xl`} htmlFor="cardCvc">CVC</label>
              <div className="p-3 w-full border border-gray-300 rounded-lg shadow-sm">
                <CardCvcElement
                  options={CARD_ELEMENT_OPTIONS}
                  className={`w-full focus:outline-none ${textColor}`}
                  aria-label="Entrer le code CVC"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className="mt-4 p-2 bg-rose-600 text-white rounded flex items-center justify-center w-full text-xl"
            aria-label="Payer"
          >
            {isProcessing ? "Transaction en cours..." : "Payer"}
          </button>
          {isProcessing && (
            <div className="flex items-center justify-center p-4" aria-label="Chargement">
              <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          )}
        </form>
      )}
    </>
  );
};

export default PaymentForm;
